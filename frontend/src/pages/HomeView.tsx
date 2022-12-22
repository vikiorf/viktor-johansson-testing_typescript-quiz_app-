import { FC } from 'react';

import { useAppSelector } from '@/app/hooks';
import { getStoredCookieConsent, getStoredUserName } from '@/store/modules/user.slice';

import ListItemComponent from '@/components/common/ListItemComponent';
import NameInputComponent from '@/components/Specific/NameInputComponent';
import ListComponent, { GapSizeEnum } from '@/components/common/ListComponent';
import CookiePromptComponent from '@/components/Specific/CookiePromptComponent';

type IHomeView = {};

const HomeView: FC<IHomeView> = () => {
  const isCookiesConsentApproved = useAppSelector(getStoredCookieConsent);
  const storedUserName = useAppSelector(getStoredUserName);

  const isUserNameEntered = !!storedUserName;

  return (
    <div className="wrapper h-screen w-screen p-10 bg-primary-bg ">
      <h1
        className="font-bold text-3xl text-center text-primary-color mt-0 font-default"
        data-testid="welcome-heading"
      >
        Welcome {storedUserName}
      </h1>
      <ListComponent gapSize={GapSizeEnum.MEDIUM}>
        <ListItemComponent linkUrl="/difficulty-setup">🙍‍♀️ Play alone</ListItemComponent>
        <ListItemComponent>💃 Play with other people</ListItemComponent>
      </ListComponent>
      {!isUserNameEntered && <NameInputComponent />}
      {!isCookiesConsentApproved && <CookiePromptComponent />}
    </div>
  );
};

export default HomeView;
