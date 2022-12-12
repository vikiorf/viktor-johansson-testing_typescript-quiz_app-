import ListComponent, { GapSizeEnum } from '@/components/common/ListComponent';
import { FC } from 'react';

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
        <li className="text-start">🙍‍♀️ Play alone</li>
        <li>💃 Play with other people</li>
      </ListComponent>
    </div>
  );
};

export default HomeView;
