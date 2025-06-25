const posts = import.meta.glob<{
	metadata: {
		title: string;
		date: string;
		updated?: string;
		categories?: string[];
		excerpt?: string;
	};
}>('./**/+page.md');

export const load = async () => {
	const allPosts = await Promise.all(
		Object.entries(posts).map(async ([path, resolver]) => {
			try {
				const { metadata } = await resolver();
				const slug = path.split('/')[1];

				// Parse date and validate it
				const parsedDate = new Date(metadata?.date || '');
				const date = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

				return {
					slug,
					...metadata,
					date
				};
			} catch (error) {
				console.error(`Error processing post at ${path}:`, error);
				return null;
			}
		})
	);

	// Filter out any null entries and sort by date
	return {
		posts: allPosts
			.filter((post): post is NonNullable<typeof post> => post !== null)
			.sort((a, b) => b.date.getTime() - a.date.getTime())
	};
};
