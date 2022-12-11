import { FC } from 'react';

const HomeView: FC = () => {
  return (
    <div className="wrapper h-screen w-screen text-center p-10 bg-primary-bg ">
      <h1 className="font-bold text-3xl text-primary-color mt-0 font-default">
        Welcome [user]
      </h1>
    </div>
  );
};

export default HomeView;
