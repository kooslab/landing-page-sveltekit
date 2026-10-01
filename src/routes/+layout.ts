import { type MetaTagsProps } from 'svelte-meta-tags';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, url }) => {
	const title = `KooStory`;
	const description = `We identify the workflows costing you time and replace them with AI automations that run without you. Berlin-based AI operations partner for SMEs.`;
	const canonicalUrl = new URL(url.pathname, url.origin).href;
	const OGImage = `${url.origin}/og?title=KooStory&subtitle=AI+Operations+Partner+for+SMEs+%7C+Berlin`;

	const baseMetaTags: MetaTagsProps = {
		title,
		titleTemplate: `%s | ${title}`,
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
					alt: 'KooStory — AI Operations Partner for SMEs',
					width: 1200,
					height: 630,
					type: 'image/png'
				}
			]
		},
		twitter: {
			cardType: 'summary_large_image',
			description,
			image: OGImage,
			imageAlt: 'KooStory — AI Operations Partner for SMEs'
		}
	};

	return {
		user: data.user,
		baseMetaTags
	};
};
