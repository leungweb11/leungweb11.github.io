/* Require DOM access. */
document.addEventListener("DOMContentLoaded", function () {
	/* Add nav-active to current page. */
	const current_page = location.pathname.split("/")[2];
	if (current_page === "") return;
	const navLinks = document.querySelectorAll("nav ul li a");
	for (const navLink of navLinks) {
		if (navLink.getAttribute("href") == current_page) {
			navLink.parentElement.className += "nav-active";
		}
	}
	/* Remember last colour theme. */
	const last_theme = localStorage.getItem("last_theme");
	if (last_theme) {
		document.querySelector(":root").style.setProperty("--primary-color", "var(--" + last_theme + "-primary-color)");
		document.querySelector(":root").style.setProperty("--secondary-color", "var(--" + last_theme + "-secondary-color)");
		document.querySelector("fieldset > input[data-radio='purple']").removeAttribute("checked");
		document.querySelector(`fieldset > input[data-radio=${last_theme}]`).setAttribute("checked", "");
	}
	/* For all radio input. */
	document.querySelectorAll("fieldset > input[data-radio]").forEach((each) => {
		each.addEventListener("change", function () {
			const theme = each.getAttribute("data-radio");
			/* Change colour variables. */
			document.querySelector(":root").style.setProperty("--primary-color", "var(--" + theme + "-primary-color)");
			document.querySelector(":root").style.setProperty("--secondary-color", "var(--" + each.getAttribute("data-radio") + "-secondary-color)");
			if (theme === "purple") {
				/* Since purple is the default. */
				localStorage.removeItem("last_theme")
			} else {
				localStorage.setItem("last_theme", theme);
			}
		})
	});
	/* Show popup to navigate to pages the user selects. */
	document.querySelector("li[data-icon='menu']").addEventListener("click", () => {
		(async () => {
			const { value: nav } = await Swal.fire({
				input: "select",
				inputOptions: {
					craft: "Craft",
					flower: "Flower",
					food: "Food",
					music: "Music",
					plant: "Plant"
				},
				inputPlaceholder: "Navigate to...",
			});
			if (nav) {
				window.location.href = `${nav}.html`;
			}
		})()
	});
});
