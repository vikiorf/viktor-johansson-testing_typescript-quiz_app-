import { fireEvent, render, screen } from '@testing-library/react';

import AnswersComponent from '@/components/Specific/AnswersComponent';

describe('Tests Answers Component', function () {
  const nonSelectedAnswerBackGroundColorClass = 'bg-secondary-bg';
  const selectedAnswerBackGroundColorClass = 'primary-button-bg';
  const noBorderClass = 'border-none';

  const testData = [
    { answer: 'Answer 1', isSelectedAnswer: false, isCorrectAnswer: false },
    { answer: 'Answer 2', isSelectedAnswer: false, isCorrectAnswer: false },
    { answer: 'Answer 3', isSelectedAnswer: false, isCorrectAnswer: false },
    { answer: 'Answer 4', isSelectedAnswer: false, isCorrectAnswer: false },
  ];

  const emptyFunction = () => {};

  it('verifies answers component renders with classes correct amount of child elements.', function () {
    render(
      <AnswersComponent
        answers={testData}
        isRoundDone={false}
        setSelectedAnswer={emptyFunction}
      />,
    );

    const answerContainerElement = screen.getByTestId('answer-container-element');

    expect(answerContainerElement).toBeTruthy;
    expect(answerContainerElement.children).toHaveLength(testData.length);
  });

  it('verifies answers component updates classes for answered children.', function () {
    render(
      <AnswersComponent
        answers={testData}
        isRoundDone={false}
        setSelectedAnswer={emptyFunction}
      />,
    );

    const answerContainerElement = screen.getByTestId('answer-container-element');
    const firstAnswerElement = answerContainerElement.children[0];

    let firstAnswerElementClass = firstAnswerElement.getAttribute('class');

    expect(firstAnswerElement).toBeTruthy;
    expect(firstAnswerElement.textContent).toEqual('Answer 1');
    expect(firstAnswerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);

    fireEvent.click(firstAnswerElement);
    firstAnswerElementClass = firstAnswerElement.getAttribute('class');

    expect(firstAnswerElementClass).toContain(selectedAnswerBackGroundColorClass);
    expect(firstAnswerElementClass).toContain(noBorderClass);
  });

  it('verifies answers component does not update classes for unanswered children.', function () {
    render(
      <AnswersComponent
        answers={testData}
        isRoundDone={false}
        setSelectedAnswer={emptyFunction}
      />,
    );

    const answerContainerElement = screen.getByTestId('answer-container-element');
    const firstAnswerElement = answerContainerElement.children[0];
    const secondAnswerElement = answerContainerElement.children[1];

    let secondAnswerElementClass = secondAnswerElement.getAttribute('class');

    expect(secondAnswerElement).toBeTruthy;
    expect(secondAnswerElement.textContent).toEqual('Answer 2');
    expect(secondAnswerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);

    fireEvent.click(firstAnswerElement);

    secondAnswerElementClass = secondAnswerElement.getAttribute('class');

    expect(secondAnswerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);
    expect(secondAnswerElementClass).toContain(noBorderClass);
  });

  it('verifies answers component updates classes for 4 children.', function () {
    render(
      <AnswersComponent
        answers={testData}
        isRoundDone={false}
        setSelectedAnswer={emptyFunction}
      />,
    );

    const answerContainerElement = screen.getByTestId('answer-container-element');
    const firstAnswerElement = answerContainerElement.children[0];
    const secondAnswerElement = answerContainerElement.children[1];
    const thirdAnswerElement = answerContainerElement.children[2];
    const fourthAnswerElement = answerContainerElement.children[3];

    let firstElementClass = firstAnswerElement.getAttribute('class');
    let secondAnswerElementClass = secondAnswerElement.getAttribute('class');
    let thirdAnswerElementClass = thirdAnswerElement.getAttribute('class');
    let fourthAnswerElementClass = fourthAnswerElement.getAttribute('class');

    expect(firstElementClass).toContain(nonSelectedAnswerBackGroundColorClass);
    expect(secondAnswerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);
    expect(thirdAnswerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);
    expect(fourthAnswerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);

    fireEvent.click(firstAnswerElement);

    firstElementClass = firstAnswerElement.getAttribute('class');
    secondAnswerElementClass = secondAnswerElement.getAttribute('class');
    thirdAnswerElementClass = thirdAnswerElement.getAttribute('class');
    fourthAnswerElementClass = fourthAnswerElement.getAttribute('class');

    expect(firstElementClass).toContain(selectedAnswerBackGroundColorClass);
    expect(secondAnswerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);
    expect(thirdAnswerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);
    expect(fourthAnswerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);

    fireEvent.click(secondAnswerElement);

    firstElementClass = firstAnswerElement.getAttribute('class');
    secondAnswerElementClass = secondAnswerElement.getAttribute('class');
    thirdAnswerElementClass = thirdAnswerElement.getAttribute('class');
    fourthAnswerElementClass = fourthAnswerElement.getAttribute('class');

    expect(firstElementClass).toContain(nonSelectedAnswerBackGroundColorClass);
    expect(secondAnswerElementClass).toContain(selectedAnswerBackGroundColorClass);
    expect(thirdAnswerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);
    expect(fourthAnswerElementClass).toContain(nonSelectedAnswerBackGroundColorClass);
  });
});
