import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
	reducer: {
		movies: moviesReducer,
		favorites: favoritesReducer,
		comments: commentsReducer,
	},
});
