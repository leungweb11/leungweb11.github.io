/* Require DOM access. */
document.addEventListener("DOMContentLoaded", function () {
	/* Add nav-active to current page. */
	let current_page = location.pathname.split("/")[3];
	if (current_page === "") {
		/* Fix unrecognized page at root directory. */
		current_page = "index.html";
	}
	const navLinks = document.querySelectorAll("nav ul li a");
	for (const navLink of navLinks) {
		if (navLink.getAttribute("href") == current_page) {
			navLink.parentElement.className += "nav-active";
		}
	}
	function conf_colour() {
		/* Remember last colour theme. */
		const last_theme = localStorage.getItem("last_theme");
		if (last_theme) {
			document
				.querySelector(":root")
				.style.setProperty(
					"--primary-colour",
					"var(--" + last_theme + "-primary-colour)",
				);
			document
				.querySelector(":root")
				.style.setProperty(
					"--secondary-colour",
					"var(--" + last_theme + "-secondary-colour)",
				);
			document
				.querySelectorAll(
					`fieldset > input[data-radio="${last_theme}"]`,
				)
				.forEach((each) => {
					each.setAttribute("checked", "");
				});
		} else {
			document
				.querySelectorAll(`fieldset > input[data-radio="purple"]`)
				.forEach((each) => {
					each.setAttribute("checked", "");
				});
		}
		/* For all radio input. */
		document
			.querySelectorAll("fieldset > input[data-radio]")
			.forEach((each) => {
				each.addEventListener("change", function () {
					const theme = each.getAttribute("data-radio");
					/* Change colour variables. */
					document
						.querySelector(":root")
						.style.setProperty(
							"--primary-colour",
							"var(--" + theme + "-primary-colour)",
						);
					document
						.querySelector(":root")
						.style.setProperty(
							"--secondary-colour",
							"var(--" +
								each.getAttribute("data-radio") +
								"-secondary-colour)",
						);
					localStorage.setItem("last_theme", theme);
				});
			});
	}
	conf_colour();
	/* Initialize theme configuration. */
	/* Show popup to navigate to pages the user selects. */
	document
		.querySelector("li[data-icon='menu']")
		.addEventListener("click", () => {
			(async () => {
				const { value: nav } = await Swal.fire({
					/* Requires a different name attribute for updating the status of both groups of input at the same time. */
					html: `<fieldset><legend>Theme</legend><input data-radio="purple" type="radio" name="colour theme mobile" value="Purple" aria-label="Use the Purple colour theme." checked="checked"><input data-radio="blue" type="radio" name="colour theme mobile" value="Blue" aria-label="Use the Blue colour theme."><input data-radio="red" type="radio" name="colour theme mobile" value="Red" aria-label="Use the Red colour theme."><input data-radio="orange" type="radio" name="colour theme mobile" value="Orange" aria-label="Use the Orange colour theme."><input data-radio="green" type="radio" name="colour theme mobile" value="Green" aria-label="Use the Green colour theme."><input data-radio="grey" type="radio" name="colour theme mobile" value="Grey" aria-label="Use the Grey colour theme."></fieldset>`,
					input: "select",
					inputOptions: {
						craft: "Craft",
						flower: "Flower",
						food: "Food",
						music: "Music",
						plant: "Plant",
					},
					didRender: function () {
						/* Inject colour configuration handler. */
						conf_colour();
						/* Set text colour for the confirm button. */
						document
							.querySelector(":root")
							.style.setProperty(
								"--swal2-confirm-button-color",
								"var(--primary-colour)",
							);
					},
					didClose: function () {
						/* Update handler status. */
						conf_colour();
					},
					inputPlaceholder: "Navigate to...",
					confirmButtonText: "Apply",
					confirmButtonAriaLabel: "Apply changes.",
					confirmButtonColor: "var(--secondary-colour)",
				});
				if (nav) {
					window.location.href = `${nav}.html`;
				}
			})();
		});
});
