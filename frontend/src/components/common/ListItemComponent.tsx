import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type IListItemComponent = {
  linkUrl?: string;
};

const ListItemComponent: FC<IListItemComponent> = (props) => {
  if (props.linkUrl)
    return (
      <Link data-testid="list-item-element" to={props.linkUrl}>
        {props.children}
      </Link>
    );
  return <li data-testid="list-item-element">{props.children}</li>;
};

export default ListItemComponent;
