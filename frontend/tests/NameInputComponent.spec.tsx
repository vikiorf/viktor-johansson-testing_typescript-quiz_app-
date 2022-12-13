import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from './utils/test-utils';

import NameInputComponent from '@/components/Specific/NameInputComponent';

describe('Tests Name Input Component', function () {
  it('verifies name input is rendered', function () {
    renderWithProviders(<NameInputComponent />);

    const modalContentElement = screen.getByTestId('modal-content-element');
    const formElement = screen.getByTestId('form-element');

    const acceptButtonElement = formElement.querySelector(
      'input[type="submit"]',
    ) as HTMLInputElement;

    expect(modalContentElement).toBeTruthy;
    expect(modalContentElement.childElementCount).toEqual(1);
    expect(formElement.childElementCount).toEqual(3);
    expect(acceptButtonElement.value).toEqual('Confirm');
  });

  it('verifies state is set when submitting name.', function () {
    renderWithProviders(<NameInputComponent />, {
      preloadedState: { user: { name: '', isCookiesConsentApproved: false } },
    });

    const formElement = screen.getByTestId('form-element');
    const inputElement = formElement.querySelector('input') as HTMLInputElement;
    const acceptButtonElement = formElement.querySelector(
      'input[type="submit"]',
    ) as HTMLInputElement;

    fireEvent.input(inputElement, { target: { value: 'Test' } });
    fireEvent.click(acceptButtonElement);

    const hiddenElement = screen.getByTestId('hidden-element');
    expect(hiddenElement.textContent).toEqual('Stored');
  });
});
