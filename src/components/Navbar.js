import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav className='fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4'>
			<ul className='flex justify-evenly'>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/favorites'>Favorites</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
