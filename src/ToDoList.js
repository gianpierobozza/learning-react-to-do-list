import React from 'react';
import ToDo from './ToDo.js';

const ToDoList = ({ toDoList, handleToggle, handleFilter }) => {
    return (
        <div className="todo-list">
            <div className="todo-list-container">
                {toDoList.map(todo => {
                    return (
                        <ToDo key={todo.id} todo={todo} handleToggle={handleToggle} handleFilter={handleFilter} />
                    )
                })}
            </div>
            <div>
                <button className="clear button" style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;
