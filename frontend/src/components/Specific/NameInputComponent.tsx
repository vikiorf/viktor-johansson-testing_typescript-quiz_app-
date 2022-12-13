import { FC, useState, FormEvent } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getStoredUserName, setUserName } from '@/store/modules/user.slice';

import ButtonComponent from '../common/ButtonComponent';
import ModalComponent from '../common/ModalComponent';
import InputComponent from '../common/InputComponent';

type INameInputComponent = {};

const NameInputComponent: FC<INameInputComponent> = () => {
  const [name, setName] = useState('');
  const [nameInputErrorLabel, setNameInputErrorLabel] = useState('');

  const isUserNameEntered = !!useAppSelector(getStoredUserName);
  const dispatch = useAppDispatch();

  const validateNameInput = () => {
    if (!name || !name.trim()) return false;
    return true;
  };

  const confirmUserNameHandler = (formSubmitEvent: FormEvent<HTMLFormElement>) => {
    formSubmitEvent.preventDefault();
    const isValid = validateNameInput();
    if (!isValid) return setNameInputErrorLabel('Name is required');

    dispatch(setUserName(name));
  };

  return (
    <>
      <div data-testid="hidden-element" className="relative text-white z-50 opacity-0">
        {isUserNameEntered ? 'Stored' : 'Not stored'}
      </div>
      <ModalComponent>
        <form
          data-testid="form-element"
          className="w-full h-full flex flex-col"
          onSubmit={confirmUserNameHandler}
        >
          <p>Enter your name below:</p>
          <InputComponent
            errorLabel={nameInputErrorLabel}
            placeholder="Name"
            onInputChange={newValue => setName(newValue)}
          />
          <ButtonComponent label="Confirm" buttonType="submit" />
        </form>
      </ModalComponent>
    </>
  );
};

export default NameInputComponent;
