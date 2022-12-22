import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';

import ListItemComponent from '@/components/common/ListItemComponent';
import ListComponent, { GapSizeEnum } from '@/components/common/ListComponent';

import {
  getStoredDifficulty,
  setDifficulty,
  UserDifficultyEnum,
} from '@/store/modules/game.slice';
import { useNavigate } from 'react-router-dom';

type IDifficultySettingView = {};

enum DisplayDifficultyEnum {
  'easy' = '🐣 Easy',
  'medium' = '🥩 Medium',
  'hard' = '👷‍♀️ Hard',
  'random' = '🎲 Random',
}

const DifficultySettingView: FC<IDifficultySettingView> = () => {
  const storedDifficulty = useAppSelector(getStoredDifficulty);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const chooseDifficultyHandler = (elementId: UserDifficultyEnum) => {
    if (elementId && Object.values(UserDifficultyEnum).includes(elementId)) {
      dispatch(setDifficulty(elementId as UserDifficultyEnum));
      setTimeout(() => {
        navigate('/ready');
      }, 500);
    }
  };

  const difficultyListItems: JSX.Element[] = [];

  // Loop through the difficulties and create a list item for each
  for (const difficulty of Object.values(UserDifficultyEnum)) {
    const userDifficulty = difficulty as UserDifficultyEnum;
    const isDifficultyChosen = storedDifficulty === userDifficulty;

    difficultyListItems.push(
      <ListItemComponent
        id={userDifficulty}
        key={difficulty}
        callBack={chooseDifficultyHandler}
        data-testid={`difficulty-${difficulty}`}
        overrideTestId={difficulty}
      >
        <p>{DisplayDifficultyEnum[userDifficulty]}</p>
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
