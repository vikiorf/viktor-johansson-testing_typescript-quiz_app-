import { fireEvent, render, screen } from '@testing-library/react';

import InputComponent from '../src/components/common/InputComponent';

describe('Tests Modal Component', function () {
  let valueFromInputComponent: string | null;
  const handleFunction = (emittedValue: string) => {
    valueFromInputComponent = emittedValue;
  };
  beforeEach(() => {
    valueFromInputComponent = null;
  });

  it('verifies input component renders as type text by default.', function () {
    render(<InputComponent onInputChange={handleFunction} />);

    const inputElement = screen.getByTestId('input-element');
    const inputElementType = inputElement.getAttribute('type');

    expect(inputElement).toBeTruthy;
    expect(inputElementType).toEqual('text');
  });

  it('verifies input component renders as type number.', function () {
    render(<InputComponent onInputChange={handleFunction} inputType="number" />);

    const inputElement = screen.getByTestId('input-element');
    const inputElementType = inputElement.getAttribute('type');

    expect(inputElement).toBeTruthy;
    expect(inputElementType).toEqual('number');
  });

  it('verifies input component emits inputted value.', function () {
    render(<InputComponent onInputChange={handleFunction} />);

    const inputElement = screen.getByTestId('input-element') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'Change' } });

    expect(inputElement).toBeTruthy;
    expect(inputElement.value).toEqual('Change');
    expect(valueFromInputComponent).toEqual('Change');
  });

  it('verifies input component is rendered with initial value.', function () {
    render(
      <InputComponent onInputChange={handleFunction} initialValue="Initial value" />,
    );

    const inputElement = screen.getByTestId('input-element') as HTMLInputElement;

    expect(inputElement).toBeTruthy;
    expect(inputElement.value).toEqual('Initial value');
  });
});
