<svg
	viewBox="0 0 560 560"
	class="w-full select-none"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
>
	<defs>
		<filter id="aios-glow" x="-60%" y="-60%" width="220%" height="220%">
			<feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
			<feColorMatrix
				in="blur"
				type="matrix"
				values="0.3 0 0.5 0 0.1  0.1 0 0.5 0 0  0.5 0 1 0 0.2  0 0 0 0.5 0"
				result="colorBlur"
			/>
			<feMerge>
				<feMergeNode in="colorBlur" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>

		<!-- Input paths: node right edge (140) → hub left (205) -->
		<path id="aios-pi1" d="M 140,72 C 185,72 197,280 205,280" />
		<path id="aios-pi2" d="M 140,211 C 185,211 197,280 205,280" />
		<path id="aios-pi3" d="M 140,350 C 185,350 197,280 205,280" />
		<path id="aios-pi4" d="M 140,489 C 185,489 197,280 205,280" />

		<!-- Output paths: hub right (355) → node left edge (420) -->
		<path id="aios-po1" d="M 355,280 C 390,280 403,72 420,72" />
		<path id="aios-po2" d="M 355,280 C 390,280 403,211 420,211" />
		<path id="aios-po3" d="M 355,280 C 390,280 403,350 420,350" />
		<path id="aios-po4" d="M 355,280 C 390,280 403,489 420,489" />
	</defs>

	<!-- Connection lines — input side -->
	<use
		href="#aios-pi1"
		fill="none"
		stroke="white"
		stroke-width="1"
		stroke-dasharray="4 10"
		opacity="0.14"
	/>
	<use
		href="#aios-pi2"
		fill="none"
		stroke="white"
		stroke-width="1"
		stroke-dasharray="4 10"
		opacity="0.14"
	/>
	<use
		href="#aios-pi3"
		fill="none"
		stroke="white"
		stroke-width="1"
		stroke-dasharray="4 10"
		opacity="0.14"
	/>
	<use
		href="#aios-pi4"
		fill="none"
		stroke="white"
		stroke-width="1"
		stroke-dasharray="4 10"
		opacity="0.14"
	/>

	<!-- Connection lines — output side -->
	<use
		href="#aios-po1"
		fill="none"
		stroke="#C9B4FA"
		stroke-width="1"
		stroke-dasharray="4 10"
		opacity="0.32"
	/>
	<use
		href="#aios-po2"
		fill="none"
		stroke="#C9B4FA"
		stroke-width="1"
		stroke-dasharray="4 10"
		opacity="0.32"
	/>
	<use
		href="#aios-po3"
		fill="none"
		stroke="#C9B4FA"
		stroke-width="1"
		stroke-dasharray="4 10"
		opacity="0.32"
	/>
	<use
		href="#aios-po4"
		fill="none"
		stroke="#C9B4FA"
		stroke-width="1"
		stroke-dasharray="4 10"
		opacity="0.32"
	/>

	<!-- ── INPUT NODES (130×64, slight rotations, white) ── -->

	<!-- CRM Data (y=40) -->
	<g transform="translate(10,40) rotate(-2,65,32)">
		<rect
			width="130"
			height="64"
			rx="5"
			fill="rgba(255,255,255,0.05)"
			stroke="rgba(255,255,255,0.38)"
			stroke-width="1"
		/>
		<svg
			x="56"
			y="12"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="rgba(255,255,255,0.88)"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
			<path d="M16 3.13a4 4 0 0 1 0 7.75" />
		</svg>
		<text
			x="65"
			y="52"
			font-family="'Geist Variable',sans-serif"
			font-size="12"
			fill="rgba(255,255,255,0.85)"
			text-anchor="middle">CRM Data</text
		>
	</g>

	<!-- Messages (y=179) -->
	<g transform="translate(10,179) rotate(1.5,65,32)">
		<rect
			width="130"
			height="64"
			rx="5"
			fill="rgba(255,255,255,0.05)"
			stroke="rgba(255,255,255,0.38)"
			stroke-width="1"
		/>
		<svg
			x="56"
			y="12"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="rgba(255,255,255,0.88)"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<rect width="20" height="16" x="2" y="4" rx="2" />
			<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		</svg>
		<text
			x="65"
			y="52"
			font-family="'Geist Variable',sans-serif"
			font-size="12"
			fill="rgba(255,255,255,0.85)"
			text-anchor="middle">Messages</text
		>
	</g>

	<!-- Manual Tasks (y=318) -->
	<g transform="translate(10,318) rotate(-1,65,32)">
		<rect
			width="130"
			height="64"
			rx="5"
			fill="rgba(255,255,255,0.05)"
			stroke="rgba(255,255,255,0.38)"
			stroke-width="1"
		/>
		<svg
			x="56"
			y="12"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="rgba(255,255,255,0.88)"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="m3 17 2 2 4-4" />
			<path d="m3 7 2 2 4-4" />
			<path d="M13 6h8" />
			<path d="M13 12h8" />
			<path d="M13 18h8" />
		</svg>
		<text
			x="65"
			y="52"
			font-family="'Geist Variable',sans-serif"
			font-size="12"
			fill="rgba(255,255,255,0.85)"
			text-anchor="middle">Manual Tasks</text
		>
	</g>

	<!-- Knowledge (y=457) -->
	<g transform="translate(10,457) rotate(2,65,32)">
		<rect
			width="130"
			height="64"
			rx="5"
			fill="rgba(255,255,255,0.05)"
			stroke="rgba(255,255,255,0.38)"
			stroke-width="1"
		/>
		<svg
			x="56"
			y="12"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="rgba(255,255,255,0.88)"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
			<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
		</svg>
		<text
			x="65"
			y="52"
			font-family="'Geist Variable',sans-serif"
			font-size="12"
			fill="rgba(255,255,255,0.85)"
			text-anchor="middle">Knowledge</text
		>
	</g>

	<!-- ── HUB (center 280,280, r=75) ── -->
	<circle
		cx="280"
		cy="280"
		r="95"
		fill="none"
		stroke="#C9B4FA"
		stroke-width="1"
		class="pulse-outer"
	/>
	<circle
		cx="280"
		cy="280"
		r="75"
		fill="rgba(201,180,250,0.07)"
		stroke="#C9B4FA"
		stroke-width="1.5"
		filter="url(#aios-glow)"
	/>
	<circle
		cx="280"
		cy="280"
		r="62"
		fill="rgba(201,180,250,0.12)"
		stroke="rgba(201,180,250,0.45)"
		stroke-width="1"
	/>
	<text
		x="280"
		y="273"
		font-family="'Cabinet Grotesk',sans-serif"
		font-size="20"
		font-weight="800"
		fill="#C9B4FA"
		text-anchor="middle"
		letter-spacing="3.5">AI</text
	>
	<text
		x="280"
		y="295"
		font-family="'Cabinet Grotesk',sans-serif"
		font-size="20"
		font-weight="800"
		fill="#C9B4FA"
		text-anchor="middle"
		letter-spacing="3.5">OS</text
	>

	<!-- ── OUTPUT NODES (130×64, no rotation, violet) ── -->

	<!-- Automated (y=40) -->
	<g transform="translate(420,40)">
		<rect
			width="130"
			height="64"
			rx="5"
			fill="rgba(201,180,250,0.1)"
			stroke="rgba(201,180,250,0.45)"
			stroke-width="1"
		/>
		<svg
			x="56"
			y="12"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#C9B4FA"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
		</svg>
		<text
			x="65"
			y="52"
			font-family="'Geist Variable',sans-serif"
			font-size="12"
			fill="rgba(201,180,250,0.95)"
			text-anchor="middle">Automated</text
		>
	</g>

	<!-- Structured (y=179) -->
	<g transform="translate(420,179)">
		<rect
			width="130"
			height="64"
			rx="5"
			fill="rgba(201,180,250,0.1)"
			stroke="rgba(201,180,250,0.45)"
			stroke-width="1"
		/>
		<svg
			x="56"
			y="12"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#C9B4FA"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<rect width="7" height="7" x="3" y="3" rx="1" />
			<rect width="7" height="7" x="14" y="3" rx="1" />
			<rect width="7" height="7" x="14" y="14" rx="1" />
			<rect width="7" height="7" x="3" y="14" rx="1" />
		</svg>
		<text
			x="65"
			y="52"
			font-family="'Geist Variable',sans-serif"
			font-size="12"
			fill="rgba(201,180,250,0.95)"
			text-anchor="middle">Structured</text
		>
	</g>

	<!-- Scalable (y=318) -->
	<g transform="translate(420,318)">
		<rect
			width="130"
			height="64"
			rx="5"
			fill="rgba(201,180,250,0.1)"
			stroke="rgba(201,180,250,0.45)"
			stroke-width="1"
		/>
		<svg
			x="56"
			y="12"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#C9B4FA"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
			<polyline points="16 7 22 7 22 13" />
		</svg>
		<text
			x="65"
			y="52"
			font-family="'Geist Variable',sans-serif"
			font-size="12"
			fill="rgba(201,180,250,0.95)"
			text-anchor="middle">Scalable</text
		>
	</g>

	<!-- 24/7 Active (y=457) -->
	<g transform="translate(420,457)">
		<rect
			width="130"
			height="64"
			rx="5"
			fill="rgba(201,180,250,0.1)"
			stroke="rgba(201,180,250,0.45)"
			stroke-width="1"
		/>
		<svg
			x="56"
			y="12"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#C9B4FA"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<polyline points="12 6 12 12 16 14" />
		</svg>
		<text
			x="65"
			y="52"
			font-family="'Geist Variable',sans-serif"
			font-size="12"
			fill="rgba(201,180,250,0.95)"
			text-anchor="middle">24/7 Active</text
		>
	</g>

	<!-- ── PARTICLES — into hub ── -->
	<circle r="3" fill="#C9B4FA">
		<animateMotion dur="2.4s" repeatCount="indefinite" begin="0s"
			><mpath href="#aios-pi1" /></animateMotion
		>
	</circle>
	<circle r="2.5" fill="#C9B4FA" opacity="0.55">
		<animateMotion dur="2.4s" repeatCount="indefinite" begin="1.2s"
			><mpath href="#aios-pi1" /></animateMotion
		>
	</circle>

	<circle r="3" fill="#C9B4FA">
		<animateMotion dur="2.8s" repeatCount="indefinite" begin="0.5s"
			><mpath href="#aios-pi2" /></animateMotion
		>
	</circle>
	<circle r="2.5" fill="#C9B4FA" opacity="0.55">
		<animateMotion dur="2.8s" repeatCount="indefinite" begin="1.6s"
			><mpath href="#aios-pi2" /></animateMotion
		>
	</circle>

	<circle r="3" fill="#C9B4FA">
		<animateMotion dur="2.6s" repeatCount="indefinite" begin="0.9s"
			><mpath href="#aios-pi3" /></animateMotion
		>
	</circle>
	<circle r="2.5" fill="#C9B4FA" opacity="0.55">
		<animateMotion dur="2.6s" repeatCount="indefinite" begin="1.8s"
			><mpath href="#aios-pi3" /></animateMotion
		>
	</circle>

	<circle r="3" fill="#C9B4FA">
		<animateMotion dur="3.0s" repeatCount="indefinite" begin="0.3s"
			><mpath href="#aios-pi4" /></animateMotion
		>
	</circle>
	<circle r="2.5" fill="#C9B4FA" opacity="0.55">
		<animateMotion dur="3.0s" repeatCount="indefinite" begin="1.5s"
			><mpath href="#aios-pi4" /></animateMotion
		>
	</circle>

	<!-- ── PARTICLES — out of hub ── -->
	<circle r="3.5" fill="white" opacity="0.9">
		<animateMotion dur="2.2s" repeatCount="indefinite" begin="0.7s"
			><mpath href="#aios-po1" /></animateMotion
		>
	</circle>
	<circle r="2.5" fill="white" opacity="0.5">
		<animateMotion dur="2.2s" repeatCount="indefinite" begin="1.7s"
			><mpath href="#aios-po1" /></animateMotion
		>
	</circle>

	<circle r="3.5" fill="white" opacity="0.9">
		<animateMotion dur="2.5s" repeatCount="indefinite" begin="0.1s"
			><mpath href="#aios-po2" /></animateMotion
		>
	</circle>
	<circle r="2.5" fill="white" opacity="0.5">
		<animateMotion dur="2.5s" repeatCount="indefinite" begin="1.3s"
			><mpath href="#aios-po2" /></animateMotion
		>
	</circle>

	<circle r="3.5" fill="white" opacity="0.9">
		<animateMotion dur="2.3s" repeatCount="indefinite" begin="1.0s"
			><mpath href="#aios-po3" /></animateMotion
		>
	</circle>
	<circle r="2.5" fill="white" opacity="0.5">
		<animateMotion dur="2.3s" repeatCount="indefinite" begin="1.9s"
			><mpath href="#aios-po3" /></animateMotion
		>
	</circle>

	<circle r="3.5" fill="white" opacity="0.9">
		<animateMotion dur="2.7s" repeatCount="indefinite" begin="0.4s"
			><mpath href="#aios-po4" /></animateMotion
		>
	</circle>
	<circle r="2.5" fill="white" opacity="0.5">
		<animateMotion dur="2.7s" repeatCount="indefinite" begin="1.5s"
			><mpath href="#aios-po4" /></animateMotion
		>
	</circle>
</svg>

<style>
	.pulse-outer {
		animation: aios-pulse 3.5s ease-in-out infinite;
		transform-origin: 280px 280px;
	}

	@keyframes aios-pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.22;
		}
		50% {
			transform: scale(1.18);
			opacity: 0;
		}
	}
</style>
