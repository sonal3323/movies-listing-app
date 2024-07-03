import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ids: JSON.parse(localStorage.getItem('favorites')) || [],
};

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorite(state, action) {
			state.ids.push(action.payload);
			localStorage.setItem('favorites', JSON.stringify(state.ids));
		},
		removeFavorite(state, action) {
			state.ids = state.ids.filter((id) => id !== action.payload);
			localStorage.setItem('favorites', JSON.stringify(state.ids));
		},
	},
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
