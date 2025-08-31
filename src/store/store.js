import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './slices/portfolioslice';
import uiReducer from './slices/uislice';
import walletReducer from './slices/walletslice';

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    ui: uiReducer,
    wallet: walletReducer,
  },
});