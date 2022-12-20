import axios from 'axios';
import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { getStoredCookieConsent } from '@/store/modules/user.slice';
import QuestionComponent from '@/components/Specific/QuestionComponent';
import QuestionHeaderComponent from '@/components/Specific/QuestionHeaderComponent';
import ProgressComponent from '@/components/Specific/ProgressComponent';
import { getStoredDifficulty } from '@/store/modules/game.slice';
import { getStoredIsPlaying, setRound } from '@/store/modules/game.slice';
import { useNavigate } from 'react-router';
import AnswersComponent from '@/components/Specific/AnswersComponent';

type IGameView = {};

const questionTime = 6000;
const rounds = 12;

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

  const [progress, setProgress] = useState(0);
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
    return new Promise(resolve => {
      clearInterval(interval);
      setIsRoundDone(true);
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  };

  const readQuestionTimer = () => {
    return new Promise(resolve => {
      let i = 0;
      interval = setInterval(() => {
        i += 100;
        setProgress(i);
        if (i >= questionTime) {
          return resolve(true);
        }
      }, 100);
    });
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
      dispatch(setRound(newRoundNumber));
      return newRoundNumber;
    });
    setAnswers(answers);
    setQuestions(questions);
    return newRoundNumber;
  };

  const initQuiz = async () => {
    if (!isCookiesConsentApproved || !isPlaying) return navigate('/');
    for (let i = 0; i < rounds; i++) {
      await beginRound();

      await readQuestionTimer();
      await endRound();
    }

    navigate('/results');
  };

  useEffect(() => {
    initQuiz();
  }, []);

  return (
    <div className="wrapper h-screen w-screen px-10 p-2 bg-primary-bg text-primary-color grid grid-rows-[0.3fr,0.4fr,1fr,0.2fr]">
      <QuestionHeaderComponent questionNumber={roundNumber} />
      <QuestionComponent
        question={questions && questions.length > 0 ? questions[0].question : ''}
      />
      <AnswersComponent answers={answers} isRoundDone={isRoundDone} />
      <ProgressComponent status={getPercentage(progress, questionTime)} />
    </div>
  );
};

export default GameView;
