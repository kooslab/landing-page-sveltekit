<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';

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
		title = 'KooStory - Your Trusted Software Development Partner',
		description = 'KooStory specializes in custom software development for small and medium businesses. We solve real business problems with practical, scalable solutions.',
		keywords = 'software development Berlin, Softwareentwicklung Berlin, custom software Germany, maßgeschneiderte Software, web development, app development, automation, small business, SMB, KMU, Mittelstand, outsourcing, IT Dienstleister Berlin, Softwareagentur Deutschland',
		canonical,
		ogType = 'website',
		ogImage = '/og-image.png',
		ogImageAlt = 'KooStory - Software Development Agency',
		twitterCard = 'summary_large_image',
		author = 'KooStory',
		publishedTime,
		modifiedTime,
		noindex = false,
		nofollow = false,
		jsonLd
	}: SEOProps = $props();

	// Generate full title with site name
	const fullTitle = $derived(title.includes('KooStory') ? title : `${title} | KooStory`);

	// Use current URL if canonical not provided
	const canonicalUrl = $derived(canonical || $page.url.href);

	// Dynamic locale for Open Graph
	const ogLocale = $derived(() => {
		const lang = $locale || 'en';
		switch (lang) {
			case 'de':
				return 'de_DE';
			case 'ko':
				return 'ko_KR';
			default:
				return 'en_US';
		}
	});

	// Get base URL without language prefix for hreflang
	const baseUrl = $derived(() => {
		const url = canonicalUrl;
		// Remove /ko or /de from the URL to get base
		return url.replace(/\/(ko|de)(\/|$)/, '/');
	});

	// Default JSON-LD for organization with Berlin location (enhanced for Germany/Europe SEO)
	const defaultJsonLd = {
		'@context': 'https://schema.org',
		'@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
		'@id': 'https://koostory.net/#organization',
		name: 'KooStory',
		legalName: 'KooStory',
		url: 'https://koostory.net',
		logo: {
			'@type': 'ImageObject',
			url: 'https://koostory.net/logo.png',
			width: 512,
			height: 512
		},
		image: 'https://koostory.net/og-image.png',
		description:
			'KooStory ist eine Softwareentwicklungsagentur in Berlin, spezialisiert auf maßgeschneiderte Lösungen für kleine und mittlere Unternehmen in Deutschland und Europa.',
		slogan: 'Custom Software Solutions for SMBs',
		foundingDate: '2023',
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Berlin',
			addressLocality: 'Berlin',
			addressRegion: 'Berlin',
			postalCode: '10115',
			addressCountry: 'DE'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 52.520008,
			longitude: 13.404954
		},
		areaServed: [
			{
				'@type': 'Country',
				name: 'Germany',
				'@id': 'https://www.wikidata.org/wiki/Q183'
			},
			{
				'@type': 'City',
				name: 'Berlin',
				'@id': 'https://www.wikidata.org/wiki/Q64'
			},
			{
				'@type': 'Place',
				name: 'European Union'
			},
			{
				'@type': 'Country',
				name: 'Austria'
			},
			{
				'@type': 'Country',
				name: 'Switzerland'
			}
		],
		serviceArea: {
			'@type': 'GeoCircle',
			geoMidpoint: {
				'@type': 'GeoCoordinates',
				latitude: 52.520008,
				longitude: 13.404954
			},
			geoRadius: '2000'
		},
		contactPoint: [
			{
				'@type': 'ContactPoint',
				email: 'contact@koostory.net',
				contactType: 'customer service',
				availableLanguage: ['English', 'German', 'Korean'],
				areaServed: ['DE', 'AT', 'CH', 'EU']
			},
			{
				'@type': 'ContactPoint',
				email: 'contact@koostory.net',
				contactType: 'sales',
				availableLanguage: ['English', 'German'],
				areaServed: ['DE', 'AT', 'CH', 'EU']
			}
		],
		priceRange: '€€',
		currenciesAccepted: 'EUR',
		paymentAccepted: 'Bank Transfer, Credit Card',
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
			opens: '09:00',
			closes: '18:00'
		},
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Software Development Services',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Custom Software Development',
						description: 'Maßgeschneiderte Softwareentwicklung für Ihr Unternehmen'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Web Application Development',
						description: 'Moderne Webanwendungen für kleine und mittlere Unternehmen'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Business Process Automation',
						description: 'Automatisierung von Geschäftsprozessen'
					}
				}
			]
		},
		knowsLanguage: ['de', 'en', 'ko'],
		sameAs: [
			'https://github.com/koostory',
			'https://www.linkedin.com/company/koostory'
		]
	};

	// Merge default and custom JSON-LD
	const structuredData = $derived(jsonLd || defaultJsonLd);
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
		content={ogImage.startsWith('http') ? ogImage : `https://koostory.net${ogImage}`}
	/>
	<meta property="og:image:alt" content={ogImageAlt} />
	<meta property="og:site_name" content="KooStory" />
	<meta property="og:locale" content={ogLocale()} />
	<meta property="og:locale:alternate" content="de_DE" />
	<meta property="og:locale:alternate" content="en_US" />
	<meta property="og:locale:alternate" content="ko_KR" />

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
		content={ogImage.startsWith('http') ? ogImage : `https://koostory.net${ogImage}`}
	/>
	<meta name="twitter:image:alt" content={ogImageAlt} />

	<!-- Additional SEO Meta Tags -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="language" content={$locale === 'de' ? 'German' : $locale === 'ko' ? 'Korean' : 'English'} />
	<meta name="revisit-after" content="7 days" />

	<!-- Geo-targeting for Berlin/Germany -->
	<meta name="geo.region" content="DE-BE" />
	<meta name="geo.placename" content="Berlin" />
	<meta name="geo.position" content="52.520008;13.404954" />
	<meta name="ICBM" content="52.520008, 13.404954" />

	<!-- Language and regional targeting (hreflang for international SEO) -->
	<link rel="alternate" hreflang="en" href={baseUrl()} />
	<link rel="alternate" hreflang="de" href={baseUrl().replace(/\/$/, '') + '/de'} />
	<link rel="alternate" hreflang="de-DE" href={baseUrl().replace(/\/$/, '') + '/de'} />
	<link rel="alternate" hreflang="de-AT" href={baseUrl().replace(/\/$/, '') + '/de'} />
	<link rel="alternate" hreflang="de-CH" href={baseUrl().replace(/\/$/, '') + '/de'} />
	<link rel="alternate" hreflang="ko" href={baseUrl().replace(/\/$/, '') + '/ko'} />
	<link rel="alternate" hreflang="x-default" href={baseUrl()} />

	<!-- Structured Data / JSON-LD -->
	{#if structuredData}
		{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
	{/if}
</svelte:head>
