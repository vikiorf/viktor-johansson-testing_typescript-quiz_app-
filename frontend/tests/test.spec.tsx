import { render, screen } from '@testing-library/react';

import HomeView from '../src/pages/HomeView';

describe('Tests array helper', function () {
  it('verifies HomeView is rendered', function () {
    render(<HomeView />);
    screen.debug();
    expect(screen.getByTestId('welcome-heading')).toBeTruthy;
  });
});
