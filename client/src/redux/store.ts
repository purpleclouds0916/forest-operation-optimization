import { configureStore } from '@reduxjs/toolkit';
import calculationResultReducer from './CalculationResultSlice';

export const store = configureStore({
  reducer: calculationResultReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
