import { FC } from 'react';

type IQuestionHeaderComponent = {
  questionNumber: number;
};

const QuestionHeaderComponent: FC<IQuestionHeaderComponent> = props => {
  return (
    <div data-testid="question-header-element" className="flex flex-col items-center">
      <p>Question</p>
      <h1 className="text-3xl mt-6">
        <span data-testid="question-number-element">{props.questionNumber}</span> of 12
      </h1>
    </div>
  );
};

export default QuestionHeaderComponent;
