import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateNote() {
	let navigate = useNavigate();
	const [msg, setMsg] = React.useState('');

	const [note, setNote] = React.useState({
		title: '',
		content: '',
	});

	const createNote = async () => {
		const res = await axios.post('http://localhost:8080/api/notes', note, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		});
		if (res.data.msg === 'Created note sucessfully !') {
			setNote({
				title: '',
				content: '',
			});
			navigate('/mynotes');
		}
		setMsg(res.data.msg);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		createNote();
	};

	const onChangeHandler = (e) => {
		setNote({
			...note,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='create-note-container'>
			<h1>Create Note</h1>
			<form onSubmit={submitHandler}>
				<div className='form-group'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						name='title'
						placeholder='Title'
						onChange={onChangeHandler}
						value={note.title}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='content'>content</label>
					<textarea
						name='content'
						id='content'
						value={note.content}
						onChange={onChangeHandler}
						cols='50'
						rows='10'
						placeholder='content'></textarea>
				</div>
				{msg ? <p id='error'>{msg}</p> : null}

				<div className='form-group'>
					<button type='submit'> Create Note</button>
				</div>
			</form>
		</div>
	);
}
