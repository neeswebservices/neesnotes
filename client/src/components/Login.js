import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ setLogin }) {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [display, setDisplay] = useState(true);
	const [err, setError] = useState('');

	const onChangeEvent = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
		setError('');
	};
	const registerSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:8080/api/user/auth/', {
				username: user.username,
				email: user.email,
				password: user.password,
			});

			setUser({ username: '', email: '', password: '' });
			setError(res.data.msg);
		} catch (e) {
			e.reponse.data.msg && setError(e.response.data.msg);
		}
	};
	const loginSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				'http://localhost:8080/api/user/auth/login',
				user
			);
			if (res.data.token) {
				localStorage.setItem('token', res.data.token);
				return setLogin(true);
			}
			setUser({ username: '', email: '', password: '' });
			setError(res.data.msg);
		} catch (e) {
			e.reponse.data.msg && setError(e.response.data.msg);
		}
	};

	const displayHandler = () => {
		setDisplay(!display);
		setError('');
	};

	return (
		<section id='auth'>
			{display ? (
				<div className='login'>
					<h2>Login User</h2>

					<form onSubmit={loginSubmit}>
						{err && <p className='error'>{err}</p>}
						<input
							type='email'
							name='email'
							id='login-email'
							placeholder='Email'
							onChange={onChangeEvent}
							value={user.email}
						/>
						<input
							type='password'
							name='password'
							id='login-password'
							placeholder='Password'
							onChange={onChangeEvent}
							value={user.password}
						/>
						{}

						<input
							type='submit'
							name='submit'
							id='login-submit'
							value='Submit'
						/>
						<span className='btndis' onClick={displayHandler}>
							Not a user ?
						</span>
					</form>
				</div>
			) : (
				<div className='register'>
					<h2>Register User</h2>

					<form onSubmit={registerSubmit}>
						{err && <p className='error'>{err}</p>}
						<input
							type='username'
							name='username'
							id='register-username'
							placeholder='Username'
							onChange={onChangeEvent}
							value={user.username}
						/>
						<input
							type='email'
							name='email'
							id='register-email'
							placeholder='Email'
							onChange={onChangeEvent}
							value={user.email}
						/>
						<input
							type='password'
							name='password'
							id='register-password'
							placeholder='Password'
							onChange={onChangeEvent}
							value={user.password}
						/>
						<button className='btn' type='submit'>
							Sign Up
						</button>
						<span className='btndis' onClick={displayHandler}>
							Already a user ?
						</span>
					</form>
				</div>
			)}
		</section>
	);
}
