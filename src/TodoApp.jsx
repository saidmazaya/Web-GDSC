import React, { useState, useEffect } from "react";

function TodoApp() {
	function getInitialActivities() {
		const temp = localStorage.getItem("todos");
		const savedtoDo = JSON.parse(temp);
		return savedtoDo || [];
	}

	const [inputValue, setInputValue] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [sortBy, setSortBy] = useState("");
	const [todos, setTodos] = useState(getInitialActivities());
	const [editId, setEditId] = useState(null);
	const [editInputValue, setEditInputValue] = useState("");

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem("todos"));
		if (storedTodos) {
			setTodos(storedTodos);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const addTodo = () => {
		if (inputValue.trim() !== "") {
			const newTodo = {
				id: Math.random().toString(36).substr(2, 9),
				text: inputValue,
				completed: false,
				createdAt: new Date().toISOString(),
			};
			setTodos([...todos, newTodo]);
			setInputValue("");
		}
	};

	const deleteTodo = (id) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	};

	const toggleTodo = (id) => {
		const updatedTodos = todos.map((todo) => (todo.id === id && id !== editId ? { ...todo, completed: !todo.completed } : todo));
		setTodos(updatedTodos);
	};

	const handleInputChange = (event) => {
		if (editId === null) {
			setInputValue(event.target.value);
		} else {
			setEditInputValue(event.target.value);
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			if (editId === null) {
				addTodo();
			} else {
				handleSaveEdit(editId, editInputValue);
				setEditId(null);
			}
		}
	};

	const handleFilter = (status) => {
		setFilterStatus(status);
	};

	const handleSortBy = (criteria) => {
		setSortBy(criteria);
		const sortedTodos = [...todos];
		if (criteria === "createdAt") {
			sortedTodos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
		} else if (criteria === "text") {
			sortedTodos.sort((a, b) => a.text.localeCompare(b.text));
		}
		setTodos(sortedTodos);
	};

	const handleEdit = (id) => {
		setEditId(id);
		const todoToEdit = todos.find((todo) => todo.id === id);
		setEditInputValue(todoToEdit.text);
	};

	const handleSaveEdit = (id, newText) => {
		const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo));
		setTodos(updatedTodos);
		setInputValue("");
	};

	const filteredTodos =
		filterStatus === "all"
			? todos
			: todos.filter((todo) => {
					if (filterStatus === "completed") {
						return todo.completed === true;
					} else {
						return todo.completed === false;
					}
			  });

	return (
		<div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 min-h-screen flex items-center justify-center">
			<div className="bg-white w-full max-w-xl rounded shadow-lg p-8">
				<h1 className="text-3xl font-semibold text-center mb-6">To-Do List</h1>
				<div className="flex items-center border-b border-gray-300 py-2">
					<input type="text" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} className="flex-1 px-3 py-2 mr-2 rounded border border-gray-300 focus:outline-none" placeholder="Enter your task" />
					<button onClick={addTodo} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
						Add
					</button>
				</div>
				<div className="flex justify-center mt-4">
					<button onClick={() => handleFilter("all")} className="mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
						All
					</button>
					<button onClick={() => handleFilter("completed")} className="mr-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none">
						Completed
					</button>
					<button onClick={() => handleFilter("uncompleted")} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none">
						Uncompleted
					</button>
				</div>
				<div className="flex justify-center mt-4">
					<button onClick={() => handleSortBy("createdAt")} className="mr-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 focus:outline-none">
						Sort by Date
					</button>
					<button onClick={() => handleSortBy("text")} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none">
						Sort by Text
					</button>
				</div>
				<ul className="mt-6">
					{filteredTodos.map((todo) => (
						<li key={todo.id} className="flex items-center justify-between mb-2">
							<input
								type="checkbox"
								checked={todo.completed} // Tentukan apakah tugas sudah selesai atau belum
								onChange={() => toggleTodo(todo.id)} // Ubah status selesai saat checkbox diubah
								className="mr-2 form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out transform hover:scale-110 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
							/>
							{editId === todo.id ? (
								<input
									type="text"
									value={editId === todo.id ? editInputValue : ""}
									onChange={(event) => setEditInputValue(event.target.value)}
									onKeyPress={handleKeyPress}
									className="flex-1 px-3 py-2 mr-2 rounded border border-gray-300 focus:outline-none"
								/>
							) : (
								<span className={todo.completed ? "line-through" : ""}>{todo.text}</span>
							)}
							<div>
								{editId !== todo.id && (
									<button onClick={() => handleEdit(todo.id)} className="mr-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none">
										Edit
									</button>
								)}
								<button onClick={() => deleteTodo(todo.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none">
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default TodoApp;
