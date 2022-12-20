import { FC } from 'react';

import { useAppDispatch } from '@/app/hooks';

import { useNavigate } from 'react-router';
import ButtonComponent, { ButtonSizeEnum } from '@/components/common/ButtonComponent';
import { Link } from 'react-router-dom';
import { setIsPlaying } from '@/store/modules/game.slice';

type IReadyView = {};

const ReadyView: FC<IReadyView> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const playButtonHandler = () => {
    dispatch(setIsPlaying(true));
    navigate('/game');
  };

  return (
    <div className="wrapper h-screen w-screen p-10 bg-primary-bg grid">
      <h1
        className="font-bold text-3xl row-start-1 col-start-1 text-center text-primary-color mt-0 font-default underline"
        data-testid="ready-heading"
      >
        Ready?
      </h1>
      <div className="row-start-1 col-start-1 self-center justify-self-center flex flex-col">
        <ButtonComponent
          onClick={playButtonHandler}
          buttonSize={ButtonSizeEnum.LARGE}
          extendCssClass="row-start-1 col-start-1"
          label="Play"
          overrideTestId="play-button"
        />
        <Link
          to={'/difficulty-setup'}
          data-testid="regret-link"
          className="row-start-1 col-start-1 mt-10 text-secondary-button-bg underline self-center"
        >
          I regret my choices
        </Link>
      </div>
    </div>
  );
};

export default ReadyView;
