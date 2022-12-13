import { FC, useState, useEffect } from 'react';

export enum ButtonStyleEnum {
  PRIMARY = 'bg-primary-button-bg text-primary-bg',
  SECONDARY = 'bg-secondary-button-bg text-primary-color',
}

type IInputComponent = {
  buttonType?: 'button' | 'submit';
  buttonStyle?: ButtonStyleEnum;
  label: string;
  onClick?: () => void;
};

const ButtonComponent: FC<IInputComponent> = props => {
  const [buttonType, setButtonType] = useState('button');
  const [className, setClassName] = useState(
    'placeholder-placeholder-color pl-1 h-10 rounded w-24 hover:cursor-pointer self-center justify-self-center ',
  );

  useEffect(() => {
    let buttonStyle = ButtonStyleEnum.PRIMARY;
    if (props.buttonStyle) buttonStyle = props.buttonStyle;
    setClassName(className + buttonStyle);

    if (props.buttonType) setButtonType(props.buttonType);
  }, []);

  const clickHandler = () => {
    if (props.onClick) props.onClick();
  };

  return (
    <input
      className={className}
      type={buttonType}
      data-testid="button-element"
      value={props.label}
      onClick={clickHandler}
    />
  );
};

export default ButtonComponent;
