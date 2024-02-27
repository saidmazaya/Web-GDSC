import React from "react";

function TodoSort({ handleSortBy }) {
	return (
		<div className="mb-4">
			<button className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => handleSortBy("createdAt")}>
				Sort by Date
			</button>
			<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => handleSortBy("text")}>
				Sort by Text
			</button>
		</div>
	);
}

export default TodoSort;
