import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, deleteTodo, editId, handleEdit, handleSaveEditDeadline, editInputValue, setEditInputValue, editDeadline, setEditDeadline, handleInputChange, handleKeyPress }) {
	return (
		<div className="overflow-y-auto max-h-60vh">
			<ul>
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
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
				))}
			</ul>
		</div>
	);
}

export default TodoList;
