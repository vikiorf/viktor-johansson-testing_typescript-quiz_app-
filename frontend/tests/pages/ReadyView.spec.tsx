import { act, fireEvent, screen } from '@testing-library/react';

import DifficultySettingView from '@/pages/DifficultySettingView';
import { renderWithProviders, setTimeOut } from '../utils/test-utils';
import ReadyView from '@/pages/ReadyView';
import { useLocation } from 'react-router';

describe('Tests ReadyView', function () {
  it('verifies heading in ReadyView is correct', function () {
    renderWithProviders(<ReadyView />);

    const readyHeading = screen.getByTestId('ready-heading');

    expect(readyHeading).toBeTruthy;
    expect(readyHeading.textContent).toContain('Ready?');
  });

  it('verifies that Play-button redirects to correct page', async function () {
    renderWithProviders(<ReadyView />);

    const playButtonElement = screen.getByTestId('play-button') as HTMLInputElement;

    expect(playButtonElement.value).toEqual('Play');
  });

  it('verifies there is a link with correct text', async function () {
    renderWithProviders(<ReadyView />);

    const regretLinkElement = screen.getByTestId('regret-link');

    expect(regretLinkElement).toBeTruthy;
    expect(regretLinkElement.textContent).toEqual('I regret my choices');
  });
});
