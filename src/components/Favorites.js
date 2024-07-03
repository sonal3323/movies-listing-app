import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../features/favorites/favoritesSlice';
import { Link } from 'react-router-dom';

function Favorites() {
	const favorites = useSelector((state) =>
		state.favorites.ids.map((id) => state.movies.items.find((movie) => movie.id === id)),
	);
	const dispatch = useDispatch();

	return (
		<div className='p-4'>
			<h1 className='font-bold text-2xl mb-4'>Favorites</h1>
			{favorites.map((movie) => (
				<div key={movie.id} className='flex justify-between items-center border-b border-gray-200 py-2'>
					<Link to={`/movie/${movie.id}`} className='text-blue-500 hover:text-blue-800'>
						{movie.title}
					</Link>
					<button
						onClick={() => dispatch(removeFavorite(movie.id))}
						className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
					>
						Remove
					</button>
				</div>
			))}
		</div>
	);
}

export default Favorites;
