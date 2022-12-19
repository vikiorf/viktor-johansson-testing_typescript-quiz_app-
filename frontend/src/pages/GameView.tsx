import axios from 'axios';
import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { getStoredCookieConsent, getStoredUserName } from '@/store/modules/user.slice';
import QuestionComponent from '@/components/Specific/QuestionComponent';
import QuestionHeaderComponent from '@/components/Specific/QuestionHeaderComponent';
import ProgressComponent from '@/components/Specific/ProgressComponent';
import { getStoredDifficulty } from '@/store/modules/game.slice';
import { getStoredIsPlaying, setRound } from '@/store/modules/game.slice';
import { useNavigate } from 'react-router';

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
  incorrectAnswers: string[3];
  isNiche: boolean;
  question: string;
  regions: string[];
  tags: string[];
  type: string;
}

const GameView: FC<IGameView> = () => {
  const isCookiesConsentApproved = useAppSelector(getStoredCookieConsent);
  const isPlaying = useAppSelector(getStoredIsPlaying);
  const storedDifficulty = useAppSelector(getStoredDifficulty);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(0);

  const [questions, setQuestions] = useState<ITriviaQuestion[]>([]);

  let interval: NodeJS.Timeout;

  const fetchQuestionsFromAPI = async () => {
    const response = await axios.get(
      `https://the-trivia-api.com/api/questions?limit=1&difficulty=${storedDifficulty.toLowerCase()}`,
    );

    return response.data;
  };

  const getPercentage = (value: number, total: number) => {
    return (value / total) * 100;
  };

  const answerQuestionTimer = () => {
    let i = 0;
    interval = setInterval(() => {
      i += 100;
      setProgress(i);
      if (i >= 3000) return clearInterval(interval);
    }, 100);
  };

  const readQuestionTimer = () => {
    let i = 0;
    interval = setInterval(() => {
      i += 100;
      setProgress(i);
      if (i >= 3000) return clearInterval(interval);
    }, 100);
  };

  const beginRound = async (roundNumber: number) => {
    const questions = await fetchQuestionsFromAPI();
    dispatch(setRound(1));
    setQuestions(questions);
    readQuestionTimer();
  };

  const initQuiz = async () => {
    if (!isCookiesConsentApproved || !isPlaying) return navigate('/');
    beginRound(1);
  };

  useEffect(() => {
    initQuiz();
  }, []);

  return (
    <div className="wrapper h-screen w-screen px-10 p-2 bg-primary-bg text-primary-color grid grid-rows-[0.3fr,1fr,0.2fr]">
      <QuestionHeaderComponent questionNumber={1} />
      <QuestionComponent
        question={questions && questions.length > 0 ? questions[0].question : ''}
      />
      <ProgressComponent status={getPercentage(progress, 3000)} />
    </div>
  );
};

export default GameView;
