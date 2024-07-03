import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import Favorites from './components/Favorites';

function App() {
	return (
		<Router>
			<div className='App'>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/movie/:id' element={<MovieDetail />} />
					<Route path='/favorites' element={<Favorites />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
