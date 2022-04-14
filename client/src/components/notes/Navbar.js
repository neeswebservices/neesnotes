import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ setLogin }) {
	const onLogoutSubmit = () => {
		localStorage.clear();
		setLogin(false);
	};

	return (
		<header>
			<div className='logo'>Notes</div>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/create'>CreateNote</Link>
				</li>
				<li>
					<Link to='/mynotes'>My Notes</Link>
				</li>
				<li onClick={onLogoutSubmit}>
					<Link to='/'>Logout</Link>
				</li>
			</ul>
		</header>
	);
}
