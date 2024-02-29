import React from "react";

function TodoFilter({ handleFilter }) {
	return (
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
	);
}

export default TodoFilter;
