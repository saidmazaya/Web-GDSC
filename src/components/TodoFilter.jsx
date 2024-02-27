import React from "react";

function TodoFilter({ handleFilter }) {
	return (
		<div className="mb-4">
			<button className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => handleFilter("all")}>
				All
			</button>
			<button className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => handleFilter("completed")}>
				Completed
			</button>
			<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => handleFilter("uncompleted")}>
				Uncompleted
			</button>
		</div>
	);
}

export default TodoFilter;
