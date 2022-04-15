import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function CreateNote() {
	const { id } = useParams();
	let navigate = useNavigate();
	const [msg, setMsg] = useState('');
	const [note, setNote] = useState({
		title: '',
		content: '',
	});

	useEffect(() => {
		const fetchnote = async () => {
			const res = await axios.get(
				`https://neesnotes.herokuapp.com/api/notes/${id}`,
				{
					headers: {
						Authorization: localStorage.getItem('token'),
					},
				}
			);
			if (res.data <= 0) {
				return navigate('/mynotes');
			}

			setNote({
				title: res.data[0].title,
				content: res.data[0].content,
			});
		};
		fetchnote();
	}, []);

	const updateNote = async () => {
		const res = await axios.put(`http://localhost:8080/api/notes/${id}`, note, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		});
		if (res.data.msg === 'Updated  notes sucessfully !') {
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
		updateNote();
	};

	const onChangeHandler = (e) => {
		setNote({
			...note,
			[e.target.name]: e.target.value,
			date: new Date(),
		});
	};

	const deleteHandler = async () => {
		const res = await axios.delete(`http://localhost:8080/api/notes/${id}`, {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		});
		navigate('/mynotes');
		setMsg(res.data.msg);
	};

	return (
		<div className='create-note-container'>
			<h1>Edit Note</h1>
			<form onSubmit={submitHandler}>
				<div className='form-group'>
					<label htmlFor='title'>Title :</label>
					<input
						type='text'
						name='title'
						placeholder='Title'
						onChange={onChangeHandler}
						value={note.title}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='content'>Content :</label>
					<textarea
						name='content'
						id='content'
						value={note.content}
						onChange={onChangeHandler}
						cols='50'
						rows='10'
						placeholder='content'></textarea>
				</div>

				{msg ? <p>{msg}</p> : null}
				<div className='form-group btn-group'>
					<button type='submit'> Edit Note</button>
					<button id='delete' onClick={deleteHandler}>
						Remove Note
					</button>
				</div>
			</form>
		</div>
	);
}
