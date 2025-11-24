import { waapi, animate, svg, splitText, stagger } from "animejs";
// Animate fill parameters.
waapi.animate(("path, rect, ellipse, polygon, circle"), {
	fill: { from: "rgba(255, 255, 255, 0)" },
	ease: "inOutQuad",
	duration: 2000
});

// Use pure black to mark paths to be drawn then erased.
animate(svg.createDrawable("path[stroke='#000'], rect[stroke='#000'], ellipse[stroke='#000'], polygon[stroke='#000'], circle[stroke='#000']"), {
	draw: ["0 0", "0 1", "1 1"], // Reversed order to ensure simultaneous effect with colour filling.
	ease: "inOutQuad",
	duration: 2000
});
// Draw paths with colour #333.
animate(svg.createDrawable("path[stroke='#333'], rect[stroke='#333'], ellipse[stroke='#333'], polygon[stroke='#333'], circle[stroke='#333']"), {
	draw: ["0 0", "0 1"],
	ease: "inOutQuad",
	duration: 1000
});

const { chars } = splitText("tspan", { chars: true });
console.info(chars)
waapi.animate("tspan", {
	translate: `0 -2rem`,
	fill: { from: "rgba(255, 255, 255, 0)" },
	ease: "inOutQuad",
	delay: stagger(100),
	duration: 2000
});
