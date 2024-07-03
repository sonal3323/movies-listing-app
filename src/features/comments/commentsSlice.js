import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	comments: JSON.parse(localStorage.getItem('comments')) || {},
};

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		addComment(state, action) {
			const { movieId, comment } = action.payload;
			if (!state.comments[movieId]) {
				state.comments[movieId] = [];
			}
			state.comments[movieId].push(comment);
			localStorage.setItem('comments', JSON.stringify(state.comments));
		},
	},
});

export const { addComment } = commentsSlice.actions;

export default commentsSlice.reducer;
