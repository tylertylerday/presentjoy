import { animate } from 'motion/mini';

const DURATION = 0.32;
const EASE = [0.22, 1, 0.36, 1];

/**
 * Animates the open/close of `<details>` elements, which they cannot do
 * natively. Purely an enhancement — without JS the accordion still toggles,
 * just instantly.
 *
 * While closing, the element stays `open` so its contents remain measurable and
 * visible; `data-closing` marks that interim state for styling.
 */
export function setupAccordions() {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	document.querySelectorAll<HTMLDetailsElement>('[data-accordion]').forEach((details) => {
		const summary = details.querySelector('summary');
		const panel = details.querySelector<HTMLElement>('[data-accordion-panel]');
		if (!summary || !panel) return;

		let generation = 0;
		let running: ReturnType<typeof animate> | null = null;

		const run = (
			from: number,
			to: number,
			fromOpacity: number,
			toOpacity: number,
			onFinish: () => void,
		) => {
			const id = ++generation;

			running = animate(
				panel,
				{ height: [`${from}px`, `${to}px`], opacity: [fromOpacity, toOpacity] },
				{ duration: DURATION, ease: EASE },
			);

			running.finished
				.then(() => {
					if (id !== generation) return;
					onFinish();
					panel.style.height = '';
					panel.style.overflow = '';
					panel.style.opacity = '';
				})
				.catch(() => {});
		};

		summary.addEventListener('click', (event) => {
			event.preventDefault();

			const closing = details.hasAttribute('data-closing');
			const wasOpen = details.open;
			// Read before stopping: a running animation overrides inline styles.
			// Resuming from the live values keeps rapid clicks from jumping.
			const start = panel.offsetHeight;
			const startOpacity = wasOpen ? Number(getComputedStyle(panel).opacity) : 0;

			running?.stop();
			panel.style.overflow = 'hidden';
			panel.style.height = `${start}px`;

			if (wasOpen && !closing) {
				details.setAttribute('data-closing', '');
				run(start, 0, startOpacity, 0, () => {
					details.open = false;
					details.removeAttribute('data-closing');
				});
				return;
			}

			details.removeAttribute('data-closing');
			details.open = true;

			panel.style.height = 'auto';
			const target = panel.offsetHeight;
			panel.style.height = `${start}px`;

			run(start, target, startOpacity, 1, () => {});
		});
	});
}
