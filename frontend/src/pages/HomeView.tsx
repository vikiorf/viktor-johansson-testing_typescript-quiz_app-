import { FC } from 'react';

import ListItemComponent from '@/components/common/ListItemComponent';
import ListComponent, { GapSizeEnum } from '@/components/common/ListComponent';

type IHomeView = {};

const HomeView: FC<IHomeView> = () => {
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
    </div>
  );
};

export default HomeView;
