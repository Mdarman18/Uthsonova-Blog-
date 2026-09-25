import { configureStore } from '@reduxjs/toolkit';

/**
 * Root Redux store.
 * Add slice reducers to the `reducer` map as the project grows.
 *
 * Example:
 *   import authReducer from './slices/authSlice';
 *   reducer: { auth: authReducer }
 */
const store = configureStore({
  reducer: {
    // slices go here
  },
});

export default store;
