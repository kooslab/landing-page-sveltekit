<script lang="ts">
	import { onMount, tick } from 'svelte';
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import SEO from '$lib/components/SEO.svelte';
	import TranslateButton from '$lib/components/blog/translate-button.svelte';

	let { data }: { data: PageData } = $props();

	// Configure marked to support GFM tables (tables is enabled via gfm: true)
	marked.setOptions({
		gfm: true,
		breaks: true
	});

	// Render mermaid diagrams after content loads
	onMount(() => {
		// Wait for DOM to settle, then render mermaid
		setTimeout(async () => {
			await tick();
			const mermaidBlocks = document.querySelectorAll('pre code.language-mermaid');
			if (mermaidBlocks.length === 0) return;

			const mermaid = (await import('mermaid')).default;
			mermaid.initialize({
				startOnLoad: false,
				theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
				fontFamily: 'system-ui, -apple-system, sans-serif'
			});

			for (const block of mermaidBlocks) {
				const pre = block.parentElement;
				if (!pre) continue;
				const code = block.textContent || '';
				const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
				try {
					// mermaid.render returns sanitized SVG output
					const { svg } = await mermaid.render(id, code);
					const wrapper = document.createElement('div');
					wrapper.className = 'my-8 flex justify-center';
					wrapper.innerHTML = svg; // Safe: mermaid.render produces sanitized SVG
					pre.replaceWith(wrapper);
				} catch (e) {
					console.error('Mermaid render error:', e);
				}
			}
		}, 100);
	});

	// Clean up the content to ensure tables are parsed correctly
	function cleanMarkdownContent(content: string): string {
		return content
			.replace(/^\s*<p>\s*/gm, '') // Remove opening <p> tags
			.replace(/\s*<\/p>\s*$/gm, '') // Remove closing </p> tags
			.replace(/(\|.*\|)\n\n+(\|)/g, '$1\n$2') // Fix tables with extra line breaks
			.trim();
	}

	const originalCleanContent = $derived(cleanMarkdownContent(data.post.content));
	const originalHtmlContent = $derived(marked(originalCleanContent) as string);

	// Translation state
	let translatedTitle = $state<string | null>(null);
	let translatedHtmlContent = $state<string | null>(null);

	const displayTitle = $derived(translatedTitle ?? data.post.title);
	const htmlContent = $derived(translatedHtmlContent ?? originalHtmlContent);

	function handleTranslate(title: string, content: string): void {
		translatedTitle = title;
		translatedHtmlContent = content;
	}

	function handleShowOriginal(): void {
		translatedTitle = null;
		translatedHtmlContent = null;
	}

	// Extract first 160 characters for meta description
	const metaDescription = $derived(
		data.post.excerpt ||
			originalCleanContent
				.replace(/[#*`\[\]]/g, '')
				.substring(0, 160)
				.trim() + '...'
	);
</script>

<SEO
	title={data.post.title}
	description={metaDescription}
	ogType="article"
	ogImage={`/og?title=${encodeURIComponent(data.post.title)}&subtitle=${encodeURIComponent(data.post.excerpt || '')}&type=blog`}
	publishedTime={data.post.createdAt.toISOString()}
	modifiedTime={data.post.updatedAt.toISOString()}
	author={data.post.authorEmail.split('@')[0]}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.post.title,
		description: metaDescription,
		author: {
			'@type': 'Person',
			name: data.post.authorEmail.split('@')[0]
		},
		datePublished: data.post.createdAt.toISOString(),
		dateModified: data.post.updatedAt.toISOString(),
		publisher: {
			'@type': 'Organization',
			name: 'KooStory',
			logo: {
				'@type': 'ImageObject',
				url: 'https://koostory.net/logo.png'
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://koostory.net/blog/${data.post.slug}`
		}
	}}
/>

<article class="container mx-auto max-w-3xl px-4 py-16">
	<header class="mb-8">
		<h1 class="mb-4 text-4xl font-bold">{displayTitle}</h1>
		<div class="flex flex-wrap items-center gap-4 text-muted-foreground">
			<time datetime={data.post.createdAt.toISOString()}>
				{new Date(data.post.createdAt).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
			{#if data.translateEnabled}
				<TranslateButton
					slug={data.post.slug}
					originalTitle={data.post.title}
					{originalHtmlContent}
					onTranslate={handleTranslate}
					onShowOriginal={handleShowOriginal}
				/>
			{/if}
		</div>
	</header>

	<div
		class="prose prose-lg max-w-none dark:prose-invert [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-300 [&_td]:p-3 dark:[&_td]:border-gray-600 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:p-3 [&_th]:font-bold dark:[&_th]:border-gray-600 dark:[&_th]:bg-gray-800"
	>
		{@html htmlContent}
	</div>
</article>
