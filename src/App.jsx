import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import TodoSort from "./components/TodoSort";

function TodoApp() {
	const [inputValue, setInputValue] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [sortBy, setSortBy] = useState("");
	const [todos, setTodos] = useState(getInitialActivities());
	const [editId, setEditId] = useState(null);
	const [editInputValue, setEditInputValue] = useState("");
	const [selectedDate, setSelectedDate] = useState("");
	const [editDeadline, setEditDeadline] = useState("");

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem("todos"));
		if (storedTodos) {
			setTodos(storedTodos);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	function getInitialActivities() {
		const temp = localStorage.getItem("todos");
		const savedtoDo = JSON.parse(temp);
		return savedtoDo || [];
	}

	const addTodo = () => {
		if (inputValue.trim() !== "") {
			const newTodo = {
				id: Math.random().toString(36).substr(2, 9),
				text: inputValue,
				completed: false,
				createdAt: new Date().toISOString(),
				deadline: selectedDate,
			};
			setTodos([...todos, newTodo]);
			setInputValue("");
			setSelectedDate("");
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

	const calculatePriority = (deadline) => {
		if (!deadline) {
			return Infinity;
		}
		const today = new Date();
		const dueDate = new Date(deadline);
		const differenceInTime = dueDate.getTime() - today.getTime();
		const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
		return differenceInDays;
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
		} else if (criteria === "priority") {
			sortedTodos.sort((a, b) => calculatePriority(a.deadline) - calculatePriority(b.deadline));
		}
		setTodos(sortedTodos);
	};

	const handleEdit = (id) => {
		setEditId(id);
		const todoToEdit = todos.find((todo) => todo.id === id);
		setEditInputValue(todoToEdit.text);
		setEditDeadline(todoToEdit.deadline);
	};

	const handleSaveEdit = (id, newText) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, text: newText, deadline: editDeadline };
			}
			return todo;
		});
		setTodos(updatedTodos);
		setEditId(null);
		setEditInputValue("");
	};

	const handleSaveEditDeadline = (id) => {
		handleSaveEdit(id, editInputValue);
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
		<div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 min-h-screen flex justify-center items-center">
			<div className="bg-gray-100 w-full max-w-3xl rounded shadow-lg p-8">
				<h1 className="text-3xl font-semibold text-center mb-6">To-Do List</h1>
				<div className="flex items-center border-b border-gray-300 py-2 mb-4">
					<input type="text" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} className="flex-1 px-3 py-2 mr-2 rounded border border-gray-300 focus:outline-none" placeholder="Enter your task" />
					<input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="flex-1 px-3 py-2 mr-2 rounded border border-gray-300 focus:outline-none" />
					<button onClick={addTodo} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
						Add
					</button>
				</div>
				<div className="flex justify-between items-center mb-4 flex-wrap">
					<TodoFilter handleFilter={handleFilter} />
					<TodoSort handleSortBy={handleSortBy} />
				</div>
				<TodoList
					todos={filteredTodos}
					toggleTodo={toggleTodo}
					deleteTodo={deleteTodo}
					editId={editId}
					editInputValue={editInputValue}
					setEditInputValue={setEditInputValue}
					editDeadline={editDeadline}
					setEditDeadline={setEditDeadline}
					handleEdit={handleEdit}
					handleSaveEditDeadline={handleSaveEditDeadline}
					handleInputChange={handleInputChange}
					handleKeyPress={handleKeyPress}
				/>
			</div>
		</div>
	);
}

export default TodoApp;
