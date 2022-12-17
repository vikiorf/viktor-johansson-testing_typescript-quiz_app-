import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';

import ListItemComponent from '@/components/common/ListItemComponent';
import ListComponent, { GapSizeEnum } from '@/components/common/ListComponent';

import {
  getStoredLanguage,
  LanguageEnum,
  setLanguage,
} from '@/store/modules/gameSettings.slice';
import { useNavigate } from 'react-router';

type ILanguageSettingView = {};

const LanguageSettingView: FC<ILanguageSettingView> = () => {
  const storedLanguage = useAppSelector(getStoredLanguage);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const chooseLanguageHandler = (elementId: LanguageEnum) => {
    if (elementId && Object.values(LanguageEnum).includes(elementId)) {
      dispatch(setLanguage(elementId as LanguageEnum));
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  };

  return (
    <div className="wrapper h-screen w-screen p-10 bg-primary-bg">
      <h1
        className="font-bold text-3xl text-center text-primary-color mt-0 font-default underline"
        data-testid="language-heading"
      >
        Choose language
      </h1>
      <ListComponent gapSize={GapSizeEnum.BIG}>
        <ListItemComponent
          overrideTestId="en"
          callBack={() => chooseLanguageHandler(LanguageEnum.EN)}
        >
          🇬🇧 English
          {storedLanguage === 'en' && <p>✅</p>}
        </ListItemComponent>
        <ListItemComponent
          overrideTestId="se"
          callBack={() => chooseLanguageHandler(LanguageEnum.SE)}
        >
          🇸🇪 Swedish
          {storedLanguage === 'se' && <p>✅</p>}
        </ListItemComponent>
      </ListComponent>
    </div>
  );
};

export default LanguageSettingView;
