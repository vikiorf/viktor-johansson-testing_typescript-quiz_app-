import { FC } from 'react';
import { Link } from 'react-router-dom';

type IListItemComponent = {
  linkUrl?: string;
  callBack?: (...args: any[]) => any;
  id?: string;
  overrideTestId?: string;
};

const ListItemComponent: FC<IListItemComponent> = props => {
  const clickHandler = () => {
    if (props.callBack) props.callBack(props.id);
  };

  if (props.linkUrl)
    return (
      <Link
        id={props.id}
        data-testid={props.overrideTestId ? props.overrideTestId : 'list-item-element'}
        to={props.linkUrl}
      >
        {props.children}
      </Link>
    );
  return (
    <li
      id={props.id}
      data-testid={props.overrideTestId ? props.overrideTestId : 'list-item-element'}
      onClick={clickHandler}
    >
      {props.children}
    </li>
  );
};

export default ListItemComponent;
