import React, { useState } from "react";

//components
import Header from "./Header";
import ToDoList from './ToDoList.js';
import ToDoForm from './ToDoForm.js';

const defaultListTitle = 'React.JS ToDoList';

function App() {
	
	var toDoListData = () => {
		const dataInStorage = JSON.parse(sessionStorage.getItem('toDoListData'));
		return dataInStorage != null ? dataInStorage : [];
	}

	const [toDoList, setToDoList] = useState(toDoListData);

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

	var toDoListTitle = () => {
		const titleInStorage = sessionStorage.getItem('toDoListTitle');
		return titleInStorage != null ? titleInStorage : defaultListTitle;
	}

	const [title, setTitle] = useState(toDoListTitle);

	const resetList = () => {
		setToDoList([]);
		sessionStorage.setItem('toDoListData', JSON.stringify([]));
		setTitle(defaultListTitle);
		sessionStorage.setItem('toDoListTitle', defaultListTitle);
	};

	return (
		<div className="todo-app">
			<Header title={title} setTitle={setTitle} />
			<ToDoForm addTask={addTask} />
			<ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter} resetList={resetList} />
		</div>
	);

	function generateUUID() {
		var d = new Date().getTime();
		var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16;
			if (d > 0) {
				r = (d + r) % 16 | 0;
				d = Math.floor(d / 16);
			} else {
				r = (d2 + r) % 16 | 0;
				d2 = Math.floor(d2 / 16);
			}
			return (c === 'x' ? r : ((r & 0x3) | (0x8))).toString(16);
		});
	}
}

export default App;
