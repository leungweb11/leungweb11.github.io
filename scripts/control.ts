import { eraseArt, refreshAnimation } from "./animate";

const svg = document.getElementsByTagName("svg");
const control_form = <HTMLFormElement>document.getElementById("control");
// The first button is always triggered on enter. Since changes of the input value are already being detected and handled, the said button was wrapped in the label element with no function.
const down_button = <HTMLButtonElement>control_form.children[1];
let pg_display = <HTMLInputElement>control_form.children[2];
const up_button = <HTMLButtonElement>control_form.children[3];

function invalid() {
	return pg_display.matches(":invalid"); // Use HTML 5 form validation.
}

// Page numeral starts from 1 whereas page index starts from 0.
async function updatePage() {
	let pg_index = parseInt(pg_display.value) - 1;
	// Always update the state of navigation buttons.
	if (svg.length <= pg_index + 1) {
		up_button?.setAttribute("disabled", "disabled");
	} else {
		up_button?.removeAttribute("disabled");
	}
	if (0 >= pg_index) {
		down_button?.setAttribute("disabled", "disabled");
	} else {
		down_button?.removeAttribute("disabled");
	}
	// Input validation.
	if (invalid()) return;
	if (svg.length <= pg_index) {
		console.error("Input exceeds total page numeral; navigating to the last page.");
		pg_index = svg.length - 1;
	} else if (pg_index < 0) {
		console.warn("Input is invalid; navigating to the first page.");
		pg_index = 0;
	}
	// Erase the board; used alongside refreshAnimation. Has no effect if prefers-reduced-motion was detected.
	await eraseArt();
	for (let i = 0; i < svg.length; i++) {
		if (i === pg_index) continue; // Exception for the target page.
		svg[i]?.setAttribute("display", "none"); // Hide everything else.
	}
	svg[pg_index]?.setAttribute("display", "inline");
	refreshAnimation();
}

// First run.
pg_display.setAttribute("max", String(svg.length));
control_form.addEventListener("submit", function (event) {
	event.preventDefault(); // Do not allow submitting the form; it causes a refresh that is undesirable.
});
pg_display.addEventListener("change", () => updatePage()); // Detect and apply user changes.
if (control_form.length >= 3) {
	down_button?.addEventListener("click", function () {
		if (pg_display.disabled) return; // Already at minimum.
		if (invalid()) {
			pg_display.value = String(svg.length); // Redirect user to the nearest valid value.
		} else {
			pg_display.value = String(parseInt(pg_display.value) - 1); // Navigate to the previous page.
		}
		updatePage();
	});
	up_button?.addEventListener("click", function () {
		if (pg_display.disabled) return;
		if (invalid()) {
			pg_display.value = "1";
		} else {
			pg_display.value = String(parseInt(pg_display.value) + 1);
		}
		updatePage();
	});
}
updatePage();

export { pg_display };
