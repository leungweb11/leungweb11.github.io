const svg = document.getElementsByTagName("svg");
let pg_display = <HTMLInputElement>document.getElementById("pg_display");

function hideAll() {
	for (let i = 0; i < svg.length; i++) {
		svg[i]?.setAttribute("display", "none");
	}
}

if (!pg_display) {
	console.error("Could not find display element for tracking page numeral; creating hidden input.");
	pg_display = document.createElement("input");
	pg_display.setAttribute("display", "none");
}

pg_display.setAttribute("min", "1");
pg_display.setAttribute("max", String(svg.length));

// Programmatic interface; page numeral starts from zero.
function updatePage(pg_numeral = 0) {
	// if (pg_display) {
	// 	let pg_numeral = parseInt(pg_display.value) - 1 || 0; // Start from index zero.
	// 	if (svg.length > pg_numeral) {
	// 		svg[pg_numeral]?.setAttribute("display", "none");
	// 		pg_numeral++; // One for index.
	// 		svg[pg_numeral]?.setAttribute("display", "inline");
	// 		pg_numeral++; // Another for display.
	// 		pg_display.value = String(pg_numeral); // Add one.
	// 	} else {
	// 		console.error("Test.");
	// 	}
	// }
	if (pg_display) {
		hideAll();
		svg[pg_numeral]?.setAttribute("display", "inline");
	}
}

// Update page on page change.
pg_display.addEventListener("change", () => {
	updatePage();
});

export { pg_display };
