import { screen } from '@testing-library/react';

import { renderWithProviders } from '../utils/test-utils';

import GameView from '@/pages/GameView';

describe('Tests GameView', function () {
  it('verifies categories container is displayed when GameView is rendered', function () {
    renderWithProviders(<GameView />);
    const questionHeaderElement = screen.getByTestId('categories-container-element');

    expect(questionHeaderElement).toBeTruthy;
  });
});
