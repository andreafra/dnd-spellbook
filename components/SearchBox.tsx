import React, { useState } from "react";

export default function () {
	const [query, setQuery] = useState("");

	const _handleQueryUpdate = (ev) => {
		console.log(ev);
	};

	return (
		<div>
			<input
				type="text"
				onChange={_handleQueryUpdate}
				value={query}
				placeholder="Search..."
			/>
		</div>
	);
}
