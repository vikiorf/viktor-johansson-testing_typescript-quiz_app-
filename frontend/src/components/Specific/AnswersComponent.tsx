import { FC, useEffect, useState } from 'react';
import AnswerComponent from './AnswerComponent';

interface IAnswer {
  answer: string;
  isCorrectAnswer?: boolean;
  isSelectedAnswer: boolean;
}

type IAnswersComponent = {
  answers: IAnswer[];
  isRoundDone: boolean;
};

const AnswersComponent: FC<IAnswersComponent> = props => {
  const [mappedAnswers, setMappedAnswers] = useState<IAnswer[]>([]);

  const setSelectedAnswerUnsetAllOtherAnswers = (answerIndex: number) => {
    if (props.isRoundDone) return;
    const tempAnswers = [...mappedAnswers];
    tempAnswers.forEach((answer, index) => {
      if (index !== answerIndex) answer.isSelectedAnswer = false;
      if (index === answerIndex) answer.isSelectedAnswer = true;
    });
    setMappedAnswers(tempAnswers);
  };

  const mapAnswersWhenRoundIsNotDone = () => {
    const tempAnswers = [...props.answers];
    return tempAnswers.map(answer => {
      return {
        answer: answer.answer,
        isSelectedAnswer: answer.isSelectedAnswer,
      };
    });
  };

  const mapAnswersWhenRoundIsDone = (): IAnswer[] => {
    const tempAnswers = [...mappedAnswers];

    return tempAnswers.map((answer, index) => {
      return {
        answer: answer.answer,
        isCorrectAnswer: props.answers[index].isCorrectAnswer,
        isSelectedAnswer: answer.isSelectedAnswer,
      };
    });
  };

  useEffect(() => {
    const mappedAnswers = props.isRoundDone
      ? mapAnswersWhenRoundIsDone()
      : mapAnswersWhenRoundIsNotDone();
    setMappedAnswers(mappedAnswers);
  }, [props.isRoundDone, props.answers]);

  return (
    <div
      data-testid="answer-container-element"
      className="grid grid-cols-2 gap-4 content-center align-center justify-center justify-items-center"
    >
      {mappedAnswers.map((answer, index) => {
        return (
          <AnswerComponent
            key={index}
            answer={answer.answer}
            isSelectedAnswer={answer.isSelectedAnswer}
            isCorrectAnswer={answer.isCorrectAnswer}
            onClick={() => setSelectedAnswerUnsetAllOtherAnswers(index)}
          />
        );
      })}
    </div>
  );
};

export default AnswersComponent;
