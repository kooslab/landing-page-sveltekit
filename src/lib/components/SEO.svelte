<script lang="ts">
	import { page } from '$app/stores';

	interface SEOProps {
		title?: string;
		description?: string;
		keywords?: string;
		canonical?: string;
		ogType?: 'website' | 'article' | 'product';
		ogImage?: string;
		ogImageAlt?: string;
		twitterCard?: 'summary' | 'summary_large_image';
		author?: string;
		publishedTime?: string;
		modifiedTime?: string;
		noindex?: boolean;
		nofollow?: boolean;
		jsonLd?: any;
	}

	let {
		title = 'KoosLab - Your Trusted Software Development Partner',
		description = 'KoosLab specializes in custom software development for small and medium businesses. We solve real business problems with practical, scalable solutions.',
		keywords = 'software development, custom software, business solutions, web development, app development, automation, small business, SMB, outsourcing',
		canonical,
		ogType = 'website',
		ogImage = '/og-image.png',
		ogImageAlt = 'KoosLab - Software Development Agency',
		twitterCard = 'summary_large_image',
		author = 'KoosLab',
		publishedTime,
		modifiedTime,
		noindex = false,
		nofollow = false,
		jsonLd
	}: SEOProps = $props();

	// Generate full title with site name
	$: fullTitle = title.includes('KoosLab') ? title : `${title} | KoosLab`;

	// Use current URL if canonical not provided
	$: canonicalUrl = canonical || $page.url.href;

	// Default JSON-LD for organization with Berlin location
	const defaultJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'KoosLab',
		url: 'https://kooslab.net',
		logo: 'https://kooslab.net/logo.png',
		description:
			'KoosLab is a software development agency specializing in custom solutions for small and medium businesses.',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Berlin',
			addressRegion: 'Berlin',
			addressCountry: 'DE',
			postalCode: '10115'
		},
		areaServed: [
			{
				'@type': 'Country',
				name: 'Germany'
			},
			{
				'@type': 'City',
				name: 'Berlin'
			},
			{
				'@type': 'Country',
				name: 'European Union'
			}
		],
		contactPoint: {
			'@type': 'ContactPoint',
			email: 'contact@kooslab.net',
			contactType: 'customer service',
			availableLanguage: ['English', 'Korean', 'German'],
			areaServed: ['DE', 'EU', 'US', 'KR']
		},
		sameAs: ['https://github.com/kooslab', 'https://www.linkedin.com/company/kooslab']
	};

	// Merge default and custom JSON-LD
	$: structuredData = jsonLd || defaultJsonLd;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content={author} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Robots Meta Tags -->
	{#if noindex || nofollow}
		<meta
			name="robots"
			content="{noindex ? 'noindex' : 'index'},{nofollow ? 'nofollow' : 'follow'}"
		/>
	{:else}
		<meta name="robots" content="index,follow" />
	{/if}

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta
		property="og:image"
		content={ogImage.startsWith('http') ? ogImage : `https://kooslab.net${ogImage}`}
	/>
	<meta property="og:image:alt" content={ogImageAlt} />
	<meta property="og:site_name" content="KoosLab" />
	<meta property="og:locale" content="en_US" />

	<!-- Article specific Open Graph tags -->
	{#if ogType === 'article'}
		{#if author}<meta property="article:author" content={author} />{/if}
		{#if publishedTime}<meta property="article:published_time" content={publishedTime} />{/if}
		{#if modifiedTime}<meta property="article:modified_time" content={modifiedTime} />{/if}
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content={twitterCard} />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta
		name="twitter:image"
		content={ogImage.startsWith('http') ? ogImage : `https://kooslab.net${ogImage}`}
	/>
	<meta name="twitter:image:alt" content={ogImageAlt} />

	<!-- Additional SEO Meta Tags -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="language" content="English" />
	<meta name="revisit-after" content="7 days" />

	<!-- Geo-targeting for Berlin/Germany -->
	<meta name="geo.region" content="DE-BE" />
	<meta name="geo.placename" content="Berlin" />
	<meta name="geo.position" content="52.520008;13.404954" />
	<meta name="ICBM" content="52.520008, 13.404954" />

	<!-- Language and regional targeting -->
	<link rel="alternate" hreflang="en" href={canonicalUrl} />
	<link rel="alternate" hreflang="en-DE" href={canonicalUrl} />
	<link rel="alternate" hreflang="x-default" href={canonicalUrl} />

	<!-- Structured Data / JSON-LD -->
	{#if structuredData}
		{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
	{/if}
</svelte:head>
