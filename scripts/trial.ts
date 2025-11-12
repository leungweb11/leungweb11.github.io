import { animate, svg, stagger } from "animejs";
// Experimental.
animate(("path, rect, ellipse, polygon, circle"), {
	fill: { from: "rgba(255, 255, 255, 0)" },
	ease: "inOutQuad",
	duration: 1000,
	delay: stagger(100),
});

animate(svg.createDrawable("path, rect, ellipse, polygon, circle"), {
	draw: ["1 1", "0 1", "0 0"],
	ease: "inOutQuad",
	duration: 1000,
	delay: stagger(100),
	reversed: true // Simultaneous effect with the colour filling animation.
});
