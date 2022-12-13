import { FC, useState, useEffect } from 'react';

type IInputComponent = {
  buttonType?: 'button' | 'submit';
  label: string;
  onClick: () => void;
};

const ButtonComponent: FC<IInputComponent> = props => {
  const [buttonType, setButtonType] = useState('button');

  useEffect(() => {
    if (props.buttonType) setButtonType(props.buttonType);
  }, []);

  const clickHandler = () => {
    props.onClick();
  };

  return (
    <input
      className="bg-input-bg placeholder-placeholder-color pl-1 h-10 rounded text-primary-color"
      type={buttonType}
      data-testid="button-element"
      value={props.label}
      onClick={clickHandler}
    />
  );
};

export default ButtonComponent;
