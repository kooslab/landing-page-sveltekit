<svg
	viewBox="0 0 500 465"
	class="w-full select-none"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
>
	<defs>
		<filter id="pencil-ef" x="-5%" y="-5%" width="110%" height="110%">
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.045 0.04"
				numOctaves="3"
				seed="7"
				result="noise"
			/>
			<feDisplacementMap
				in="SourceGraphic"
				in2="noise"
				scale="3"
				xChannelSelector="R"
				yChannelSelector="G"
			/>
		</filter>
	</defs>

	<!-- Quadrant backgrounds -->
	<rect x="75" y="15" width="195" height="180" fill="rgba(34,197,94,0.1)" />
	<rect x="270" y="15" width="195" height="180" fill="rgba(251,191,36,0.1)" />
	<rect x="75" y="195" width="195" height="180" fill="rgba(255,255,255,0.04)" />
	<rect x="270" y="195" width="195" height="180" fill="rgba(239,68,68,0.09)" />

	<!-- Grid lines (sketch effect) -->
	<g filter="url(#pencil-ef)" fill="none" stroke="rgba(255,255,255,0.18)">
		<rect x="75" y="15" width="390" height="360" stroke-width="2" />
		<line x1="270" y1="15" x2="270" y2="375" stroke-width="1.5" />
		<line x1="75" y1="195" x2="465" y2="195" stroke-width="1.5" />
	</g>

	<!-- Y-axis arrow -->
	<g filter="url(#pencil-ef)" opacity="0.4">
		<line
			x1="47"
			y1="378"
			x2="47"
			y2="18"
			stroke="rgba(255,255,255,0.5)"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
		<polygon points="47,12 44,26 50,26" fill="rgba(255,255,255,0.5)" />
	</g>
	<text
		x="22"
		y="205"
		font-family="'Geist Variable',sans-serif"
		font-size="13"
		font-weight="700"
		fill="rgba(255,255,255,0.75)"
		letter-spacing="2.5"
		text-anchor="middle"
		transform="rotate(-90 22 205)">IMPACT</text
	>
	<text
		x="62"
		y="28"
		font-family="'Geist Variable',sans-serif"
		font-size="12"
		font-weight="600"
		fill="rgba(255,255,255,0.45)"
		text-anchor="end">High</text
	>
	<text
		x="62"
		y="380"
		font-family="'Geist Variable',sans-serif"
		font-size="12"
		font-weight="600"
		fill="rgba(255,255,255,0.45)"
		text-anchor="end">Low</text
	>

	<!-- X-axis arrow -->
	<g filter="url(#pencil-ef)" opacity="0.4">
		<line
			x1="72"
			y1="412"
			x2="468"
			y2="412"
			stroke="rgba(255,255,255,0.5)"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
		<polygon points="474,412 460,409 460,415" fill="rgba(255,255,255,0.5)" />
	</g>
	<text
		x="270"
		y="455"
		font-family="'Geist Variable',sans-serif"
		font-size="13"
		font-weight="700"
		fill="rgba(255,255,255,0.75)"
		letter-spacing="2.5"
		text-anchor="middle">EFFORT</text
	>
	<text
		x="82"
		y="402"
		font-family="'Geist Variable',sans-serif"
		font-size="12"
		font-weight="600"
		fill="rgba(255,255,255,0.45)">Low</text
	>
	<text
		x="458"
		y="402"
		font-family="'Geist Variable',sans-serif"
		font-size="12"
		font-weight="600"
		fill="rgba(255,255,255,0.45)"
		text-anchor="end">High</text
	>

	<!-- ── Quick Wins (top-left, center 172,105) ── -->
	<text
		x="172"
		y="68"
		font-family="'Cabinet Grotesk',sans-serif"
		font-size="18"
		font-weight="800"
		fill="#4ade80"
		text-anchor="middle">Quick Wins</text
	>
	<text
		x="172"
		y="86"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(74,222,128,0.6)"
		text-anchor="middle">Start here</text
	>
	<text
		x="172"
		y="118"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(255,255,255,0.5)"
		text-anchor="middle">Email reply drafts</text
	>
	<text
		x="172"
		y="135"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(255,255,255,0.5)"
		text-anchor="middle">Meeting notes → tasks</text
	>
	<text
		x="172"
		y="152"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(255,255,255,0.5)"
		text-anchor="middle">Weekly report generation</text
	>
	<text
		x="172"
		y="169"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(255,255,255,0.5)"
		text-anchor="middle">Lead enrichment</text
	>

	<!-- ── Worth It (top-right, center 367,105) ── -->
	<text
		x="367"
		y="68"
		font-family="'Cabinet Grotesk',sans-serif"
		font-size="18"
		font-weight="800"
		fill="#fbbf24"
		text-anchor="middle">Worth It</text
	>
	<text
		x="367"
		y="86"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(251,191,36,0.6)"
		text-anchor="middle">High effort, high return</text
	>
	<text
		x="367"
		y="118"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(255,255,255,0.5)"
		text-anchor="middle">Full CRM pipeline</text
	>
	<text
		x="367"
		y="135"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(255,255,255,0.5)"
		text-anchor="middle">AI support inbox</text
	>
	<text
		x="367"
		y="152"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(255,255,255,0.5)"
		text-anchor="middle">Onboarding automation</text
	>

	<!-- ── Nice to Have (bottom-left, center 172,285) ── -->
	<text
		x="172"
		y="258"
		font-family="'Cabinet Grotesk',sans-serif"
		font-size="17"
		font-weight="800"
		fill="rgba(255,255,255,0.4)"
		text-anchor="middle">Nice to Have</text
	>
	<text
		x="172"
		y="275"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(255,255,255,0.28)"
		text-anchor="middle">Easy but low impact</text
	>
	<text
		x="172"
		y="308"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(255,255,255,0.28)"
		text-anchor="middle">Notification formatting</text
	>
	<text
		x="172"
		y="325"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(255,255,255,0.28)"
		text-anchor="middle">Minor data cleanups</text
	>

	<!-- ── The Trap (bottom-right, center 367,285) ── -->
	<text
		x="367"
		y="252"
		font-family="'Cabinet Grotesk',sans-serif"
		font-size="20"
		font-weight="800"
		fill="#f87171"
		text-anchor="middle">The Trap</text
	>
	<text
		x="367"
		y="271"
		font-family="'Geist Variable',sans-serif"
		font-size="13"
		font-weight="600"
		fill="rgba(248,113,113,0.7)"
		text-anchor="middle">Hard. Low impact.</text
	>
	<text
		x="367"
		y="289"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(248,113,113,0.5)"
		text-anchor="middle">Where most projects land.</text
	>
	<text
		x="367"
		y="320"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(255,255,255,0.28)"
		text-anchor="middle">Legacy system migration</text
	>
	<text
		x="367"
		y="337"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(255,255,255,0.28)"
		text-anchor="middle">Custom platform builds</text
	>
	<text
		x="367"
		y="354"
		font-family="'Geist Variable',sans-serif"
		font-size="11"
		fill="rgba(255,255,255,0.28)"
		text-anchor="middle">Rebuilding what already works</text
	>
</svg>
