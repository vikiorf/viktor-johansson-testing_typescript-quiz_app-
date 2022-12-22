import { fireEvent, render, screen } from '@testing-library/react';

import GridItemComponent from '@/components/common/GridItemComponent';

describe('Tests Answer Component', function () {
  let isElementClicked: boolean;
  const nonSelectedAnswerBackGroundColorClass = 'bg-secondary-bg';
  const selectedAnswerBackGroundColorClass = 'primary-button-bg';
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
      <GridItemComponent
        textContent="Answer"
        isSelected={false}
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
      <GridItemComponent
        textContent="Answer"
        isSelected={false}
        onClick={handleFunction}
      />,
    );

    const answerElement = screen.getByTestId('answer-element');
    fireEvent.click(answerElement);
    expect(isElementClicked).toBe(true);
  });

  it('verifies answer component renders with classes for selected answer.', function () {
    render(
      <GridItemComponent
        textContent="Answer"
        isSelected={true}
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
      <GridItemComponent
        textContent="Answer"
        isSelected={true}
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
      <GridItemComponent
        textContent="Answer"
        isSelected={true}
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
      <GridItemComponent
        textContent="Answer"
        isSelected={false}
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
      <GridItemComponent
        textContent="Answer"
        isSelected={false}
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
