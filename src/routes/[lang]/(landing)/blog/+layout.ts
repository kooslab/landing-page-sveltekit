import type { LayoutLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';

export const load: LayoutLoad = async () => {
	const baseMetaTags: MetaTagsProps = {
		title: 'Blog',
		titleTemplate: '%s | Kooslab',
		description: 'Insights and updates from Kooslab'
	};

	return {
		baseMetaTags
	};
};
