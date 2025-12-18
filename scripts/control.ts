const svg = document.getElementsByTagName("svg");
let pg_display = <HTMLInputElement>document.getElementById("pg_display");

function hideAll(exclude?: number) {
	for (let i = 0; i < svg.length; i++) {
		if (i !== exclude) {
			svg[i]?.setAttribute("display", "none");
		}
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
	if (pg_display) {
		hideAll(pg_numeral);
		if (svg.length > pg_numeral) {
			svg[pg_numeral]?.setAttribute("display", "inline");
		}
	}
}

// Update page on page change.
pg_display.addEventListener("change", () => {
	let pg_numeral = parseInt(pg_display.value) - 1 || 0; // Start from index zero.
	if (svg.length <= pg_numeral) {
		console.warn("Input exceeds total page numeral; navigating to the last page.");
		pg_numeral = svg.length - 1; // Input too large; navigate to the last page.
		pg_display.value = String(pg_numeral + 1);
	} else if (svg.length - pg_numeral > svg.length) {
		console.warn("Input is invalid; navigating to the first page.");
		pg_numeral = 0;
		pg_display.value = String(pg_numeral + 1);
	}
	updatePage(pg_numeral);
});

hideAll();
updatePage();

export { pg_display };
