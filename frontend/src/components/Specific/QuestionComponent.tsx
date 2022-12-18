import { FC } from 'react';

type IQuestionComponent = {
  question: string;
};

const QuestionComponent: FC<IQuestionComponent> = props => {
  return <div data-testid="question-element" className="text-3xl self-start">{props.question}</div>;
};

export default QuestionComponent;
