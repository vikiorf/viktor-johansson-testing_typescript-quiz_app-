import { fireEvent, render, screen } from '@testing-library/react';

import ButtonComponent from '../src/components/common/ButtonComponent';

describe('Tests Button Component', function () {
  let isButtonPressEmitted: boolean;
  const handleFunction = () => {
    isButtonPressEmitted = true;
  };
  beforeEach(() => {
    isButtonPressEmitted = false;
  });

  it('verifies button component renders as type button by default.', function () {
    render(<ButtonComponent label="Button" onClick={handleFunction} />);

    const inputElement = screen.getByTestId('button-element');
    const inputElementType = inputElement.getAttribute('type');

    expect(inputElement).toBeTruthy;
    expect(inputElementType).toEqual('button');
  });

  it('verifies button component renders as type submit if prompted.', function () {
    render(
      <ButtonComponent label="Button" onClick={handleFunction} buttonType="submit" />,
    );

    const inputElement = screen.getByTestId('button-element');
    const inputElementType = inputElement.getAttribute('type');

    expect(inputElement).toBeTruthy;
    expect(inputElementType).toEqual('submit');
  });

  it('verifies button component emits onClick value', function () {
    render(
      <ButtonComponent label="Button" onClick={handleFunction} buttonType="submit" />,
    );

    const inputElement = screen.getByTestId('button-element');
    fireEvent.click(inputElement);

    expect(inputElement).toBeTruthy;
    expect(isButtonPressEmitted).toBe(true);
  });
});
