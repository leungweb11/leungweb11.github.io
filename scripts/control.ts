import { eraseArt, refreshAnimation } from "./animate";

const svg = document.getElementsByTagName("svg");
const no_animate = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const control_form = <HTMLFormElement>document.getElementById("control");
let pg_display = <HTMLInputElement>document.getElementById("pg_display");
let pg_cached = parseInt(pg_display.value) - 1 || 0;

// First run.
if (!pg_display) {
	console.error("Could not find display element for tracking page numeral; creating hidden input.");
	pg_display = document.createElement("input");
	pg_display.setAttribute("display", "none");
}

pg_display.setAttribute("max", String(svg.length));

function hideAll(exclude?: number) {
	for (let i = 0; i < svg.length; i++) {
		if (i !== exclude) {
			svg[i]?.setAttribute("display", "none");
		}
	}
}

// Page numeral starts from zero.
function updatePage(pg_input = 0) {
	if (pg_display) {
		if (svg.length <= pg_input) {
			console.warn("Input exceeds total page numeral; navigating to the last page.");
			pg_input = svg.length - 1; // Input too large; navigate to the last page.
			pg_display.value = String(pg_input + 1);
		} else if (svg.length - pg_input > svg.length) {
			console.warn("Input is invalid; navigating to the first page.");
			pg_input = 0;
			pg_display.value = String(pg_input + 1);
		}
		hideAll(pg_input); // Exclude the target page.
		if (svg.length > pg_input) {
			svg[pg_input]?.setAttribute("display", "inline");
		}
	}
}

control_form.addEventListener("submit", function (event) {
	event.preventDefault(); // Do not allow submitting the form; it causes a refresh that is undesirable.
});

// Update page on page change.
pg_display.addEventListener("change", async () => {
	if (pg_display.matches(":invalid")) {
		return; // Return if input is invalid.
	}
	if (!no_animate) {
		await eraseArt();
	}
	// Just in case.
	pg_display.value = pg_display.value.trim(); // Remove whitespace.
	if (pg_display.value == "") {
		pg_display.value = String(1); // Correct empty input.
	}
	pg_cached = parseInt(pg_display.value) - 1 || 0; // Upddate cache.
	updatePage(pg_cached);
	refreshAnimation();
});

hideAll();
updatePage(pg_cached); // Browser may retain user input after page refresh. If possible, restore to previous state.

export { pg_display };
