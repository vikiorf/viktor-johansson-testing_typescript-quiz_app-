import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export enum DifficultyEnum {
  EASY = '🐣 Easy',
  MEDIUM = '🥩 Medium',
  HARD = '👷‍♀️ Hard',
  RANDOM = '🎲 Random',
}

export enum LanguageEnum {
  EN = 'en',
  SE = 'se',
}

const { reducer: gameReducer, actions } = createSlice({
  name: 'game',
  initialState: {
    difficulty: '',
    language: '',
    round: 0,
    question: '',
    isPlaying: false,
    rounds: [],
  },
  reducers: {
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setRound(state, action: PayloadAction<number>) {
      state.round = action.payload;
    },
    setDifficulty(state, action: PayloadAction<DifficultyEnum>) {
      state.difficulty = action.payload;
    },
    setLanguage(state, action: PayloadAction<LanguageEnum>) {
      state.language = action.payload;
    },
  },
});

export const getStoredDifficulty = (state: RootState) => state.game.difficulty;
export const getStoredLanguage = (state: RootState) => state.game.language;

export const getStoredIsPlaying = (state: RootState) => state.game.isPlaying;
export const getCurrentRound = (state: RootState) =>
  state.game.rounds[state.game.round - 1];

export const { setDifficulty } = actions;
export const { setLanguage } = actions;
export const { setIsPlaying } = actions;
export const { setRound } = actions;

export default gameReducer;
