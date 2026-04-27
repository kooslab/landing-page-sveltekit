import { ImageResponse } from '@vercel/og';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const title = url.searchParams.get('title') || 'KooStory';
	const subtitle = url.searchParams.get('subtitle') || 'Custom software for growing teams';
	const type = url.searchParams.get('type') || 'default'; // default, blog, agency, spreadsheet

	const accentColor =
		type === 'blog'
			? '#2563eb'
			: type === 'agency'
				? '#059669'
				: type === 'spreadsheet'
					? '#d97706'
					: '#18181b';

	const html = {
		type: 'div',
		props: {
			style: {
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '60px 80px',
				backgroundColor: '#fafafa',
				fontFamily: 'system-ui, -apple-system, sans-serif'
			},
			children: [
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							flexDirection: 'column',
							gap: '20px'
						},
						children: [
							{
								type: 'div',
								props: {
									style: {
										width: '48px',
										height: '6px',
										backgroundColor: accentColor,
										borderRadius: '3px'
									}
								}
							},
							{
								type: 'div',
								props: {
									style: {
										fontSize: title.length > 50 ? '48px' : '56px',
										fontWeight: 700,
										color: '#18181b',
										lineHeight: 1.15,
										letterSpacing: '-0.02em',
										maxWidth: '900px'
									},
									children: title
								}
							},
							{
								type: 'div',
								props: {
									style: {
										fontSize: '24px',
										color: '#71717a',
										lineHeight: 1.4,
										maxWidth: '700px'
									},
									children: subtitle
								}
							}
						]
					}
				},
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between'
						},
						children: [
							{
								type: 'div',
								props: {
									style: {
										display: 'flex',
										alignItems: 'center',
										gap: '12px'
									},
									children: [
										{
											type: 'div',
											props: {
												style: {
													width: '32px',
													height: '32px',
													backgroundColor: '#18181b',
													borderRadius: '6px'
												}
											}
										},
										{
											type: 'div',
											props: {
												style: {
													fontSize: '22px',
													fontWeight: 600,
													color: '#18181b'
												},
												children: 'KooStory'
											}
										}
									]
								}
							},
							{
								type: 'div',
								props: {
									style: {
										fontSize: '18px',
										color: '#a1a1aa'
									},
									children: 'koostory.net'
								}
							}
						]
					}
				}
			]
		}
	};

	return new ImageResponse(html, {
		width: 1200,
		height: 630
	});
};
