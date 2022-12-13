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
    render(<InputComponent onChange={handleFunction} />);

    const inputElement = screen.getByTestId('input-element');
    const inputElementType = inputElement.getAttribute('type');

    expect(inputElement).toBeTruthy;
    expect(inputElementType).toEqual('text');
  });

  it('verifies input component renders as type number.', function () {
    render(<InputComponent onChange={handleFunction} type="number" />);

    const inputElement = screen.getByTestId('input-element');
    const inputElementType = inputElement.getAttribute('type');

    expect(inputElement).toBeTruthy;
    expect(inputElementType).toEqual('number');
  });

  it('verifies modal component content renders with element inside.', function () {
    render(<InputComponent onChange={handleFunction} />);

    const inputElement = screen.getByTestId('input-element') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'Change' } });

    expect(inputElement).toBeTruthy;
    expect(inputElement.value).toEqual('Change');
    expect(valueFromInputComponent).toEqual('Change');
  });
});
