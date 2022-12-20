import axios from 'axios';
import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { getStoredCookieConsent } from '@/store/modules/user.slice';
import QuestionComponent from '@/components/Specific/QuestionComponent';
import QuestionHeaderComponent from '@/components/Specific/QuestionHeaderComponent';
import ProgressComponent from '@/components/Specific/ProgressComponent';
import {
  addRoundInState,
  clearRoundsInState,
  getStoredDifficulty,
  getStoredRounds,
} from '@/store/modules/game.slice';
import { getStoredIsPlaying, setRoundInState } from '@/store/modules/game.slice';
import { useNavigate } from 'react-router';
import AnswersComponent from '@/components/Specific/AnswersComponent';

type IGameView = {};

const questionTimeInMs = 30000;
const rounds = 9;

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

const GameView: FC<IGameView> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isCookiesConsentApproved = useAppSelector(getStoredCookieConsent);
  const isPlaying = useAppSelector(getStoredIsPlaying);
  const storedDifficulty = useAppSelector(getStoredDifficulty);
  const storedRounds = useAppSelector(getStoredRounds);

  const [gameState, setGameState] = useState<'loading' | 'playing' | 'done'>();
  const [progress, setProgress] = useState(0);
  // TODO - fix this type
  const [selectedAnswer, setSelectedAnswer] = useState<any>();
  const [answers, setAnswers] = useState<any[]>([]);
  const [roundNumber, setRoundNumber] = useState(0);
  const [isRoundDone, setIsRoundDone] = useState(false);
  const [questions, setQuestions] = useState<ITriviaQuestion[]>([]);

  let interval: NodeJS.Timeout;

  const fetchQuestionsFromAPI = async () => {
    const response = await axios.get(
      `https://the-trivia-api.com/api/questions?limit=1&difficulty=${storedDifficulty.toLowerCase()}`,
    );

    return response.data as ITriviaQuestion[];
  };

  const getPercentage = (value: number, total: number) => {
    return (value / total) * 100;
  };

  const endRound = () => {
    setIsRoundDone(true);
    if (roundNumber === rounds) return navigate('/results');
    setTimeout(() => {
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

  const beginRound = async () => {
    setIsRoundDone(false);
    const questions = await fetchQuestionsFromAPI();
    const answers = [];
    questions[0].incorrectAnswers.forEach(answer => {
      answers.push({ answer, isSelectedAnswer: false, isCorrectAnswer: false });
    });
    answers.push({
      answer: questions[0].correctAnswer,
      isSelectedAnswer: false,
      isCorrectAnswer: true,
    });

    let newRoundNumber;

    setRoundNumber(oldRoundNumber => {
      newRoundNumber = oldRoundNumber + 1;
      dispatch(setRoundInState(newRoundNumber));
      return newRoundNumber;
    });
    setAnswers(answers);
    setQuestions(questions);
    setGameState('playing');
    return newRoundNumber;
  };

  const initQuiz = async () => {
    if (!isCookiesConsentApproved || !isPlaying) return navigate('/');
    setGameState('loading');
    dispatch(clearRoundsInState());
  };

  const setSelectedAnswerFromAnswerComponent = (answersArrayIndex: number) => {
    const answer = answers[answersArrayIndex];
    setSelectedAnswer({ ...answer, progress });
  };

  const calculateBonusScore = () => {
    let j = 0;
    for (let i = roundNumber; i >= 0; i--) {
      const round = i;

      const roundScore = storedRounds[round].answeredCorrectly;
      if (roundScore === 0) {
        break;
      }
      j++;
    }

    const allCorrectAnswers = storedRounds.filter(round => round.answeredCorrectly);

    let bonusScore = 0;

    if (j >= 3) {
      bonusScore = allCorrectAnswers.length * j;
    }
    return bonusScore;
  };

  const calculateScore = () => {
    const secondsLeft = Math.ceil((questionTimeInMs - selectedAnswer.progress) / 1000);

    const questionDifficulty = questions[0].difficulty;

    let difficulty;

    if (questionDifficulty === 'easy') {
      difficulty = 1;
    } else if (questionDifficulty === 'medium') {
      difficulty = 3;
    } else {
      difficulty = 5;
    }

    const baseScore = secondsLeft * difficulty;

    const bonusScore = calculateBonusScore();

    return baseScore + bonusScore;
  };

  const saveScore = () => {
    const selectedAnswerIsCorrect = selectedAnswer && selectedAnswer.isCorrectAnswer;
    const score = selectedAnswerIsCorrect ? calculateScore() : 0;

    console.log('score', score);

    const scoreObject = {
      roundNumber,
      score,
      answeredCorrectly: selectedAnswerIsCorrect,
    };

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
      <QuestionComponent
        question={questions && questions.length > 0 ? questions[0].question : ''}
      />
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
