import React from "react";

function TodoSort({ handleSortBy }) {
	return (
		<div>
			<select onChange={(e) => handleSortBy(e.target.value)} className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 focus:outline-none">
				<option value="">Sort by</option>
				<option value="createdAt">Created</option>
				<option value="text">Text</option>
				<option value="priority">Priority</option>
			</select>
		</div>
	);
}

export default TodoSort;
