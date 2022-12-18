import { act, fireEvent, screen } from '@testing-library/react';

import { renderWithProviders, setTimeOut } from '../utils/test-utils';
import LanguageSettingView from '@/pages/LanguageSettingView';

describe('Tests LanguageSettingView', function () {
  it('verifies heading in LanguageSettingView is correct', function () {
    renderWithProviders(<LanguageSettingView />);

    const welcomeHeading = screen.getByTestId('language-heading');

    expect(welcomeHeading).toBeTruthy;
    expect(welcomeHeading.textContent).toContain('Choose language');
  });

  it('verifies there are 2 links in LanguageSettingView', function () {
    renderWithProviders(<LanguageSettingView />);

    const listElement = screen.getByTestId('list-element');
    const allLinkElements = listElement.children;

    expect(allLinkElements).toBeTruthy;
    expect(allLinkElements.length).toEqual(2);
  });

  it('verifies english language exists and contains the correct text', function () {
    renderWithProviders(<LanguageSettingView />);

    const englishListItemElement = screen.getByTestId('en');

    expect(englishListItemElement).toBeTruthy;
    expect(englishListItemElement.textContent).toEqual('🇬🇧 English');
  });

  it('verifies swedish language exists and contains the correct text', function () {
    renderWithProviders(<LanguageSettingView />);

    const swedishListItemElement = screen.getByTestId('se');

    expect(swedishListItemElement).toBeTruthy;
    expect(swedishListItemElement.textContent).toEqual('🇸🇪 Swedish');
  });

  it('verifies swedish language directs to the correct location when clicked', async function () {
    renderWithProviders(<LanguageSettingView />);

    const swedishListItemElement = screen.getByTestId('se');

    expect(swedishListItemElement).toBeTruthy;

    await act(async () => {
      fireEvent.click(swedishListItemElement);
      await setTimeOut(501);
    });

    expect(swedishListItemElement.textContent).toContain('✅');
  });

  it('verifies checkmark is displayed when english language is clicked', async function () {
    renderWithProviders(<LanguageSettingView />);

    const englishListItemElement = screen.getByTestId('en');

    expect(englishListItemElement).toBeTruthy;

    await act(async () => {
      fireEvent.click(englishListItemElement);
      await setTimeOut(501);
    });

    expect(englishListItemElement.textContent).toContain('✅');
  });
});
