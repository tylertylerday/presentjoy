/**
 * The practice's own details, in one place. Feeds the structured data in the
 * layout and the address block on the contact page, so search engines and
 * visitors are always reading the same facts.
 */
export const business = {
	name: 'Present Joy',
	legalName: 'Present Joy Therapy',
	url: 'https://presentjoy.la',
	email: 'hello@presentjoy.la',
	description:
		'Present Joy Therapy is a recovery-focused psychotherapy practice in South Pasadena, CA, providing in-person and telehealth care to adults facing addiction, anger, depression, and grief and loss.',
	// Schema.org's coarse bands, not a rate. The fee itself lives in the FAQ.
	priceRange: '$$',
	address: {
		street: '1510 Oxley Street, Suite J',
		city: 'South Pasadena',
		region: 'CA',
		postalCode: '91030',
	},
	// As Google geocodes the address above.
	geo: {
		latitude: 34.1140745,
		longitude: -118.1512599,
	},
	areaServed: ['Los Angeles County', 'Orange County', 'Riverside County', 'San Bernardino County'],
	services: [
		'Addiction recovery therapy',
		'Anger management',
		'Depression therapy',
		'Grief and loss counseling',
	],
};
