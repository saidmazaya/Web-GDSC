import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

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
	const [selectedDate, setSelectedDate] = useState("");
	const [todayDate, setTodayDate] = useState(new Date().toISOString().substr(0, 10));

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
				deadline: selectedDate, // Tambah properti deadline
			};
			setTodos([...todos, newTodo]);
			setInputValue("");
			setSelectedDate(""); // Reset input tanggal setelah tugas ditambahkan
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
		  return Infinity; // Assign Infinity for tasks without a deadline
		}
		const today = new Date();
		const dueDate = new Date(deadline);
		const differenceInTime = dueDate.getTime() - today.getTime();
		const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
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
					<div className="flex space-x-4 mb-2 md:mb-0">
						<button onClick={() => handleFilter("all")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
							All
						</button>
						<button onClick={() => handleFilter("completed")} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none">
							Completed
						</button>
						<button onClick={() => handleFilter("uncompleted")} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none">
							Uncompleted
						</button>
					</div>
					<div>
						<select onChange={(e) => handleSortBy(e.target.value)} className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 focus:outline-none">
							<option value="">Sort by</option>
							<option value="createdAt">Created</option>
							<option value="text">Text</option>
							<option value="priority">Priority</option>
						</select>
					</div>
				</div>

				<div className="overflow-y-auto max-h-60vh">
					<ul>
						{filteredTodos.map((todo) => (
							<li key={todo.id} className="flex items-center justify-between mb-2">
								<div className="flex items-center">
									<div onClick={() => toggleTodo(todo.id)} className={`rounded-full h-6 w-6 flex items-center justify-center border-2 cursor-pointer ${todo.completed ? "bg-blue-600 border-blue-600" : "border-gray-400"}`}>
										{todo.completed && (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
											</svg>
										)}
									</div>
									{/* Render input teks saat mode edit aktif */}
									{editId === todo.id ? (
										<input
											type="text"
											value={editInputValue}
											onChange={(event) => setEditInputValue(event.target.value)}
											onKeyPress={(event) => handleKeyPress(event)}
											className="flex-1 px-3 ml-3 py-2 mr-2 rounded border border-gray-300 focus:outline-none"
										/>
									) : (
										<span className={`ml-3 flex-1 ${todo.completed ? "text-gray-500" : ""}`}>
											<div className={todo.completed ? "line-through" : ""}>{todo.text}</div> {/* Teks todo */}
											<div className="text-xs text-gray-400">
												{new Date(todo.createdAt).toLocaleTimeString()}, {new Date(todo.createdAt).toLocaleDateString()}
												&nbsp;- Deadline: {todo.deadline ? new Date(todo.deadline).toLocaleDateString() : "-"}
											</div>
										</span>
									)}
								</div>
								<div>
									{/* Periksa apakah mode edit aktif sebelum merender tombol edit */}
									{editId !== todo.id && (
										<button onClick={() => handleEdit(todo.id)} className="mr-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none">
											<FaEdit />
										</button>
									)}
									<button onClick={() => deleteTodo(todo.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none">
										<FaTrash />
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default TodoApp;
