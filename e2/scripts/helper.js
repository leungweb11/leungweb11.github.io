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
	document.querySelector("").addEventListener("change", function () {
		/* Change colour variables. */
		document.querySelector(":root").style.setProperty("--primary-color", "#000000")
		document.querySelector(":root").style.setProperty("--secondary-color", "grey")
	})
});
