import { screen } from '@testing-library/react';

import { renderWithProviders } from '../utils/test-utils';

import QuestionComponent from '@/components/Specific/QuestionComponent';

describe('Tests Question Component', function () {
  it('verifies question is rendered', function () {
    renderWithProviders(<QuestionComponent question={'This is a question?'} />);

    const questionNumberElement = screen.getByTestId('question-element');

    expect(questionNumberElement).toBeTruthy;
    expect(questionNumberElement.textContent).toEqual('This is a question?');
  });

  it('verifies empty question is rendered', function () {
    renderWithProviders(<QuestionComponent question={''} />);

    const questionNumberElement = screen.getByTestId('question-element');

    expect(questionNumberElement).toBeTruthy;
    expect(questionNumberElement.textContent).toEqual('');
  });
});
