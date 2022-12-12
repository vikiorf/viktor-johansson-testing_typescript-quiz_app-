import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomeView from '../src/pages/HomeView';

describe('Tests HomeView', function () {
  it('verifies welcome text in HomeView is rendered', function () {
    render(
      <MemoryRouter>
        <HomeView />
      </MemoryRouter>,
    );

    const welcomeHeading = screen.getByTestId('welcome-heading');

    expect(welcomeHeading).toBeTruthy;
    expect(welcomeHeading.textContent).toContain('Welcome');
  });
});
