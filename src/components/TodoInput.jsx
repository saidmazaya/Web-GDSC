import React, { useState } from "react";

function TodoInput({ addTodo }) {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			addTodo(inputValue);
			setInputValue("");
		}
	};

	return (
		<div className="mb-4">
			<input className="border rounded py-2 px-3 mr-2" type="text" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Enter your task" />
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={() => {
					addTodo(inputValue);
					setInputValue("");
				}}
			>
				Add
			</button>
		</div>
	);
}

export default TodoInput;
