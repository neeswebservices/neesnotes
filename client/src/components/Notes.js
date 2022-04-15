import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateNote from './notes/CreateNote';
import EditNote from './notes/EditNote';
import Home from './notes/Home';
import Mynotes from './notes/Mynotes';
import Navbar from './notes/Navbar';
import Notfound from './Notfound';

export default function Notes({ setLogin }) {
	return (
		<div className='notes'>
			<Router>
				<Navbar setLogin={setLogin} />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/create' element={<CreateNote />} />
					<Route path='/mynotes' element={<Mynotes />} />
					<Route path='/edit/:id' element={<EditNote />} />
					<Route path='*' element={<Notfound />} />
				</Routes>
			</Router>
		</div>
	);
}
