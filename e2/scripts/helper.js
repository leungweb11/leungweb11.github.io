/* Require DOM access. */
document.addEventListener("DOMContentLoaded", function () {
	/* Add nav-active to current page. */
	const current_page = location.pathname.split("/")[2];
	if (current_page === "") return;
	const navLinks = document.querySelectorAll("nav ul li a");
	console.log(document.querySelectorAll("nav ul li a"))
	for (const navLink of navLinks) {
		if (navLink.getAttribute("href") == current_page) {
			navLink.parentElement.className += "nav-active";
		}
	}
	/* For all radio input. */
	document.querySelectorAll("fieldset > input[data-radio]").forEach((each) => {
		each.addEventListener("change", function () {
			each.getAttribute("data-radio");
			/* Change colour variables. */
			document.querySelector(":root").style.setProperty("--primary-color", "var(--" + each.getAttribute("data-radio") + "-primary-color)")
			document.querySelector(":root").style.setProperty("--secondary-color", "var(--" + each.getAttribute("data-radio") + "-secondary-color)")
		})
	});
});
