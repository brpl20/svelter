export async function load() {
	const posts = import.meta.glob('./*/+page.md', { eager: true });

	const blogPosts = Object.entries(posts)
		.map(([path, module]) => {
			const slug = path.split('/')[1];
			const metadata = module.metadata || {};
			return {
				slug,
				title: metadata.title || slug,
				date: metadata.date || '2024-01-01',
				summary: metadata.summary || '',
				tags: metadata.tags || []
			};
		})
		.sort((a, b) => new Date(b.date) - new Date(a.date));

	return { posts: blogPosts };
}
