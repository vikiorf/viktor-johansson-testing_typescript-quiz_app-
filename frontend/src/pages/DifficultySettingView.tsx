import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';

import ListItemComponent from '@/components/common/ListItemComponent';
import ListComponent, { GapSizeEnum } from '@/components/common/ListComponent';

import {
  DifficultyEnum,
  getStoredDifficulty,
  setDifficulty,
} from '@/store/modules/gameSettings.slice';
import { useNavigate } from 'react-router-dom';

type IDifficultySettingView = {};

const DifficultySettingView: FC<IDifficultySettingView> = () => {
  const storedDifficulty = useAppSelector(getStoredDifficulty);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const chooseDifficultyHandler = (elementId: string) => {
    if (elementId && Object.keys(DifficultyEnum).includes(elementId)) {
      dispatch(setDifficulty(elementId as DifficultyEnum));
      setTimeout(() => {
        navigate('/language-setup');
      }, 500);
    }
  };

  let difficulty: keyof typeof DifficultyEnum;

  const difficultyListItems: JSX.Element[] = [];

  // Loop through the difficulties and create a list item for each
  for (difficulty in DifficultyEnum) {
    const isDifficultyChosen = storedDifficulty === difficulty;
    difficultyListItems.push(
      <ListItemComponent
        id={difficulty}
        key={difficulty}
        callBack={chooseDifficultyHandler}
        data-testid={`difficulty-${difficulty}`}
        overrideTestId={difficulty}
      >
        <p>{DifficultyEnum[difficulty]}</p>
        {isDifficultyChosen && <p>✅</p>}
      </ListItemComponent>,
    );
  }

  return (
    <>
      <div className="wrapper h-screen w-screen p-10 bg-primary-bg">
        <h1
          className="font-bold text-3xl text-center text-primary-color mt-0 font-default underline"
          data-testid="difficulty-heading"
        >
          Choose difficulty
        </h1>
        <ListComponent gapSize={GapSizeEnum.BIG}>{difficultyListItems}</ListComponent>
      </div>
    </>
  );
};

export default DifficultySettingView;
