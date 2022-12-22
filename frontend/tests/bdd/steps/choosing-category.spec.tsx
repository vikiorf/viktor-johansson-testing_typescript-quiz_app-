import { defineFeature, loadFeature } from 'jest-cucumber';
import { act, fireEvent, screen } from '@testing-library/react';

import { renderWithProviders, setTimeOut } from 'tests/utils/test-utils';

const feature = loadFeature('./tests/bdd/features/ChooseCategory.feature');

import GameView from '@/pages/GameView';

defineFeature(feature, test => {
  test('Choosing a category', ({ given, when, then }) => {
    given('I have loaded in game view', async () => {
      renderWithProviders(<GameView />);

      // Wait for fetched categories
      await act(async () => {
        await setTimeOut(1000);
      });
    });

    when('I choose category', () => {
      const categoriesContainerElement = screen.getByTestId(
        'categories-container-element',
      );

      expect(categoriesContainerElement).toBeTruthy();
      expect(categoriesContainerElement.children.length).toBe(3);
      const categoryElement = categoriesContainerElement.children[0];

      fireEvent.click(categoryElement);
    });

    then('Category should be chosen', () => {
      const questionHeaderElement = screen.getByTestId('question-header-element');
      const categoriesContainerElement = screen.queryByTestId(
        'categories-container-element',
      );

      expect(questionHeaderElement).toBeTruthy();
      expect(categoriesContainerElement).toBeFalsy();
    });
  });
});
