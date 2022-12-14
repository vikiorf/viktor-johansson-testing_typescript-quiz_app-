import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../utils/test-utils';

import CookiePromptComponent from '@/components/Specific/CookiePromptComponent';

describe('Tests Cookie Prompt Component', function () {
  it('verifies cookie prompt is rendered', function () {
    renderWithProviders(<CookiePromptComponent />);

    const modalContentElement = screen.getByTestId('modal-content-element');
    const paragraphElement = screen.getByTestId('cookie-prompt-paragraph');
    const acceptButtonElement = modalContentElement.querySelector(
      'input',
    ) as HTMLInputElement;

    expect(modalContentElement).toBeTruthy;
    expect(paragraphElement).toBeTruthy;
    expect(modalContentElement.childElementCount).toEqual(2);
    expect(acceptButtonElement.value).toEqual('Accept');
    expect(paragraphElement.textContent).toContain('privacy');
  });

  it('verifies state is set when accepting cookies.', function () {
    renderWithProviders(<CookiePromptComponent />, {
      preloadedState: { user: { name: '', isCookiesConsentApproved: false } },
    });

    const modalContentElement = screen.getByTestId('modal-content-element');

    const acceptButtonElement = modalContentElement.querySelector(
      'input',
    ) as HTMLInputElement;

    fireEvent.click(acceptButtonElement);

    const hiddenElement = screen.getByTestId('hidden-element');
    expect(hiddenElement.textContent).toEqual('Hidden');
  });
});
