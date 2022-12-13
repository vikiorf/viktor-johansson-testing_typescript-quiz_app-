import { ChangeEvent, FC, useEffect, useState } from 'react';

type IInputComponent = {
  inputType?: string;
  placeholder?: string;
  initialValue?: string;
  errorLabel?: string;
  onInputChange: (valueToEmit: string) => void;
};

const InputComponent = (props: IInputComponent) => {
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('text');

  useEffect(() => {
    if (props.initialValue) setInputValue(props.initialValue);
    if (props.inputType) setInputType(props.inputType);
  }, []);

  const changeHandler = (
    changeEvent: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const target = changeEvent.target;
    setInputValue(target.value);

    if (props.onInputChange) props.onInputChange(target.value);
  };

  return (
    <>
      <input
        id="input-element"
        className="bg-input-bg placeholder-placeholder-color pl-1 h-10 rounded text-primary-color mb-1"
        type={inputType}
        data-testid="input-element"
        placeholder={props.placeholder}
        value={inputValue}
        onChange={changeHandler}
      />
      {props.errorLabel && (
        <label
          data-testid="error-label-element"
          className="text-error-color mb-1"
          htmlFor="input-element"
        >
          {props.errorLabel}
        </label>
      )}
    </>
  );
};

export default InputComponent;
