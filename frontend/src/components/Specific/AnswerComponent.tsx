import { FC, useState, useEffect } from 'react';

type IAnswerComponent = {
  answer: string;
  isSelectedAnswer: boolean;
  isCorrectAnswer?: boolean;
  onClick: () => void;
};

const AnswerComponent: FC<IAnswerComponent> = props => {
  const defaultClassName =
    'border-2 h-14 w-36 rounded flex flex-col text-center justify-center hover:cursor-pointer select-none';

  const [className, setClassName] = useState<string>(defaultClassName);

  const getBackGroundColor = () => {
    let answerBgColor = 'bg-primary-button-bg text-primary-bg';
    if (props.isSelectedAnswer) {
      answerBgColor = 'bg-secondary-bg text-primary-color';
    }
    return answerBgColor;
  };

  const getBorderColor = () => {
    let answerBorderColor = 'border-none';

    if (typeof props.isCorrectAnswer === 'undefined') return answerBorderColor;

    if (props.isCorrectAnswer) {
      answerBorderColor = 'border-2 border-success-color shadow-md shadow-success-color';
    } else if (!props.isCorrectAnswer) {
      answerBorderColor = 'border-2 border-error-color';
    }
    return answerBorderColor;
  };

  useEffect(() => {
    const bgColor = getBackGroundColor();
    const borderColor = getBorderColor();

    setClassName(defaultClassName + ' ' + bgColor + ' ' + borderColor);
  }, [props.isSelectedAnswer, props.isCorrectAnswer]);

  return (
    <div className={className} data-testid="answer-element" onClick={props.onClick}>
      {props.answer}
    </div>
  );
};

export default AnswerComponent;
