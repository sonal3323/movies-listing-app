import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';
import { addComment } from '../features/comments/commentsSlice';

function MovieDetail() {
	const { id } = useParams();
	const movie = useSelector((state) => state.movies.items.find((m) => m.id.toString() === id));
	const isFavorite = useSelector((state) => state.favorites.ids.includes(parseInt(id)));
	const comments = useSelector((state) => state.comments.comments[id] || []);
	const dispatch = useDispatch();

	const handleFavorite = () => {
		if (isFavorite) {
			dispatch(removeFavorite(parseInt(id)));
		} else {
			dispatch(addFavorite(parseInt(id)));
		}
	};

	const handleCommentSubmit = (event) => {
		event.preventDefault();
		const comment = event.target.elements.comment.value;
		dispatch(addComment({ movieId: id, comment }));
		event.target.reset();
	};

	return (
		<div className='p-4'>
			<Link to='/'>Back to Home</Link>
			<div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
				<div className='md:flex'>
					<div className='md:flex-shrink-0'>
						<img className='h-48 w-full object-cover md:w-48' src={movie.image} alt={movie.title} />
					</div>
					<div className='p-8'>
						<div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>{movie.category}</div>
						<a href='#' className='block mt-1 text-lg leading-tight font-medium text-black hover:underline'>
							{movie.title}
						</a>
						<p className='mt-2 text-gray-500'>{movie.description}</p>
						<button className={`mt-4 ${isFavorite ? 'text-red-500' : 'text-gray-500'}`} onClick={handleFavorite}>
							{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
						</button>
					</div>
				</div>
			</div>
			<div>
				<form onSubmit={handleCommentSubmit}>
					<input type='text' name='comment' placeholder='Add a comment...' className='border-2 border-gray-300' />
					<button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
						Comment
					</button>
				</form>
				<ul>
					{comments.map((comment, index) => (
						<li key={index}>{comment}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default MovieDetail;
