import type { ImageMetadata } from 'astro';
import couchPhoto from '../assets/office.jpg';
import davidCard from '../assets/share-david.jpg';

export interface ShareImage {
	image: ImageMetadata;
	/** Describes the picture, not the page — link previews carry their own title. */
	alt: string;
}

/**
 * The pictures pages share as, at the 1200x630 every network crops to. Each
 * keeps its image and description together, so a page names one rather than
 * restating both. Sources are landscape and larger than the frame: Astro will
 * not enlarge past a source, and would quietly hand back the smaller original.
 */
export const shareImages = {
	/*
	 * The portrait is square, so cropping it to a landscape frame would take
	 * the top of his head off. This is that photo fitted whole against the page
	 * background, sized for the frame ahead of the build.
	 */
	david: {
		image: davidCard,
		alt: 'David, the Licensed Clinical Social Worker behind Present Joy',
	},
	couch: {
		image: couchPhoto,
		alt: 'The therapy office: a grey sofa with cushions and a throw, beside a side table with a lamp, under four framed bird prints',
	},
} as const satisfies Record<string, ShareImage>;
