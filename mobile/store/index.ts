import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';

/**
 * Configure the Redux store with Redux Toolkit
 * Combines reducers and sets up middleware automatically
 */
const store = configureStore({
    reducer: {
        todos: todosReducer // Add todos reducer to the store
    }
});

// Type definition for the root state
export type RootState = ReturnType<typeof store.getState>;

// Type definition for the dispatch function
export type AppDispatch = typeof store.dispatch;

// Export the configured store as the default export
export default store;