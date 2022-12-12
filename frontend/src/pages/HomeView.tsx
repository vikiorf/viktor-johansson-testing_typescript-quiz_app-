import { FC } from 'react';

type IHomeView = {};

const HomeView: FC<IHomeView> = () => {
  return (
    <div className="wrapper h-screen w-screen text-center p-10 bg-primary-bg ">
      <h1
        className="font-bold text-3xl text-primary-color mt-0 font-default"
        data-testid="welcome-heading"
      >
        Welcome [user]
      </h1>
    </div>
  );
};

export default HomeView;
