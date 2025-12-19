import { animate, svg } from "animejs";

const animation = [
	// Animate fill parameters.
	animate("path, rect, ellipse, polygon, circle", {
		fill: { from: "rgba(255, 255, 255, 0)" },
		ease: "inOutQuad",
		duration: 2000,
	}),
	// Use pure black to mark paths to be drawn then erased.
	animate(svg.createDrawable("path[stroke='#000'], rect[stroke='#000'], ellipse[stroke='#000'], polygon[stroke='#000'], circle[stroke='#000']"), {
		draw: ["0 0", "0 1", "1 1"], // Reversed order to ensure simultaneous effect with colour filling.
		ease: "inOutQuad",
		duration: 2000,
	}),
	// Draw paths with colour #333.
	animate(svg.createDrawable("path[stroke='#333'], rect[stroke='#333'], ellipse[stroke='#333'], polygon[stroke='#333'], circle[stroke='#333']"), {
		draw: ["0 0", "0 1"],
		ease: "inOutQuad",
		duration: 1000,
	}),
	// Fade text elements.
	animate("text", {
		opacity: [0, 1],
		delay: 1000,
		duration: 1000,
		ease: "inOutQuad",
	}),
];

export async function eraseArt() {
	const finished = [animation[0]?.reverse()];
	for (let i = 1; i < animation.length; i++) {
		finished.push(animation[i]?.reverse());
	}
	return finished; // Return the result of all animation; used to introduce delay before skipping pages.
}

export function refreshAnimation() {
	for (let i = 0; i < animation.length; i++) {
		animation[i]?.refresh().restart();
	}
}
