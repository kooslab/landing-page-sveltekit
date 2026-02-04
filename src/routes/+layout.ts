import { type MetaTagsProps } from 'svelte-meta-tags';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, url }) => {
	const title = `Koostory`;
	const description = `Enterprise-grade tools at freelancer prices. Help your small business save time, work efficiently, and boost productivity without breaking the bank. Try free for 14 days.`;
	const canonicalUrl = new URL(url.pathname, url.origin).href;
	const OGImage = 'https://media.fromkian.com/acme.jpg';

	const baseMetaTags: MetaTagsProps = {
		title,
		titleTemplate: `%s — ${title}`,
		description,
		canonical: canonicalUrl,
		openGraph: {
			type: 'website',
			url: canonicalUrl,
			locale: 'en_US',
			title,
			description,
			siteName: title,
			images: [
				{
					url: OGImage,
					alt: title,
					width: 1200,
					height: 630,
					type: 'image/png'
				}
			]
		},
		twitter: {
			creator: `@example`,
			site: `@example`,
			cardType: 'summary_large_image',
			description,
			image: OGImage,
			imageAlt: description
		}
	};

	return {
		user: data.user,
		baseMetaTags
	};
};
