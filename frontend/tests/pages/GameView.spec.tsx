import { screen } from '@testing-library/react';

import { renderWithProviders } from '../utils/test-utils';

import GameView from '@/pages/GameView';

describe('Tests GameView', function () {
  it('verifies header is displayed when GameView is rendered', function () {
    renderWithProviders(<GameView />);
    const questionHeaderElement = screen.getByTestId('question-header-element');

    expect(questionHeaderElement).toBeTruthy;
    expect(questionHeaderElement.textContent).toContain('of 12');
  });

  it('verifies question is displayed when GameView is rendered', function () {
    renderWithProviders(<GameView />);
    const questionElement = screen.getByTestId('question-element');

    expect(questionElement).toBeTruthy;
    expect(questionElement.textContent).toBeTruthy;
  });

  it('verifies progress is displayed when GameView is rendered', function () {
    renderWithProviders(<GameView />);
    const progressElement = screen.getByTestId('progress-element');
    const progressBarElement = screen.getByTestId('progress-bar-element');

    expect(progressElement).toBeTruthy;
    expect(progressBarElement).toBeTruthy;
    expect(progressBarElement.style.width).toEqual('80%');
    expect(progressElement.textContent).toBeTruthy;
  });
});
