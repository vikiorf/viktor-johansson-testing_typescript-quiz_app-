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
import ChooseCategoryComponent from '@/components/Specific/ChooseCategoryComponent';
import ModalComponent from '@/components/common/ModalComponent';
import ButtonComponent from '@/components/common/ButtonComponent';

const TRIVIA_BASE_URL =
  import.meta.env.VITE_TRIVIA_BASE_URL || 'https://the-trivia-api.com/api';

const QUESTION_TIME_IN_MS = parseInt(import.meta.env.VITE_QUESTION_TIME_IN_MS) || 30000;
const TOTAL_AMOUNT_OF_ROUNDS = parseInt(import.meta.env.VITE_TOTAL_AMOUNT_OF_ROUNDS) || 9;

type IGameView = {};

interface ITriviaCategories {
  [key: string]: string[];
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

enum GameStateEnum {
  ChooseCategory = 1,
  Start_Round,
  Playing_Round,
  End_Round,
  Error,
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
  const [fetchQuestionTries, setFetchQuestionTries] = useState(0);
  const [question, setQuestion] = useState<ITriviaQuestion>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [randomCategories, setRandomCategories] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<IAnsweredQuestion>();
  const [gameState, setGameState] = useState<GameStateEnum>(GameStateEnum.ChooseCategory);

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

  const fetchQuestionFromAPI = async (): Promise<ITriviaQuestion | false> => {
    try {
      const difficulty = getDifficulty(storedDifficulty);
      const response = await axios.get(
        `${TRIVIA_BASE_URL}/questions?limit=1&categories=${selectedCategory}&difficulty=${difficulty}`,
      );

      setFetchQuestionTries(0);

      return response.data[0] as ITriviaQuestion;
    } catch (error) {
      setFetchQuestionTries(prev => prev + 1);
      if (fetchQuestionTries >= 3) {
        setGameState(GameStateEnum.Error);
        return false;
      }

      return await fetchQuestionFromAPI();
    }
  };

  const getPercentage = (value: number, total: number) => {
    return (value / total) * 100;
  };

  const endRound = () => {
    setIsRoundDone(true);
    setTimeout(() => {
      if (roundNumber === TOTAL_AMOUNT_OF_ROUNDS) return navigate('/result');
      setGameState(GameStateEnum.ChooseCategory);
    }, 3000);
  };

  const readQuestionTimer = () => {
    let i = 0;
    interval = setInterval(() => {
      i += 100;
      setProgress(i);
      if (i >= QUESTION_TIME_IN_MS) {
        clearInterval(interval);
        setGameState(GameStateEnum.End_Round);
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
    if (!question) return;

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
    setGameState(GameStateEnum.Playing_Round);
  };

  const initQuiz = async () => {
    if (!isCookiesConsentApproved || !isPlaying) return navigate('/');
    dispatch(clearRoundsInState());
    setGameState(GameStateEnum.ChooseCategory);
  };

  const setSelectedAnswerHandler = (answersArrayIndex: number) => {
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

    const secondsLeft = Math.ceil((QUESTION_TIME_IN_MS - selectedAnswer.progress) / 1000);
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

  const fetchCategories = async () => {
    const response = await axios.get(`${TRIVIA_BASE_URL}/categories`);
    const categories = response.data as ITriviaCategories;
    const categoriesArray = Object.keys(categories) as string[];
    const shuffledCategories = shuffleArray(categoriesArray) as string[];
    const randomCategories = shuffledCategories.slice(0, 3);
    setRandomCategories(randomCategories);
  };

  const selectCategoryHandler = (categoryArrayIndex: number) => {
    const category = randomCategories[categoryArrayIndex];
    setSelectedCategory(category);
    setGameState(GameStateEnum.Start_Round);
  };

  const gameHandler = () => {
    if (!gameState) return;
    if (gameState === GameStateEnum.ChooseCategory) return fetchCategories();
    if (gameState === GameStateEnum.Start_Round) return beginRound();
    if (gameState === GameStateEnum.Playing_Round) return readQuestionTimer();
    if (gameState === GameStateEnum.End_Round) {
      saveScore();
      endRound();
    }
  };

  useEffect(() => {
    gameHandler();
  }, [gameState]);

  useEffect(() => {
    initQuiz();
  }, []);

  return (
    <div className="wrapper h-screen w-screen px-10 p-2 bg-primary-bg text-primary-color grid grid-rows-[0.3fr,0.4fr,1fr,0.2fr]">
      {gameState !== GameStateEnum.ChooseCategory && (
        <>
          <QuestionHeaderComponent
            currentQuestionNumber={roundNumber}
            totalAmountOfQuestions={TOTAL_AMOUNT_OF_ROUNDS}
          />
          <QuestionComponent question={question ? question.question : ''} />
          <AnswersComponent
            answers={answers}
            isRoundDone={isRoundDone}
            setSelectedAnswer={setSelectedAnswerHandler}
          />
          <ProgressComponent status={getPercentage(progress, QUESTION_TIME_IN_MS)} />
        </>
      )}
      {gameState === GameStateEnum.ChooseCategory && (
        <>
          <h1 className="text-3xl mt-6 text-center">Choose category</h1>
          <ChooseCategoryComponent
            setSelectedAnswer={selectCategoryHandler}
            categories={randomCategories}
          />
        </>
      )}
      {gameState === GameStateEnum.Error && (
        <>
          <ModalComponent>
            <h1 className="text-3xl text-center">Error</h1>
            <p>Something went wrong when getting questions.</p>
            <ButtonComponent label="Go home" onClick={() => navigate('/')} />
          </ModalComponent>
        </>
      )}
    </div>
  );
};

export default GameView;
