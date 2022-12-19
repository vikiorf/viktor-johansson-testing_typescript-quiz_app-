import { fireEvent, render, screen } from '@testing-library/react';

import AnswerComponent from '@/components/Specific/AnswerComponent';

describe('Tests Answer Component', function () {
  let isElementClicked: boolean;
  const nonSelectedAnswerBackGroundColorClass = 'primary-button-bg';
  const selectedAnswerBackGroundColorClass = 'bg-secondary-bg';
  const noBorderClass = 'border-none';
  const successBorderClass = 'border-success';
  const errorBorderClass = 'border-error-color';

  const handleFunction = () => {
    isElementClicked = true;
  };
  beforeEach(() => {
    isElementClicked = false;
  });

  it('verifies answer component renders with classes for answer not chosen.', function () {
    render(
      <AnswerComponent
        answer="Answer"
        isSelectedAnswer={false}
        onClick={handleFunction}
      />,
    );

    const answerElement = screen.getByTestId('answer-element');
    const answerElementClass = answerElement.getAttribute('class');

    expect(answerElement).toBeTruthy;
    expect(answerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);
    expect(answerElementClass).toContain(noBorderClass);
    expect(answerElement.textContent).toEqual('Answer');
  });

  it('verifies answer component executes passed function when clicked.', function () {
    render(
      <AnswerComponent
        answer="Answer"
        isSelectedAnswer={false}
        onClick={handleFunction}
      />,
    );

    const answerElement = screen.getByTestId('answer-element');
    fireEvent.click(answerElement);
    expect(isElementClicked).toBe(true);
  });

  it('verifies answer component renders with classes for selected answer.', function () {
    render(
      <AnswerComponent
        answer="Answer"
        isSelectedAnswer={true}
        onClick={handleFunction}
      />,
    );

    const answerElement = screen.getByTestId('answer-element');
    const answerElementClass = answerElement.getAttribute('class');

    expect(answerElementClass).toContain(selectedAnswerBackGroundColorClass);
    expect(answerElementClass).toContain(noBorderClass);
    expect(answerElement).toBeTruthy;
  });

  it('verifies answer component renders with classes for selected and correct answer.', function () {
    render(
      <AnswerComponent
        answer="Answer"
        isSelectedAnswer={true}
        isCorrectAnswer={true}
        onClick={handleFunction}
      />,
    );

    const answerElement = screen.getByTestId('answer-element');
    const answerElementClass = answerElement.getAttribute('class');

    expect(answerElementClass).toContain(successBorderClass);
    expect(answerElementClass).toContain(selectedAnswerBackGroundColorClass);
    expect(answerElement).toBeTruthy;
  });

  it('verifies answer component renders with classes for selected and incorrect answer.', function () {
    render(
      <AnswerComponent
        answer="Answer"
        isSelectedAnswer={true}
        isCorrectAnswer={false}
        onClick={handleFunction}
      />,
    );

    const answerElement = screen.getByTestId('answer-element');
    const answerElementClass = answerElement.getAttribute('class');

    expect(answerElementClass).toContain(errorBorderClass);
    expect(answerElementClass).toContain(selectedAnswerBackGroundColorClass);
    expect(answerElement).toBeTruthy;
  });

  it('verifies answer component renders with classes for non selected and correct answer.', function () {
    render(
      <AnswerComponent
        answer="Answer"
        isSelectedAnswer={false}
        isCorrectAnswer={true}
        onClick={handleFunction}
      />,
    );

    const answerElement = screen.getByTestId('answer-element');
    const answerElementClass = answerElement.getAttribute('class');

    expect(answerElementClass).toContain(successBorderClass);
    expect(answerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);
    expect(answerElement).toBeTruthy;
  });

  it('verifies answer component renders with classes for non selected and incorrect answer.', function () {
    render(
      <AnswerComponent
        answer="Answer"
        isSelectedAnswer={false}
        isCorrectAnswer={false}
        onClick={handleFunction}
      />,
    );

    const answerElement = screen.getByTestId('answer-element');
    const answerElementClass = answerElement.getAttribute('class');

    expect(answerElementClass).toContain(errorBorderClass);
    expect(answerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);
    expect(answerElement).toBeTruthy;
  });
});
