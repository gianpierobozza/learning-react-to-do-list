import React, { useState } from 'react'

const Header = ({value, setValue}) => {
	const [editingValue, setEditingValue] = useState(value);

	const onChange = (event) => setEditingValue(event.target.value);

	const onKeyDown = (event) => {
		if (event.key === "Enter" || event.key === "Escape") {
		  event.target.blur();
		}
	}

	const onBlur = (event) => {
		if (event.target.value.trim() === "") {
			setEditingValue(value);
		} else {
			setValue(event.target.value)
			sessionStorage.setItem('toDoListTitle', event.target.value);
		}
	}

	return (
		<div className="tooltip">
			<input
				className="list-title"
				type="text"
				aria-label="Field name"
				value={editingValue}
				onChange={onChange}
				onKeyDown={onKeyDown}
				onBlur={onBlur}
			/>
			<span className="tooltiptext">Click to Edit!</span>
		</div>
	);
};

export default Header;
