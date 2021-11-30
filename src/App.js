import React, { useState } from 'react';
import { generateUUID } from './Helpers.js'
import { defaultListTitle } from './Globals.js'

//components
import Header from './Header';
import ToDoList from './ToDoList.js';
import ToDoForm from './ToDoForm.js';
import ToDoShare from './ToDoShare.js';

function App() {
	
	var toDoListData = () => {
		const dataInStorage = JSON.parse(sessionStorage.getItem('toDoListData'));
		return dataInStorage != null ? dataInStorage : [];
	}
	const [toDoList, setToDoList] = useState(toDoListData);

	var toDoListTitle = () => {
		const titleInStorage = sessionStorage.getItem('toDoListTitle');
		return titleInStorage != null ? titleInStorage : defaultListTitle;
	}
	const [title, setTitle] = useState(toDoListTitle);

	const handleToggle = (id) => {
		let mapped = toDoList.map(task => {
			return task.id === id ? { ...task, complete: !task.complete } : { ...task };
		});
		setToDoList(mapped)

		sessionStorage.setItem('toDoListData', JSON.stringify(mapped));
	};

	const handleFilter = () => {
		let filtered = toDoList.filter(task => {
			return !task.complete;
		});
		setToDoList(filtered);

		sessionStorage.setItem('toDoListData', JSON.stringify(filtered));
	};

	const addTask = (userInput) => {
		if (userInput !== '') {
			let copy = [...toDoList];
			copy = [...copy, { id: generateUUID(), task: userInput, complete: false }];
			setToDoList(copy);

			sessionStorage.setItem('toDoListData', JSON.stringify(copy));
		}
	};

	const resetList = () => {
		setToDoList([]);
		sessionStorage.setItem('toDoListData', JSON.stringify([]));
		setTitle(defaultListTitle);
		sessionStorage.setItem('toDoListTitle', defaultListTitle);
	};

	return (
		<div className='todo-app'>
			<Header title={title} setTitle={setTitle} />
			<ToDoForm addTask={addTask} />
			<ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter} resetList={resetList} />
			<ToDoShare setTitle={setTitle} setToDoList={setToDoList} />
		</div>
	);
}

export default App;
