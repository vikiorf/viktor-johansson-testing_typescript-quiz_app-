import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export enum DifficultyEnum {
  EASY = '🐣 Easy',
  MEDIUM = '🥩 Medium',
  HARD = '👷‍♀️ Hard',
  RANDOM = '🎲 Random',
}

enum Language {
  EN = 'en',
  SE = 'se',
}

const { reducer: userReducer, actions } = createSlice({
  name: 'gameSettings',
  initialState: { difficulty: '', language: '' },
  reducers: {
    setDifficulty(state, action: PayloadAction<DifficultyEnum>) {
      state.difficulty = action.payload;
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
  },
});

export const getStoredDifficulty = (state: RootState) => state.gameSettings.difficulty;
export const getStoredLanguage = (state: RootState) => state.gameSettings.language;

export const { setDifficulty } = actions;
export const { setLanguage } = actions;
export default userReducer;
