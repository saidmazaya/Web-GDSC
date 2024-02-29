import React from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

function TodoItem({ todo, toggleTodo, deleteTodo, editId, handleEdit, handleSaveEditDeadline, editInputValue, setEditInputValue, editDeadline, setEditDeadline, handleInputChange, handleKeyPress }) {
	return (
		<li className="flex items-center justify-between mb-2">
			<div className="flex items-center">
				<div onClick={() => toggleTodo(todo.id)} className={`rounded-full h-6 w-6 flex items-center justify-center border-2 cursor-pointer ${todo.completed ? "bg-blue-600 border-blue-600" : "border-gray-400"}`}>
					{todo.completed && (
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
						</svg>
					)}
				</div>
				{editId === todo.id ? (
					<>
						<input
							type="text"
							value={editInputValue}
							onChange={(event) => setEditInputValue(event.target.value)}
							onKeyPress={(event) => handleKeyPress(event)}
							className="flex-1 px-3 ml-3 py-2 mr-2 rounded border border-gray-300 focus:outline-none"
						/>
						<input type="date" value={editDeadline} onChange={(event) => setEditDeadline(event.target.value)} className="flex-1 px-3 ml-3 py-2 mr-2 rounded border border-gray-300 focus:outline-none" />
					</>
				) : (
					<span className={`ml-3 flex-1 ${todo.completed ? "text-gray-500" : ""}`}>
						<div className={todo.completed ? "line-through" : ""}>{todo.text}</div>
						<div className="text-xs text-gray-400">
							{new Date(todo.createdAt).toLocaleTimeString()}, {new Date(todo.createdAt).toLocaleDateString("en-GB")}
							&nbsp;- Deadline: {todo.deadline ? new Date(todo.deadline).toLocaleDateString("en-GB") : "-"}
						</div>
					</span>
				)}
			</div>
			<div>
				{editId === todo.id ? (
					<button onClick={() => handleSaveEditDeadline(todo.id)} className="mr-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none">
						<FaCheck />
					</button>
				) : (
					<button onClick={() => handleEdit(todo.id)} className="mr-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none">
						<FaEdit />
					</button>
				)}
				<button onClick={() => deleteTodo(todo.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none">
					<FaTrash />
				</button>
			</div>
		</li>
	);
}

export default TodoItem;
