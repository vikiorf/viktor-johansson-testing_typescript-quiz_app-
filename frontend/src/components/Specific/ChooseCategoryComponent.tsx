import { FC } from 'react';
import GridItemComponent from '../common/GridItemComponent';

type IChooseCategoryComponent = {
  categories: string[];
  setSelectedAnswer: (answersArrayIndex: number) => void;
};

const ChooseCategoryComponent: FC<IChooseCategoryComponent> = ({
  categories,
  setSelectedAnswer,
}) => {
  return (
    <div
      data-testid="answer-container-element"
      className="grid grid-cols-2 gap-4 content-center align-center justify-center justify-items-center"
    >
      {categories.map((category, index) => {
        return (
          <GridItemComponent
            key={index}
            isSelected={false}
            textContent={category}
            onClick={() => setSelectedAnswer(index)}
          />
        );
      })}
    </div>
  );
};

export default ChooseCategoryComponent;
