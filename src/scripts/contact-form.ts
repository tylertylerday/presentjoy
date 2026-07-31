const SUCCESS = 'Thank you — your message is on its way. I respond to enquiries within two business days.';
const FAILURE =
	'Something went wrong sending that. Please try again, or email <a href="mailto:hello@presentjoy.la">hello@presentjoy.la</a> directly.';

/**
 * Submits the contact form over fetch so the visitor gets inline feedback
 * instead of being handed off to the form provider's own page.
 *
 * Enhancement only: the form posts natively to the same endpoint without this,
 * and the browser has already run constraint validation by the time `submit`
 * fires.
 */
export function setupContactForm() {
	const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
	if (!form) return;

	const status = form.querySelector<HTMLElement>('[data-form-status]');
	const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
	if (!status || !submit) return;

	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		submit.disabled = true;
		status.dataset.state = 'pending';
		status.textContent = 'Sending…';

		try {
			const response = await fetch(form.action, {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: new FormData(form),
			});
			const result = await response.json();

			if (!response.ok || !result.success) throw new Error(result.message);

			form.reset();
			status.dataset.state = 'success';
			status.textContent = SUCCESS;
		} catch {
			status.dataset.state = 'error';
			status.innerHTML = FAILURE;
		} finally {
			submit.disabled = false;
		}
	});
}
