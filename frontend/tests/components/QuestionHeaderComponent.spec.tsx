import { screen } from '@testing-library/react';

import { renderWithProviders } from '../utils/test-utils';

import QuestionHeaderComponent from '@/components/Specific/QuestionHeaderComponent';

describe('Tests Question Header Component', function () {
  it('verifies question header is rendered', function () {
    renderWithProviders(
      <QuestionHeaderComponent currentQuestionNumber={2} totalAmountOfQuestions={9} />,
    );

    const questionNumberElement = screen.getByTestId('question-header-element');

    expect(questionNumberElement).toBeTruthy;
    expect(questionNumberElement.children).toHaveLength(2);
  });

  it('verifies question header is rendered with correct number', function () {
    renderWithProviders(
      <QuestionHeaderComponent currentQuestionNumber={1} totalAmountOfQuestions={9} />,
    );

    const questionNumberElement = screen.getByTestId('question-number-element');

    expect(questionNumberElement).toBeTruthy;
    expect(questionNumberElement.textContent).toEqual('1');
  });

  it('verifies question header is rendered with correct total number', function () {
    renderWithProviders(
      <QuestionHeaderComponent currentQuestionNumber={1} totalAmountOfQuestions={9} />,
    );

    const questionNumberElement = screen.getByTestId('total-question-number-element');

    expect(questionNumberElement).toBeTruthy;
    expect(questionNumberElement.textContent).toEqual('9');
  });
});
