import { FC, useEffect, useState } from 'react';

export enum GapSizeEnum {
  SMALL = 'gap-4',
  MEDIUM = 'gap-8',
  BIG = 'gap-12',
}

type IListComponent = {
  gapSize?: GapSizeEnum;
};

const ListComponent: FC<IListComponent> = (props) => {
  const [classNames, setClassNames] = useState(
    'wrapper p-4 px-0 mt-4 bg-primary-bg text-primary-color grid justify-start ',
  );

  useEffect(() => {
    let gapSize = GapSizeEnum.MEDIUM;

    if (props.gapSize) {
      gapSize = props.gapSize;
    }

    setClassNames(classNames + gapSize);
  }, []);

  return (
    <ul data-testid="list-element" className={classNames}>
      {props.children}
    </ul>
  );
};

export default ListComponent;
