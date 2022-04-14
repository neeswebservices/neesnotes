import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Notes from './components/Notes';
import './App.css';
function App() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [isLogin, setLogin] = useState(true);

	useEffect(() => {
		const checkLogin = async () => {
			const token = localStorage.getItem('token');
			if (token) {
				const verified = await axios.get(
					'http://localhost:8080/api/user/auth/verify',
					{
						headers: {
							Authorization: token,
						},
					}
				);
				if (verified.data === false) return localStorage.clear();
				setLogin(verified.data);
			} else {
				setLogin(false);
			}
			// return setLogin(false);
		};
		checkLogin();
	}, [isLogin]);

	return (
		<>
			<div>
				{isLogin ? (
					<Notes setLogin={setLogin} />
				) : (
					<Login setLogin={setLogin} />
				)}
			</div>
			<footer>Notes all copyright 2022 reserved !</footer>
		</>
	);
}

export default App;
