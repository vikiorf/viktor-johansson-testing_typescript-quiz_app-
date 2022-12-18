import { FC } from 'react';

import QuestionComponent from '@/components/Specific/QuestionComponent';
import QuestionHeaderComponent from '@/components/Specific/QuestionHeaderComponent';
import ProgressComponent from '@/components/Specific/ProgressComponent';

type IGameView = {};

const GameView: FC<IGameView> = () => {
  return (
    <div className="wrapper h-screen w-screen px-10 p-2 bg-primary-bg text-primary-color grid grid-rows-[0.3fr,1fr,0.2fr]">
      <QuestionHeaderComponent questionNumber={1} />
      <QuestionComponent question="Which English rock band released the song 'Get Back'?" />
      <ProgressComponent status={80} />
    </div>
  );
};

export default GameView;
