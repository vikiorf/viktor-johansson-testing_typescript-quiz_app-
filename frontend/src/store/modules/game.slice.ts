import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export enum PlayableDifficultyEnum {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum UserDifficultyEnum {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  RANDOM = 'random',
}

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

export interface IRound {
  roundNumber: number;
  score: number;
  answeredCorrectly: boolean;
}

const { reducer: gameReducer, actions } = createSlice({
  name: 'game',
  initialState: {
    difficulty: '' as UserDifficultyEnum,
    language: '',
    roundNumber: 0,
    question: '',
    isPlaying: false,
    rounds: [] as IRound[],
  },
  reducers: {
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setRoundInState(state, action: PayloadAction<number>) {
      state.roundNumber = action.payload;
    },
    addRoundInState(state, action: PayloadAction<IRound>) {
      state.rounds.push(action.payload);
    },
    clearRoundsInState(state) {
      state.rounds = [];
    },
    setDifficulty(state, action: PayloadAction<UserDifficultyEnum>) {
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
  state.game.rounds[state.game.roundNumber - 1];
export const getStoredRounds = (state: RootState) => state.game.rounds;

export const { setDifficulty } = actions;
export const { setLanguage } = actions;
export const { setIsPlaying } = actions;
export const { addRoundInState } = actions;
export const { setRoundInState } = actions;
export const { clearRoundsInState } = actions;

export default gameReducer;
