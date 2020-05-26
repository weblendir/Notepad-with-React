import React, { useState, useEffect } from "react";
import "./App.css";
import { FaEdit, FaSave } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

function App() {
	const [noteItem, setnoteItem] = useState({ title: "", content: "", lastupdated: new Date() });
	const [notes, setNotes] = useState([]);
	const [showForm, setshowForm] = useState(false);
	const [editForm, seteditForm] = useState(false);
	const [editItem, seteditItem] = useState(0);

	function onChangeInput(e) {
		setnoteItem({ ...noteItem, [e.target.name]: e.target.value });
	}
	function SaveForm() {
		const newNote = { ...noteItem, lastupdated: new Date() };
		const newNotes = [...notes, newNote];

		localStorage.setItem("notes", JSON.stringify(newNotes));
		setNotes(newNotes);

		setnoteItem({ title: "", content: "", lastupdated: new Date() });
		setshowForm(false);
	}
	useEffect(() => {
		const notesLocal = JSON.parse(localStorage.getItem("notes"));
		if (!Array.isArray(notesLocal)) {
			setNotes([]);
		} else {
			setNotes(notesLocal);
		}
		console.log(notesLocal);
		console.log(notes);
	}, []);
	function EditForm(ind) {
		setnoteItem({ title: notes[ind].title, content: notes[ind].content });
		seteditForm(true);
		seteditItem(ind);
		console.log(noteItem);
	}
	function CancelForm(ind) {
		setnoteItem({ title: "", content: "" });
		seteditForm(false);
		seteditItem(0);
	}
	function SaveEditForm(ind) {
		let tempData = [...notes];
		tempData[ind].title = noteItem.title;
		tempData[ind].content = noteItem.content;
		setnoteItem({ ...noteItem, lastupdated: Date().toLocaleString() });

		localStorage.setItem("notes", JSON.stringify(tempData));
		setNotes(tempData);

		seteditForm(false);
		seteditItem(0);
		console.log(notes[ind].title);
		console.log(noteItem);
	}
	function DeleteEditForm(ind) {
		const tempData = notes.filter((item, j) => ind !== j);

		localStorage.setItem("notes", JSON.stringify(tempData));
		setNotes(tempData);
	}

	return (
		<div className="App">
			<header className="App-header">
				<p>Notepad application for web browser</p>
			</header>
			<div className="addButton">
				{showForm === true ? (
					<>
						<button className="saveFormButton" onClick={() => SaveForm()}>
							Save note
						</button>
						<button className="saveFormButton" onClick={() => setshowForm(false)}>
							Cancel
						</button>
					</>
				) : (
					<button className="addnewButton" onClick={() => setshowForm(true)}>
						Add new note
					</button>
				)}
			</div>
			{/* start of add part */}
			{showForm === true ? (
				<form className="noteAddContainer">
					<div>
						<label>Title of the note:</label>
						<input
							name="title"
							type="text"
							value={noteItem.title}
							placeholder="Title"
							onChange={onChangeInput}
						/>
					</div>
					<div>
						<label>Take your notes here:</label>
						<textarea
							name="content"
							value={noteItem.content}
							placeholder="Your notes ..."
							onChange={onChangeInput}
						/>
					</div>
				</form>
			) : null}
			{/* end of add part */}
			{notes.map((note, ind) => (
				<div className="noteContainer" key={ind}>
					<div className="timeTag">{note.lastupdated.toLocaleString()}</div>
					<form>
						<div className="formitems">
							<label>Title of the note</label>
							<input
								name="title"
								type="text"
								value={editForm && editItem === ind ? noteItem.title : note.title}
								placeholder="Title"
								onChange={onChangeInput}
								disabled={editForm && editItem === ind ? false : true}
							/>
							{/* disabled={!editForm ? true : editForm && editItem === ind ? false : true} */}
						</div>
						<div className="formitems">
							<label>Take your notes here</label>
							<textarea
								name="content"
								rows="3"
								cols="50"
								value={editForm && editItem === ind ? noteItem.content : note.content}
								placeholder="Your notes ..."
								onChange={onChangeInput}
								disabled={editForm && editItem === ind ? false : true}
							/>
						</div>
					</form>
					<div className="formicons">
						<TiCancel onClick={() => CancelForm(ind)} />
						<FaEdit onClick={() => EditForm(ind)} /> <FaSave onClick={() => SaveEditForm(ind)} />{" "}
						<MdDeleteForever onClick={() => DeleteEditForm(ind)} />
					</div>
				</div>
			))}
		</div>
	);
}

export default App;
