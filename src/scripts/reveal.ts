import { animate } from 'motion/mini';

/** Seconds between each element's entrance. */
const STAGGER = 0.09;

/**
 * Fades `[data-reveal]` elements in on load, staggered in document order, so
 * the page settles top-down: logo, nav links, then hero copy and button.
 *
 * motion/mini drives WAAPI directly, so transforms are written out in full
 * rather than via the `y` shorthand, which it does not resolve.
 */
export function revealOnLoad() {
	const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		targets.forEach((el) => (el.style.opacity = '1'));
		return;
	}

	targets.forEach((el, i) =>
		animate(
			el,
			{ opacity: [0, 1], transform: ['translateY(-10px)', 'translateY(0)'] },
			{ duration: 0.6, delay: i * STAGGER, ease: [0.22, 1, 0.36, 1] },
		),
	);
}
