import { FC } from 'react';

type IQuestionHeaderComponent = {
  currentQuestionNumber: number;
  totalAmountOfQuestions: number;
};

const QuestionHeaderComponent: FC<IQuestionHeaderComponent> = props => {
  return (
    <div data-testid="question-header-element" className="flex flex-col items-center">
      <p>Question</p>
      <h1 className="text-3xl mt-6">
        <span data-testid="question-number-element">{props.currentQuestionNumber}</span>{' '}
        of{' '}
        <span data-testid="total-question-number-element">
          {props.totalAmountOfQuestions}
        </span>
      </h1>
    </div>
  );
};

export default QuestionHeaderComponent;
