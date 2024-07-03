// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMovies } from '../features/movies/moviesSlice';
// import { Link } from 'react-router-dom';

// function Home() {
// 	const dispatch = useDispatch();
// 	const movies = useSelector((state) => state.movies.items);

// 	useEffect(() => {
// 		dispatch(fetchMovies());
// 	}, [dispatch]);

// 	return (
// 		<div className='grid grid-cols-3 gap-4 p-4'>
// 			{movies.map((movie) => (
// 				<Link key={movie.id} to={`/movie/${movie.id}`}>
// 					<div className='max-w-sm rounded overflow-hidden shadow-lg'>
// 						<img className='w-full' src={movie.image} alt={movie.title} />
// 						<div className='px-6 py-4'>
// 							<div className='font-bold text-xl mb-2'>{movie.title}</div>
// 						</div>
// 					</div>
// 				</Link>
// 			))}
// 		</div>
// 	);
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../features/movies/moviesSlice';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';
import { addComment } from '../features/comments/commentsSlice';
import { Link } from 'react-router-dom';

function Home() {
	const dispatch = useDispatch();
	const movies = useSelector((state) => state.movies.items);
	const favorites = useSelector((state) => state.favorites.ids);
	const [comment, setComment] = useState({});

	useEffect(() => {
		dispatch(fetchMovies());
	}, [dispatch]);

	const handleFavorite = (movieId) => {
		if (favorites.includes(movieId)) {
			dispatch(removeFavorite(movieId));
		} else {
			dispatch(addFavorite(movieId));
		}
	};

	const handleCommentChange = (e, movieId) => {
		setComment({ ...comment, [movieId]: e.target.value });
	};

	const submitComment = (movieId) => {
		if (comment[movieId]) {
			dispatch(addComment({ movieId, comment: comment[movieId] }));
			setComment({ ...comment, [movieId]: '' }); // Reset comment field after submission
		}
	};

	return (
		<div className='p-4'>
			<div className='grid grid-cols-3 gap-4'>
				{movies.map((movie) => (
					<div key={movie.id} className='max-w-sm rounded overflow-hidden shadow-lg'>
						<Link to={`/movie/${movie.id}`}>
							<img
								className='w-300 h-300 object-cover'
								src={movie.image}
								alt={movie.title}
								style={{ width: '300px', height: '300px' }}
							/>
						</Link>
						<div className='px-6 py-4'>
							<div className='font-bold text-xl mb-2'>{movie.title}</div>
							<p className='text-gray-700 text-base overflow-ellipsis overflow-hidden'>{movie.description}</p>
						</div>
						<button
							onClick={() => handleFavorite(movie.id)}
							className={`text-sm ${favorites.includes(movie.id) ? 'bg-red-500' : 'bg-green-500'
								} hover:bg-red-700 text-white font-bold py-2 px-4 rounded block my-0 mx-auto`}
						>
							{favorites.includes(movie.id) ? 'Unfavorite' : 'Favorite'}
						</button>
						<div className='px-6 pt-4 pb-2 flex justify-between items-center'>
							<div className='flex items-center'>
								<input
									type='text'
									value={comment[movie.id] || ''}
									onChange={(e) => handleCommentChange(e, movie.id)}
									placeholder='Add a comment...'
									className='border-2 border-gray-300 rounded py-2 px-4 mr-2'
								/>
								<button
									onClick={() => submitComment(movie.id)}
									className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
								>
									Comment
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;
