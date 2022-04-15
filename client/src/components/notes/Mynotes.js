import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Mynotes() {
	const [notes, setNotes] = useState([]);

	const getNote = async () => {
		const allnotes = await axios.get(
			'https://neesnotes.herokuapp.com/api/notes/mynotes',
			{
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			}
		);
		setNotes(allnotes.data);
	};

	useEffect(() => {
		getNote();
	}, []);

	return (
		<div>
			<div className='note-container'>
				{notes.length <= 0 ? (
					<h5>No notes yet Please create one !</h5>
				) : (
					notes.map((note, index) => {
						let date = new Date(note.date);
						return (
							<div key={index} className='note'>
								<h4 className='title-text'>{note.title}</h4>
								<div className='text-wrapper'>{note.content}</div>
								<span className='date'>Date: {date.toDateString()}</span>
								<span id='edit'>
									<Link to={`/edit/${note._id}`}>Edit</Link>
								</span>
								<br />
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}
