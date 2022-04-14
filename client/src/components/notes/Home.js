import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

export default function Home() {
	const [notes, setNotes] = useState([]);

	const getNote = async () => {
		const allnotes = await axios.get('http://localhost:8080/api/notes', {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		});
		setNotes(allnotes.data);
	};

	useEffect(() => {
		getNote();
	}, []);

	return (
		<>
			<div className='note-container'>
				{notes.map((note, index) => {
					let date = new Date(note.date);
					return (
						<div key={index} className='note'>
							<h4 className='title-text'>{note.title}</h4>
							<div className='text-wrapper'>{note.content}</div>
							<div className='comps'>
								<span className='date'>{date.toDateString()}</span>
								<span className='user'> | Author : {note.name}</span>
							</div>
							<br />
						</div>
					);
				})}
			</div>
		</>
	);
}
