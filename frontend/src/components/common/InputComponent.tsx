import { ChangeEvent, FC } from 'react';

type IInputComponent = {
  type?: string;
  placeholder?: string;
  onChange: (valueToEmit: string) => any;
};

const InputComponent: FC<IInputComponent> = props => {
  const changeHandler = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const target = changeEvent.target;

    if (props.onChange) props.onChange(target.value);
  };

  return (
    <input
      className="bg-input-bg placeholder-placeholder-color pl-1 h-10 rounded text-primary-color"
      type={props.type ? props.type : 'text'}
      data-testid="input-element"
      placeholder={props.placeholder}
      onChange={changeHandler}
    />
  );
};

export default InputComponent;
