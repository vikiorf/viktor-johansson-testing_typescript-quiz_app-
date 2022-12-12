import { FC, useEffect, useState } from 'react';

export enum GapSizeEnum {
  SMALL = 4,
  MEDIUM = 8,
  BIG = 12,
}

type IListComponent = {
  gapSize?: GapSizeEnum;
};

const ListComponent: FC<IListComponent> = (props) => {
  const [gapSize, setGapSize] = useState<GapSizeEnum>(GapSizeEnum.MEDIUM);

  useEffect(() => {
    if (props.gapSize) {
      setGapSize(props.gapSize);
    }
  }, []);

  return (
    <ul
    data-testid="list-element"
      className={
        'wrapper p-4 mt-4 bg-primary-bg text-primary-color grid justify-start ' +
        'gap-' +
        gapSize
      }
    >
      {props.children}
    </ul>
  );
};

export default ListComponent;
