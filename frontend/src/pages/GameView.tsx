import axios from 'axios';
import { useNavigate } from 'react-router';
import { FC, useEffect, useState } from 'react';

import {
  IRound,
  getStoredRounds,
  addRoundInState,
  clearRoundsInState,
  getStoredDifficulty,
  PlayableDifficultyEnum,
  UserDifficultyEnum,
} from '@/store/modules/game.slice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getStoredIsPlaying, setRoundInState } from '@/store/modules/game.slice';

import { getStoredCookieConsent } from '@/store/modules/user.slice';
import AnswersComponent from '@/components/Specific/AnswersComponent';
import QuestionComponent from '@/components/Specific/QuestionComponent';
import ProgressComponent from '@/components/Specific/ProgressComponent';
import QuestionHeaderComponent from '@/components/Specific/QuestionHeaderComponent';

const rounds = 9;
const questionTimeInMs = 30000;

type IGameView = {};

interface ITriviaCategories {
  'Arts & Literature': ['arts', 'literature', 'arts_and_literature'];
  'Film & TV': ['movies', 'film', 'film_and_tv'];
  'Food & Drink': ['food_and_drink', 'food', 'drink'];
  'General Knowledge': ['general_knowledge'];
  Geography: ['geography'];
  History: ['history'];
  Music: ['music'];
  Science: ['science'];
  'Society & Culture': ['society_and_culture', 'society', 'culture'];
  'Sport & Leisure': ['sport_and_leisure', 'sports', 'sport'];
}

interface ITriviaQuestion {
  category: keyof ITriviaCategories;
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  id: string;
  incorrectAnswers: string[];
  isNiche: boolean;
  question: string;
  regions: string[];
  tags: string[];
  type: string;
}

export interface IAnswer {
  answer: string;
  isCorrectAnswer?: boolean;
  isSelectedAnswer: boolean;
}

interface IAnsweredQuestion {
  answer: string;
  isCorrectAnswer?: boolean;
  isSelectedAnswer: boolean;
  progress: number;
}

