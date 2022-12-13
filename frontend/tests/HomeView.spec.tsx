import { screen } from '@testing-library/react';

import HomeView from '../src/pages/HomeView';
import { renderWithProviders } from './utils/test-utils';

describe('Tests HomeView', function () {
  it('verifies welcome text in HomeView is rendered', function () {
    renderWithProviders(<HomeView />);

    const welcomeHeading = screen.getByTestId('welcome-heading');

    expect(welcomeHeading).toBeTruthy;
    expect(welcomeHeading.textContent).toContain('Welcome');
  });
});
