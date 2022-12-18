import { act, fireEvent, screen } from '@testing-library/react';

import DifficultySettingView from '@/pages/DifficultySettingView';
import { renderWithProviders, setTimeOut } from '../utils/test-utils';

describe('Tests DifficultySettingView', function () {
  it('verifies heading in DifficultySettingView is correct', function () {
    renderWithProviders(<DifficultySettingView />);

    const welcomeHeading = screen.getByTestId('difficulty-heading');

    expect(welcomeHeading).toBeTruthy;
    expect(welcomeHeading.textContent).toContain('Choose difficulty');
  });

  it('verifies there are 4 links in DifficultySettingView', function () {
    renderWithProviders(<DifficultySettingView />);

    const listElement = screen.getByTestId('list-element');
    const allLinkElements = listElement.children;

    expect(allLinkElements).toBeTruthy;
    expect(allLinkElements.length).toEqual(4);
  });

  it('verifies easy difficulty exists and contains the correct text', function () {
    renderWithProviders(<DifficultySettingView />);

    const easyLinkElement = screen.getByTestId('EASY');

    expect(easyLinkElement).toBeTruthy;
    expect(easyLinkElement.textContent).toEqual('🐣 Easy');
  });

  it('verifies medium difficulty exists and contains the correct text', function () {
    renderWithProviders(<DifficultySettingView />);

    const mediumLinkElement = screen.getByTestId('MEDIUM');

    expect(mediumLinkElement).toBeTruthy;
    expect(mediumLinkElement.textContent).toEqual('🥩 Medium');
  });

  it('verifies hard difficulty exists and directs to the correct location when clicked', async function () {
    renderWithProviders(<DifficultySettingView />);

    const hardLinkElement = screen.getByTestId('HARD');

    expect(hardLinkElement).toBeTruthy;
    expect(hardLinkElement.textContent).toEqual('👷‍♀️ Hard');

    await act(async () => {
      fireEvent.click(hardLinkElement);
      await setTimeOut(501);
    });

    expect(window.location.pathname).toEqual('/language-setup');
  });

  it('verifies checkmark is displayed when random difficulty is clicked', async function () {
    renderWithProviders(<DifficultySettingView />);

    const randomLinkElement = screen.getByTestId('RANDOM');

    expect(randomLinkElement).toBeTruthy;
    expect(randomLinkElement.textContent).toEqual('🎲 Random');

    await act(async () => {
      fireEvent.click(randomLinkElement);
      expect(randomLinkElement.textContent).toEqual('🎲 Random');
      await setTimeOut(501);
    });

    expect(randomLinkElement.textContent).toContain('✅');

    expect(window.location.pathname).toEqual('/language-setup');
  });
});
