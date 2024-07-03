import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
	const response = await fetch('https://fakestoreapi.com/products');
	const data = await response.json();
	return data.map((movie) => ({
		...movie,
		// Assuming API is actually for products, mock movie-specific attributes
		runtime: '120 min', // Mocking a runtime attribute
	}));
});

const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		items: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovies.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchMovies.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchMovies.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default moviesSlice.reducer;
