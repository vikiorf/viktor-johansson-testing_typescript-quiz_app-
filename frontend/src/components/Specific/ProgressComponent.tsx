import { FC, useEffect, useState } from 'react';

type IProgressComponent = {
  status: number;
};

const ProgressComponent: FC<IProgressComponent> = props => {
  const [progressPercentage, setProgressPercentage] = useState({ width: '0%' });

  useEffect(() => {
    const progressPercentage = { width: props.status + '%' };
    setProgressPercentage(progressPercentage);
  }, [props.status]);

  return (
    <div data-testid="progress-element" className="bg-input-bg h-6 rounded-2xl">
      <div
        data-testid="progress-bar-element"
        className="bg-primary-button-bg h-6 rounded-2xl"
        style={progressPercentage}
      ></div>
    </div>
  );
};

export default ProgressComponent;
