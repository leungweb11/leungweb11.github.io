function next() {
	const svg = document.getElementsByTagName("svg");
	const pg_display = document.getElementById("page_number");
	if (pg_display) {
		let pg_number = parseInt(pg_display.innerText);
		if (svg.length < pg_number) {
			svg[pg_number]?.setAttribute("display", "none");
			pg_number = 1 + pg_number;
			pg_display.innerText = String(pg_number); // Add one.
		} else {
			console.error("Test.");
		}
	}
}

next();
