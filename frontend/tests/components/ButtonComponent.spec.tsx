import { fireEvent, render, screen } from '@testing-library/react';

import ButtonComponent, {
  ButtonStyleEnum,
} from '@/components/common/ButtonComponent';

describe('Tests Button Component', function () {
  let isButtonPressEmitted: boolean;
  const handleFunction = () => {
    isButtonPressEmitted = true;
  };
  beforeEach(() => {
    isButtonPressEmitted = false;
  });

  it('verifies button component renders as type button by default with primary class.', function () {
    render(<ButtonComponent label="Button" onClick={handleFunction} />);

    const buttonElement = screen.getByTestId('button-element');
    const inputElementType = buttonElement.getAttribute('type');

    expect(buttonElement.getAttribute('class')).toContain('primary-button-bg');

    expect(buttonElement).toBeTruthy;
    expect(inputElementType).toEqual('button');
  });

  it('verifies button component renders as type button by default with secondary class.', function () {
    render(
      <ButtonComponent
        label="Button"
        onClick={handleFunction}
        buttonStyle={ButtonStyleEnum.SECONDARY}
      />,
    );

    const buttonElement = screen.getByTestId('button-element') as HTMLInputElement;
    const inputElementType = buttonElement.getAttribute('type');

    expect(buttonElement.getAttribute('class')).toContain('secondary-button-bg');

    expect(buttonElement).toBeTruthy;
    expect(inputElementType).toEqual('button');
  });

  it('verfifies button label is rendered', function () {
    render(
      <ButtonComponent
        label="Button"
        onClick={handleFunction}
        buttonStyle={ButtonStyleEnum.SECONDARY}
      />,
    );

    const buttonElement = screen.getByTestId('button-element') as HTMLInputElement;
    expect(buttonElement.value).toEqual('Button');
  });

  it('verifies button component renders as type submit if prompted.', function () {
    render(
      <ButtonComponent label="Button" onClick={handleFunction} buttonType="submit" />,
    );

    const buttonElement = screen.getByTestId('button-element');
    const inputElementType = buttonElement.getAttribute('type');

    expect(buttonElement).toBeTruthy;
    expect(inputElementType).toEqual('submit');
  });

  it('verifies button component emits onClick value', function () {
    render(
      <ButtonComponent label="Button" onClick={handleFunction} buttonType="submit" />,
    );

    const buttonElement = screen.getByTestId('button-element');
    fireEvent.click(buttonElement);

    expect(buttonElement).toBeTruthy;
    expect(isButtonPressEmitted).toBe(true);
  });
});
