import React from "react";

function TodoList({ todos, toggleTodo, deleteTodo }) {
	return (
		<ul className="mb-4">
			{todos.map((todo) => (
				<li key={todo.id} className="flex items-center mb-2">
					<span className={`mr-2 ${todo.completed ? "line-through" : ""}`}>{todo.text}</span>
					<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => toggleTodo(todo.id)}>
						{todo.completed ? "Undo" : "Complete"}
					</button>
					<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteTodo(todo.id)}>
						Delete
					</button>
				</li>
			))}
		</ul>
	);
}

export default TodoList;
