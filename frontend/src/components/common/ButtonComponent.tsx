import { FC, useState, useEffect } from 'react';

export enum ButtonStyleEnum {
  PRIMARY = 'bg-primary-button-bg text-primary-bg',
  SECONDARY = 'bg-secondary-button-bg text-primary-color',
}

export enum ButtonSizeEnum {
  MEDIUM = 'w-24 h-10',
  LARGE = 'w-36 h-14 text-xl',
}

type IInputComponent = {
  buttonType?: 'button' | 'submit';
  buttonSize?: ButtonSizeEnum;
  buttonStyle?: ButtonStyleEnum;
  label: string;
  onClick?: () => void;
  extendCssClass?: string;
};

const ButtonComponent: FC<IInputComponent> = props => {
  const [buttonType, setButtonType] = useState('button');
  const [className, setClassName] = useState(
    'placeholder-placeholder-color pl-1 rounded hover:cursor-pointer self-center justify-self-center ',
  );

  useEffect(() => {
    let cssClasses = '';
    let buttonStyle = ButtonStyleEnum.PRIMARY;
    let buttonSize = ButtonSizeEnum.MEDIUM;

    if (props.buttonStyle) buttonStyle = props.buttonStyle;

    if (props.extendCssClass) cssClasses += props.extendCssClass;

    if (props.buttonSize === ButtonSizeEnum.LARGE) buttonSize = ButtonSizeEnum.LARGE;

    cssClasses += ' ' + buttonSize;
    cssClasses += ' ' + buttonStyle;

    setClassName(className + cssClasses);

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
