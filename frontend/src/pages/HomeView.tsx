import { FC } from 'react';

import { useAppSelector } from '@/app/hooks';

import ListItemComponent from '@/components/common/ListItemComponent';
import ListComponent, { GapSizeEnum } from '@/components/common/ListComponent';
import CookiePromptComponent from '@/components/Specific/CookiePromptComponent';
import { getStoredCookieConsent, getStoredUserName } from '@/store/modules/user.slice';
import NameInputComponent from '@/components/Specific/NameInputComponent';

type IHomeView = {};

const HomeView: FC<IHomeView> = () => {
  const isCookiesConsentApproved = useAppSelector(getStoredCookieConsent);
  const isUserNameEntered = !!useAppSelector(getStoredUserName);

  return (
    <div className="wrapper h-screen w-screen p-10 bg-primary-bg ">
      <h1
        className="font-bold text-3xl text-center text-primary-color mt-0 font-default"
        data-testid="welcome-heading"
      >
        Welcome [user]
      </h1>
      <ListComponent gapSize={GapSizeEnum.MEDIUM}>
        <ListItemComponent>🙍‍♀️ Play alone</ListItemComponent>
        <ListItemComponent>💃 Play with other people</ListItemComponent>
      </ListComponent>
      {!isUserNameEntered && <NameInputComponent />}
      {!isCookiesConsentApproved && <CookiePromptComponent />}
    </div>
  );
};

export default HomeView;