const GameView: FC<IGameView> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const storedRounds = useAppSelector(getStoredRounds);
  const isPlaying = useAppSelector(getStoredIsPlaying);
  const storedDifficulty = useAppSelector(getStoredDifficulty);
  const isCookiesConsentApproved = useAppSelector(getStoredCookieConsent);

  const [progress, setProgress] = useState(0);
  const [roundNumber, setRoundNumber] = useState(0);
  const [isRoundDone, setIsRoundDone] = useState(false);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [question, setQuestion] = useState<ITriviaQuestion>();
  const [selectedAnswer, setSelectedAnswer] = useState<IAnsweredQuestion>();
  const [gameState, setGameState] = useState<'loading' | 'playing' | 'done'>();

  let interval: NodeJS.Timeout;

  const getRandomDifficulty = () => {
    const playableDifficultiesArr = Object.values(PlayableDifficultyEnum);
    const amountOfPlayableDifficulties = playableDifficultiesArr.length;
    const randomDifficulty =
      playableDifficultiesArr[Math.floor(Math.random() * amountOfPlayableDifficulties)];
    return randomDifficulty;
  };

  const getDifficulty = (difficulty: UserDifficultyEnum) => {
    switch (difficulty) {
      case UserDifficultyEnum.EASY:
        return 'easy';
      case UserDifficultyEnum.MEDIUM:
        return 'medium';
      case UserDifficultyEnum.HARD:
        return 'hard';
      case UserDifficultyEnum.RANDOM:
        return getRandomDifficulty();
    }
  };

  const fetchQuestionFromAPI = async () => {
    const difficulty = getDifficulty(storedDifficulty);
    const response = await axios.get(
      `https://the-trivia-api.com/api/questions?limit=1&difficulty=${difficulty}`,
    );

    return response.data[0] as ITriviaQuestion;
  };

  const getPercentage = (value: number, total: number) => {
    return (value / total) * 100;
  };

  const endRound = () => {
    setIsRoundDone(true);
    setTimeout(() => {
      if (roundNumber === rounds) return navigate('/result');
      setGameState('loading');
    }, 3000);
  };

  const readQuestionTimer = () => {
    let i = 0;
    interval = setInterval(() => {
      i += 100;
      setProgress(i);
      if (i >= questionTimeInMs) {
        clearInterval(interval);
        setGameState('done');
      }
    }, 100);
  };

  // Code taken from https://stackoverflow.com/a/12646864/12707006
  const shuffleArray = (arrayToBeShuffled: unknown[]) => {
    for (let i = arrayToBeShuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayToBeShuffled[i], arrayToBeShuffled[j]] = [
        arrayToBeShuffled[j],
        arrayToBeShuffled[i],
      ];
    }
    return arrayToBeShuffled;
  };

  const beginRound = async () => {
    setIsRoundDone(false);
    const question = await fetchQuestionFromAPI();
    const answers = [];
    question.incorrectAnswers.forEach(answer => {
      answers.push({ answer, isSelectedAnswer: false, isCorrectAnswer: false });
    });
    answers.push({
      isCorrectAnswer: true,
      isSelectedAnswer: false,
      answer: question.correctAnswer,
    });

    const shuffledAnswers = shuffleArray(answers) as IAnswer[];

    let newRoundNumber;

    setRoundNumber(oldRoundNumber => {
      newRoundNumber = oldRoundNumber + 1;
      dispatch(setRoundInState(newRoundNumber));
      return newRoundNumber;
    });
    setAnswers(shuffledAnswers);
    setQuestion(question);
    setGameState('playing');
  };

  const initQuiz = async () => {
    if (!isCookiesConsentApproved || !isPlaying) return navigate('/');
    dispatch(clearRoundsInState());
    setGameState('loading');
  };

  const setSelectedAnswerFromAnswerComponent = (answersArrayIndex: number) => {
    const answer = answers[answersArrayIndex];
    setSelectedAnswer({ ...answer, progress });
  };

  const calculateBonusScore = () => {
    let correctQuestionsInRow = 0;
    for (let i = storedRounds.length - 1; i >= 0; i--) {
      const round = i;
      const isAnsweredCorrectly =
        storedRounds && storedRounds[round] && storedRounds[round].score > 0;

      if (!isAnsweredCorrectly) break;
      correctQuestionsInRow++;
    }

    const allCorrectAnswers = storedRounds.filter(round => round.answeredCorrectly);
    let bonusScore = 0;
    if (correctQuestionsInRow >= 3) {
      bonusScore = allCorrectAnswers.length * correctQuestionsInRow;
    }
    return bonusScore;
  };

  const getDifficultyScore = (difficulty: string) => {
    if (difficulty === 'easy') return 1;
    if (difficulty === 'medium') return 3;
    if (difficulty === 'hard') return 5;
    return 0;
  };

  const calculateScore = () => {
    if (!selectedAnswer || !question) return 0;

    const questionDifficulty = question.difficulty;
    const difficultyScore = getDifficultyScore(questionDifficulty);

    const secondsLeft = Math.ceil((questionTimeInMs - selectedAnswer.progress) / 1000);
    const baseScore = secondsLeft * difficultyScore;

    const bonusScore = calculateBonusScore();

    return baseScore + bonusScore;
  };

  const saveScore = () => {
    const selectedAnswerIsCorrect = selectedAnswer && selectedAnswer.isCorrectAnswer;
    const score = selectedAnswerIsCorrect ? calculateScore() : 0;

    const scoreObject = {
      roundNumber,
      score,
      answeredCorrectly: !!selectedAnswerIsCorrect,
    } as IRound;

    dispatch(addRoundInState(scoreObject));
  };

  const gameHandler = () => {
    if (!gameState) return;
    if (gameState === 'loading') return beginRound();
    if (gameState === 'playing') return readQuestionTimer();

    saveScore();
    endRound();
  };

  useEffect(() => {
    gameHandler();
  }, [gameState]);

  useEffect(() => {
    initQuiz();
  }, []);

  return (
    <div className="wrapper h-screen w-screen px-10 p-2 bg-primary-bg text-primary-color grid grid-rows-[0.3fr,0.4fr,1fr,0.2fr]">
      <QuestionHeaderComponent
        currentQuestionNumber={roundNumber}
        totalAmountOfQuestions={rounds}
      />
      <QuestionComponent question={question ? question.question : ''} />
      <AnswersComponent
        answers={answers}
        isRoundDone={isRoundDone}
        setSelectedAnswer={setSelectedAnswerFromAnswerComponent}
      />
      <ProgressComponent status={getPercentage(progress, questionTimeInMs)} />
    </div>
  );
};

export default GameView;
