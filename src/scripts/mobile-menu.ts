/** Matches the breakpoint in Nav.astro where the panel gives way to the row. */
const DESKTOP = '(min-width: 48rem)';

/**
 * Drives the mobile nav panel. The open state lives as `data-open` on the
 * header, so the button, its icons and the panel all style off one attribute.
 *
 * Without JS the panel simply never opens; the links stay reachable from the
 * footer, which lists the same routes.
 */
export function setupMobileMenu() {
	const header = document.querySelector<HTMLElement>('[data-site-header]');
	const toggle = header?.querySelector<HTMLButtonElement>('[data-menu-toggle]');
	if (!header || !toggle) return;

	const isOpen = () => header.hasAttribute('data-open');

	const setOpen = (open: boolean) => {
		header.toggleAttribute('data-open', open);
		toggle.setAttribute('aria-expanded', String(open));
		toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
	};

	toggle.addEventListener('click', () => setOpen(!isOpen()));

	document.addEventListener('click', (event) => {
		if (!isOpen()) return;

		const target = event.target as Element | null;
		// The toggle runs its own handler; skip it so this one doesn't undo it.
		if (!target || toggle.contains(target)) return;
		// Dead space inside the panel keeps it open, links let it close.
		if (header.contains(target) && !target.closest('a')) return;

		setOpen(false);
	});

	document.addEventListener('keydown', (event) => {
		if (event.key !== 'Escape' || !isOpen()) return;

		setOpen(false);
		toggle.focus();
	});

	// Widening past the breakpoint swaps the panel back into the desktop row,
	// which would otherwise leave the toggle reading as expanded.
	window.matchMedia(DESKTOP).addEventListener('change', (event) => {
		if (event.matches) setOpen(false);
	});
}
