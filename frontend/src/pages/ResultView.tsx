import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { FC, useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getStoredRounds, setIsPlaying } from '@/store/modules/game.slice';

import ButtonComponent, { ButtonSizeEnum } from '@/components/common/ButtonComponent';

type IResultView = {};

const ResultView: FC<IResultView> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const storedRounds = useAppSelector(getStoredRounds);

  const [totalPoints, setTotalPoints] = useState(0);

  const playButtonHandler = () => {
    dispatch(setIsPlaying(true));
    navigate('/game');
  };

  const calculateTotalPoints = () => {
    let totalPoints = 0;
    for (const round of storedRounds) {
      totalPoints += round.score;
    }
    setTotalPoints(totalPoints);
  };

  useEffect(() => {
    calculateTotalPoints();
  }, []);

  return (
    <div className="wrapper h-screen w-screen p-10 bg-primary-bg grid grid-rows-[0.3fr,0.4fr,1fr,0.2fr]">
      <h1
        className="font-bold text-3xl text-center text-primary-color mt-0 font-default underline"
        data-testid="ready-heading"
      >
        🎉Nice Job!🎉
      </h1>
      <h2 className="self-center justify-self-center text-primary-color text-2xl">
        You scored {totalPoints} points!
      </h2>
      <div className="self-center justify-self-center flex flex-col">
        <ButtonComponent
          onClick={playButtonHandler}
          buttonSize={ButtonSizeEnum.LARGE}
          extendCssClass="row-start-1 col-start-1"
          label="Play again"
          overrideTestId="play-button"
        />
        <Link
          to={'/'}
          data-testid="regret-link"
          className="row-start-1 col-start-1 mt-10 text-secondary-button-bg underline self-center"
        >
          Go to start page..
        </Link>
      </div>
    </div>
  );
};

export default ResultView;
