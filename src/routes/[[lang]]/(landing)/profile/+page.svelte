<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight } from 'lucide-svelte';

	let lang = $derived($page.params?.lang || 'en');
	let langPrefix = $derived(lang === 'en' ? '' : `/${lang}`);
</script>

<SEO
	title={$_('profile.seo.title')}
	description={$_('profile.seo.description')}
	ogImage="/og-image-landing.png"
/>

<main class="w-full">
	<!-- ═══════════════════════════════════════════════ -->
	<!-- HERO                                            -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-4 pb-16 pt-24 md:pb-24 md:pt-32">
		<div class="mx-auto max-w-3xl">
			<p class="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
				{$_('profile.badge')}
			</p>
			<h1
				class="text-3xl font-bold leading-[1.3] tracking-tight md:text-4xl md:leading-[1.25] lg:text-5xl lg:leading-[1.2]"
			>
				{$_('profile.hero.title')}
			</h1>
			<p class="mt-8 text-lg leading-relaxed text-muted-foreground">
				{@html $_('profile.hero.subtitle')}
			</p>
			<a
				href="https://www.linkedin.com/in/ilmo-koo-11173099/"
				target="_blank"
				rel="noopener noreferrer"
				class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
			>
				<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"
					><path
						d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
					/></svg
				>
				LinkedIn
			</a>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- REAL PROBLEMS I'VE SOLVED                       -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="border-t border-border px-4 py-20 md:py-28">
		<div class="mx-auto max-w-3xl">
			<p class="mb-4 font-mono text-sm text-muted-foreground">01</p>
			<h2 class="mb-4 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
				{$_('profile.cases.title')}
			</h2>
			<p class="mb-12 text-[17px] leading-[1.8] text-foreground/70">
				{$_('profile.cases.intro')}
			</p>

			<!-- Group A: Requirements Consulting -->
			<div class="mb-16">
				<h3 class="mb-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
					{$_('profile.cases.groupA.title')}
				</h3>
				<p class="mb-10 text-[15px] leading-relaxed text-foreground/60">
					{$_('profile.cases.groupA.intro')}
				</p>

				<div class="space-y-10">
					<!-- Case 1: SafetyOn Solutions -->
					<div class="border-l-2 border-border pl-6 transition-colors hover:border-primary/50">
						<p class="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
							{$_('profile.cases.safety.client')} — {$_('profile.cases.safety.label')}
						</p>
						<p class="mb-2 text-xs text-muted-foreground/70">
							{$_('profile.cases.safety.industry')}
						</p>
						<h4 class="mb-3 text-lg font-semibold">{$_('profile.cases.safety.pain')}</h4>

						<!-- Diagram: Idea → Requirements Doc → Dev Agency -->
						<div class="my-6 rounded-lg border border-border bg-muted/30 p-5">
							<div class="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-3">
								<div class="flex flex-col items-center gap-1.5 text-center">
									<div
										class="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 bg-background"
									>
										<svg
											class="h-6 w-6 text-muted-foreground/50"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="1.5"
											><path
												d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
											/></svg
										>
									</div>
									<span class="text-[11px] font-medium text-muted-foreground">Idea in head</span>
								</div>
								<svg class="h-8 w-4 text-primary/40 md:hidden" viewBox="0 0 16 32"
									><path
										d="M8 0v24m0 0l-6-6m6 6l6-6"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
								<svg
									class="hidden h-4 w-8 flex-shrink-0 text-primary/40 md:block"
									viewBox="0 0 32 16"
									><path
										d="M0 8h24m0 0l-6-6m6 6l-6 6"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
								<div class="flex flex-col items-center gap-1.5 text-center">
									<div
										class="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-primary/40 bg-primary/5"
									>
										<svg
											class="h-6 w-6 text-primary"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="1.5"
											><path
												d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
											/></svg
										>
									</div>
									<span class="text-[11px] font-semibold text-primary"
										>Requirements<br />Document</span
									>
								</div>
								<svg class="h-8 w-4 text-primary/40 md:hidden" viewBox="0 0 16 32"
									><path
										d="M8 0v24m0 0l-6-6m6 6l6-6"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
								<svg
									class="hidden h-4 w-8 flex-shrink-0 text-primary/40 md:block"
									viewBox="0 0 32 16"
									><path
										d="M0 8h24m0 0l-6-6m6 6l-6 6"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
								<div class="flex flex-col items-center gap-1.5 text-center">
									<div
										class="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-foreground/20 bg-background"
									>
										<svg
											class="h-6 w-6 text-foreground/60"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="1.5"
											><path
												d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
											/></svg
										>
									</div>
									<span class="text-[11px] font-medium text-muted-foreground"
										>Dev agency<br />builds it</span
									>
								</div>
							</div>
						</div>

						<p class="mb-2 text-[15px] leading-relaxed text-foreground/70">
							{$_('profile.cases.safety.did')}
						</p>
						<p class="text-[15px] font-medium leading-relaxed text-foreground/90">
							{@html $_('profile.cases.safety.result')}
						</p>
					</div>

					<!-- Case 2: Onui -->
					<div class="border-l-2 border-border pl-6 transition-colors hover:border-primary/50">
						<p class="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
							{$_('profile.cases.onui.client')} — {$_('profile.cases.onui.label')}
						</p>
						<p class="mb-2 text-xs text-muted-foreground/70">{$_('profile.cases.onui.industry')}</p>
						<h4 class="mb-3 text-lg font-semibold">{$_('profile.cases.onui.pain')}</h4>

						<!-- Diagram: Failed attempts → Clear requirements → Successful outsource -->
						<div class="my-6 rounded-lg border border-border bg-muted/30 p-5">
							<div class="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-3">
								<div class="flex flex-col items-center gap-1.5 text-center">
									<div
										class="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-destructive/30 bg-background dark:border-yellow-500/30"
									>
										<svg
											class="h-6 w-6 text-destructive/40 dark:text-yellow-400/60"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="1.5"><path d="M6 18L18 6M6 6l12 12" /></svg
										>
									</div>
									<span class="text-[11px] font-medium text-muted-foreground"
										>Failed<br />attempts</span
									>
								</div>
								<svg class="h-8 w-4 text-primary/40 md:hidden" viewBox="0 0 16 32"
									><path
										d="M8 0v24m0 0l-6-6m6 6l6-6"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
								<svg
									class="hidden h-4 w-8 flex-shrink-0 text-primary/40 md:block"
									viewBox="0 0 32 16"
									><path
										d="M0 8h24m0 0l-6-6m6 6l-6 6"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
								<div class="flex flex-col items-center gap-1.5 text-center">
									<div
										class="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-primary/40 bg-primary/5"
									>
										<svg
											class="h-6 w-6 text-primary"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="1.5"
											><path
												d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
											/></svg
										>
									</div>
									<span class="text-[11px] font-semibold text-primary"
										>Clear CRM<br />requirements</span
									>
								</div>
								<svg class="h-8 w-4 text-primary/40 md:hidden" viewBox="0 0 16 32"
									><path
										d="M8 0v24m0 0l-6-6m6 6l6-6"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
								<svg
									class="hidden h-4 w-8 flex-shrink-0 text-primary/40 md:block"
									viewBox="0 0 32 16"
									><path
										d="M0 8h24m0 0l-6-6m6 6l-6 6"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
								<div class="flex flex-col items-center gap-1.5 text-center">
									<div
										class="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-foreground/20 bg-background"
									>
										<svg
											class="h-6 w-6 text-foreground/60"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="1.5"
											><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg
										>
									</div>
									<span class="text-[11px] font-medium text-muted-foreground"
										>Successful<br />outsource</span
									>
								</div>
							</div>
						</div>

						<p class="mb-2 text-[15px] leading-relaxed text-foreground/70">
							{$_('profile.cases.onui.did')}
						</p>
						<p class="text-[15px] font-medium leading-relaxed text-foreground/90">
							{@html $_('profile.cases.onui.result')}
						</p>
					</div>

					<!-- Case 3: MindLogic -->
					<div class="border-l-2 border-border pl-6 transition-colors hover:border-primary/50">
						<p class="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
							{$_('profile.cases.mindlogic.client')} — {$_('profile.cases.mindlogic.label')}
						</p>
						<p class="mb-2 text-xs text-muted-foreground/70">
							{$_('profile.cases.mindlogic.industry')}
						</p>
						<h4 class="mb-3 text-lg font-semibold">{$_('profile.cases.mindlogic.pain')}</h4>

						<!-- Diagram: Before (chaotic emails) → After (structured questionnaire) -->
						<div class="my-6 rounded-lg border border-border bg-muted/30 p-5">
							<div class="flex flex-col gap-4 md:flex-row md:items-start md:gap-5">
								<!-- Before: Chaotic emails -->
								<div class="flex flex-col items-center gap-2 md:flex-1">
									<div
										class="w-full max-w-[200px] rounded-lg border-2 border-dashed border-destructive/25 bg-background p-3 dark:border-yellow-500/25"
									>
										<div class="mb-2 flex items-center gap-1.5">
											<span
												class="text-[10px] font-bold uppercase tracking-wide text-destructive/50 dark:text-yellow-400/70"
												>Before</span
											>
										</div>
										<div class="space-y-1.5">
											<!-- Messy email threads -->
											<div class="rounded bg-destructive/5 px-2 py-1 dark:bg-yellow-500/10">
												<div
													class="text-[8px] font-medium text-destructive/40 dark:text-yellow-400/60"
												>
													University A
												</div>
												<div class="text-[9px] text-foreground/50">
													"What auth protocol do you use?"
												</div>
											</div>
											<div class="rounded bg-destructive/5 px-2 py-1 dark:bg-yellow-500/10">
												<div
													class="text-[8px] font-medium text-destructive/40 dark:text-yellow-400/60"
												>
													Re: Re: Re: SSO
												</div>
												<div class="text-[9px] text-foreground/50">"See attached PDF..."</div>
											</div>
											<div class="rounded bg-destructive/5 px-2 py-1 dark:bg-yellow-500/10">
												<div
													class="text-[8px] font-medium text-destructive/40 dark:text-yellow-400/60"
												>
													University B
												</div>
												<div class="text-[9px] text-foreground/50">"We use a different system"</div>
											</div>
											<div class="rounded bg-destructive/5 px-2 py-1 dark:bg-yellow-500/10">
												<div
													class="text-[8px] font-medium text-destructive/40 dark:text-yellow-400/60"
												>
													Fwd: login specs??
												</div>
												<div class="text-[9px] text-foreground/50">"Ask IT dept, not sure"</div>
											</div>
										</div>
										<div class="mt-2 flex items-center gap-1">
											<svg
												class="h-3 w-3 text-destructive/40 dark:text-yellow-400/60"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
												><path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg
											>
											<span class="text-[9px] text-destructive/50 dark:text-yellow-400/70"
												>Weeks of back-and-forth per university</span
											>
										</div>
									</div>
									<span class="text-[11px] font-medium text-muted-foreground"
										>Scattered emails, no structure</span
									>
								</div>

								<!-- Arrow -->
								<div class="flex items-center justify-center md:pt-12">
									<svg class="h-8 w-4 text-primary/40 md:hidden" viewBox="0 0 16 32"
										><path
											d="M8 0v24m0 0l-6-6m6 6l6-6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
									<svg
										class="hidden h-4 w-8 flex-shrink-0 text-primary/40 md:block"
										viewBox="0 0 32 16"
										><path
											d="M0 8h24m0 0l-6-6m6 6l-6 6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
								</div>

								<!-- After: Structured questionnaire -->
								<div class="flex flex-col items-center gap-2 md:flex-1">
									<div
										class="w-full max-w-[200px] rounded-lg border-2 border-primary/40 bg-primary/5 p-3"
									>
										<div class="mb-2 flex items-center gap-1.5">
											<span class="text-[10px] font-bold uppercase tracking-wide text-primary"
												>After</span
											>
										</div>
										<div class="space-y-1.5">
											<div class="rounded border border-primary/20 bg-background px-2 py-1">
												<div class="text-[8px] font-medium text-primary/60">Q1. Auth protocol</div>
												<div class="flex items-center gap-1">
													<svg
														class="h-2.5 w-2.5 text-primary"
														viewBox="0 0 20 20"
														fill="currentColor"
														><path
															fill-rule="evenodd"
															d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
															clip-rule="evenodd"
														/></svg
													>
													<span class="text-[9px] text-foreground/60">SAML 2.0</span>
												</div>
											</div>
											<div class="rounded border border-primary/20 bg-background px-2 py-1">
												<div class="text-[8px] font-medium text-primary/60">Q2. User ID format</div>
												<div class="flex items-center gap-1">
													<svg
														class="h-2.5 w-2.5 text-primary"
														viewBox="0 0 20 20"
														fill="currentColor"
														><path
															fill-rule="evenodd"
															d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
															clip-rule="evenodd"
														/></svg
													>
													<span class="text-[9px] text-foreground/60">student@uni.edu</span>
												</div>
											</div>
											<div class="rounded border border-primary/20 bg-background px-2 py-1">
												<div class="text-[8px] font-medium text-primary/60">Q3. IT contact</div>
												<div class="flex items-center gap-1">
													<svg
														class="h-2.5 w-2.5 text-primary"
														viewBox="0 0 20 20"
														fill="currentColor"
														><path
															fill-rule="evenodd"
															d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
															clip-rule="evenodd"
														/></svg
													>
													<span class="text-[9px] text-foreground/60">it@uni-a.edu</span>
												</div>
											</div>
											<div class="rounded border border-primary/20 bg-background px-2 py-1">
												<div class="text-[8px] font-medium text-primary/60">Q4. Redirect URL</div>
												<div class="flex items-center gap-1">
													<svg
														class="h-2.5 w-2.5 text-primary"
														viewBox="0 0 20 20"
														fill="currentColor"
														><path
															fill-rule="evenodd"
															d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
															clip-rule="evenodd"
														/></svg
													>
													<span class="text-[9px] text-foreground/60">sso.uni-a.edu/cb</span>
												</div>
											</div>
										</div>
										<div class="mt-2 flex items-center gap-1">
											<span class="text-lg font-bold text-primary">50%</span>
											<span class="text-[9px] font-medium text-primary/70"
												>faster — straight to implementation</span
											>
										</div>
									</div>
									<span class="text-[11px] font-semibold text-primary"
										>1 questionnaire, all answers, done</span
									>
								</div>
							</div>
						</div>

						<p class="mb-2 text-[15px] leading-relaxed text-foreground/70">
							{$_('profile.cases.mindlogic.did')}
						</p>
						<p class="text-[15px] font-medium leading-relaxed text-foreground/90">
							{@html $_('profile.cases.mindlogic.result')}
						</p>
					</div>
				</div>
			</div>

			<!-- Group B: Built It -->
			<div>
				<h3 class="mb-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
					{$_('profile.cases.groupB.title')}
				</h3>
				<p class="mb-10 text-[15px] leading-relaxed text-foreground/60">
					{$_('profile.cases.groupB.intro')}
				</p>

				<div class="space-y-10">
					<!-- Case 4: Finnest.ai -->
					<div class="border-l-2 border-border pl-6 transition-colors hover:border-primary/50">
						<p class="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
							{$_('profile.cases.finnest.client')} — {$_('profile.cases.finnest.label')}
						</p>
						<p class="mb-2 text-xs text-muted-foreground/70">
							{$_('profile.cases.finnest.industry')}
						</p>
						<h4 class="mb-3 text-lg font-semibold">{$_('profile.cases.finnest.pain')}</h4>

						<!-- Diagram: Bank/Card → Auto extract 24h → Live spreadsheet -->
						<div class="my-6 rounded-lg border border-border bg-muted/30 p-5">
							<div class="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-3">
								<div class="flex flex-col items-center gap-1.5 text-center">
									<div class="flex flex-col gap-1">
										<div
											class="flex h-7 w-16 items-center justify-center rounded border border-dashed border-muted-foreground/30 bg-background text-[9px] font-medium text-muted-foreground"
										>
											Bank
										</div>
										<div
											class="flex h-7 w-16 items-center justify-center rounded border border-dashed border-muted-foreground/30 bg-background text-[9px] font-medium text-muted-foreground"
										>
											Card co.
										</div>
									</div>
									<span class="text-[11px] font-medium text-muted-foreground"
										>Manual<br />download</span
									>
								</div>
								<svg class="h-8 w-4 text-primary/40 md:hidden" viewBox="0 0 16 32"
									><path
										d="M8 0v24m0 0l-6-6m6 6l6-6"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
								<svg
									class="hidden h-4 w-8 flex-shrink-0 text-primary/40 md:block"
									viewBox="0 0 32 16"
									><path
										d="M0 8h24m0 0l-6-6m6 6l-6 6"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
								<div class="flex flex-col items-center gap-1.5 text-center">
									<div
										class="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-primary/40 bg-primary/5"
									>
										<svg
											class="h-6 w-6 text-primary"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="1.5"
											><path
												d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
											/></svg
										>
									</div>
									<span class="text-[11px] font-semibold text-primary"
										>Auto extract<br />every 24h</span
									>
								</div>
								<svg class="h-8 w-4 text-primary/40 md:hidden" viewBox="0 0 16 32"
									><path
										d="M8 0v24m0 0l-6-6m6 6l6-6"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
								<svg
									class="hidden h-4 w-8 flex-shrink-0 text-primary/40 md:block"
									viewBox="0 0 32 16"
									><path
										d="M0 8h24m0 0l-6-6m6 6l-6 6"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
								<div class="flex flex-col items-center gap-1.5 text-center">
									<div
										class="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-foreground/20 bg-background"
									>
										<svg
											class="h-6 w-6 text-foreground/60"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="1.5"
											><path
												d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v.375"
											/></svg
										>
									</div>
									<span class="text-[11px] font-medium text-muted-foreground"
										>Live<br />spreadsheet</span
									>
								</div>
							</div>
						</div>

						<p class="mb-2 text-[15px] leading-relaxed text-foreground/70">
							{$_('profile.cases.finnest.did')}
						</p>
						<p class="text-[15px] font-medium leading-relaxed text-foreground/90">
							{@html $_('profile.cases.finnest.result')}
						</p>
					</div>

					<!-- Case 5: MY WORKSPACE -->
					<div class="border-l-2 border-border pl-6 transition-colors hover:border-primary/50">
						<p class="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
							{$_('profile.cases.workspace.client')} — {$_('profile.cases.workspace.label')}
						</p>
						<p class="mb-2 text-xs text-muted-foreground/70">
							{$_('profile.cases.workspace.industry')}
						</p>
						<h4 class="mb-3 text-lg font-semibold">{$_('profile.cases.workspace.pain')}</h4>

						<!-- Diagram: Before (manual) vs After (automated) -->
						<div class="my-6 rounded-lg border border-border bg-muted/30 p-5">
							<div
								class="flex flex-col items-center gap-4 md:flex-row md:items-stretch md:justify-center md:gap-6"
							>
								<div
									class="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-destructive/20 bg-background p-4 text-center dark:border-yellow-500/20 md:flex-1"
								>
									<span
										class="text-[10px] font-bold uppercase tracking-wide text-destructive/50 dark:text-yellow-400/70"
										>Before</span
									>
									<div class="space-y-1.5">
										<div class="flex items-center gap-1.5 text-[10px] text-muted-foreground">
											<span class="text-xs">📋</span> Manual contracts
										</div>
										<div class="flex items-center gap-1.5 text-[10px] text-muted-foreground">
											<span class="text-xs">💳</span> Manual payments
										</div>
										<div class="flex items-center gap-1.5 text-[10px] text-muted-foreground">
											<span class="text-xs">📊</span> Spreadsheet tracking
										</div>
									</div>
								</div>
								<div class="flex items-center">
									<svg class="h-8 w-4 text-primary/40 md:hidden" viewBox="0 0 16 32"
										><path
											d="M8 0v24m0 0l-6-6m6 6l6-6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
									<svg
										class="hidden h-4 w-8 flex-shrink-0 text-primary/40 md:block"
										viewBox="0 0 32 16"
										><path
											d="M0 8h24m0 0l-6-6m6 6l-6 6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
								</div>
								<div
									class="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-primary/30 bg-primary/5 p-4 text-center md:flex-1"
								>
									<span class="text-[10px] font-bold uppercase tracking-wide text-primary"
										>After</span
									>
									<div class="space-y-1.5">
										<div class="flex items-center gap-1.5 text-[10px] text-foreground/70">
											<span class="text-xs">✅</span> Auto contracts
										</div>
										<div class="flex items-center gap-1.5 text-[10px] text-foreground/70">
											<span class="text-xs">✅</span> E-signature
										</div>
										<div class="flex items-center gap-1.5 text-[10px] text-foreground/70">
											<span class="text-xs">✅</span> Auto billing
										</div>
										<div class="flex items-center gap-1.5 text-[10px] text-foreground/70">
											<span class="text-xs">✅</span> Auto payments
										</div>
									</div>
									<span class="mt-1 text-lg font-bold text-primary">90%</span>
									<span class="text-[10px] font-medium text-primary/70">less manual work</span>
								</div>
							</div>
						</div>

						<p class="mb-2 text-[15px] leading-relaxed text-foreground/70">
							{$_('profile.cases.workspace.did')}
						</p>
						<p class="text-[15px] font-medium leading-relaxed text-foreground/90">
							{@html $_('profile.cases.workspace.result')}
						</p>
					</div>

					<!-- Case 6: Grocery Delivery Kiosk -->
					<div class="border-l-2 border-border pl-6 transition-colors hover:border-primary/50">
						<p class="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
							{$_('profile.cases.grocery.client')} — {$_('profile.cases.grocery.label')}
						</p>
						<p class="mb-2 text-xs text-muted-foreground/70">
							{$_('profile.cases.grocery.industry')}
						</p>
						<h4 class="mb-3 text-lg font-semibold">{$_('profile.cases.grocery.pain')}</h4>

						<!-- Diagram: Handwriting 60-100s vs Kiosk 10s -->
						<div class="my-6 rounded-lg border border-border bg-muted/30 p-5">
							<div
								class="flex flex-col items-center gap-4 md:flex-row md:items-stretch md:justify-center md:gap-6"
							>
								<div
									class="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-destructive/20 bg-background p-4 text-center dark:border-yellow-500/20 md:flex-1"
								>
									<span
										class="text-[10px] font-bold uppercase tracking-wide text-destructive/50 dark:text-yellow-400/70"
										>Before</span
									>
									<svg
										class="h-8 w-8 text-muted-foreground/40"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="1.5"
										><path
											d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"
										/></svg
									>
									<span class="text-[10px] text-muted-foreground">Handwrite address</span>
									<span class="text-lg font-bold text-destructive/60 dark:text-yellow-400/80"
										>60-100s</span
									>
									<span class="text-[10px] text-muted-foreground">+ 1 staff needed</span>
								</div>
								<div class="flex items-center">
									<svg class="h-8 w-4 text-primary/40 md:hidden" viewBox="0 0 16 32"
										><path
											d="M8 0v24m0 0l-6-6m6 6l6-6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
									<svg
										class="hidden h-4 w-8 flex-shrink-0 text-primary/40 md:block"
										viewBox="0 0 32 16"
										><path
											d="M0 8h24m0 0l-6-6m6 6l-6 6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
								</div>
								<div
									class="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-primary/30 bg-primary/5 p-4 text-center md:flex-1"
								>
									<span class="text-[10px] font-bold uppercase tracking-wide text-primary"
										>After</span
									>
									<svg
										class="h-8 w-8 text-primary"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="1.5"
										><path
											d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
										/></svg
									>
									<span class="text-[10px] text-foreground/70">Touch kiosk</span>
									<span class="text-lg font-bold text-primary">10s</span>
									<span class="text-[10px] text-foreground/70">Self-serve</span>
								</div>
							</div>
						</div>

						<p class="mb-2 text-[15px] leading-relaxed text-foreground/70">
							{$_('profile.cases.grocery.did')}
						</p>
						<p class="text-[15px] font-medium leading-relaxed text-foreground/90">
							{@html $_('profile.cases.grocery.result')}
						</p>
					</div>

					<!-- Case 7: Private Tour Platform -->
					<div class="border-l-2 border-border pl-6 transition-colors hover:border-primary/50">
						<p class="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
							{$_('profile.cases.tour.client')} — {$_('profile.cases.tour.label')}
						</p>
						<p class="mb-2 text-xs text-muted-foreground/70">{$_('profile.cases.tour.industry')}</p>
						<h4 class="mb-3 text-lg font-semibold">{$_('profile.cases.tour.pain')}</h4>

						<!-- Diagram: Platform connecting guide and traveler -->
						<div class="my-6 rounded-lg border border-border bg-muted/30 p-5">
							<div class="flex flex-col gap-4 md:flex-row md:items-start md:gap-5">
								<!-- Tour Guide side -->
								<div class="flex flex-col items-center gap-2 md:flex-1">
									<div
										class="w-full max-w-[160px] rounded-lg border-2 border-foreground/20 bg-background p-3"
									>
										<div class="mb-2 flex items-center gap-1.5">
											<svg
												class="h-4 w-4 text-foreground/50"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="1.5"
												><path
													d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
												/></svg
											>
											<span class="text-[10px] font-bold uppercase tracking-wide text-foreground/50"
												>Tour Guide</span
											>
										</div>
										<div class="space-y-1.5">
											<div class="rounded bg-muted/50 px-2 py-1 text-[9px] text-foreground/60">
												+ Upload tour
											</div>
											<div class="rounded bg-muted/50 px-2 py-1 text-[9px] text-foreground/60">
												Set price & schedule
											</div>
											<div class="rounded bg-muted/50 px-2 py-1 text-[9px] text-foreground/60">
												Add photos & details
											</div>
										</div>
									</div>
									<span class="text-[11px] font-medium text-muted-foreground"
										>Guide uploads tours</span
									>
								</div>

								<!-- Arrows pointing into platform -->
								<div class="flex items-center justify-center md:pt-8">
									<svg class="h-8 w-4 text-primary/40 md:hidden" viewBox="0 0 16 32"
										><path
											d="M8 0v24m0 0l-6-6m6 6l6-6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
									<svg
										class="hidden h-4 w-8 flex-shrink-0 text-primary/40 md:block"
										viewBox="0 0 32 16"
										><path
											d="M0 8h24m0 0l-6-6m6 6l-6 6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
								</div>

								<!-- Platform in the middle -->
								<div class="flex flex-col items-center gap-2 md:flex-1">
									<div
										class="w-full max-w-[180px] rounded-lg border-2 border-primary/40 bg-primary/5 p-3"
									>
										<div class="mb-2 flex items-center justify-center gap-1.5">
											<svg
												class="h-3.5 w-3.5 text-primary"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
												><path
													d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3"
												/></svg
											>
											<span class="text-[10px] font-bold uppercase tracking-wide text-primary"
												>Platform</span
											>
										</div>
										<!-- Tour listing mockup -->
										<div class="space-y-1.5">
											<div class="rounded border border-primary/20 bg-background px-2 py-1.5">
												<div class="text-[9px] font-semibold text-foreground/70">
													Berlin City Tour
												</div>
												<div class="flex items-center justify-between">
													<span class="text-[8px] text-muted-foreground">3h, Private</span>
													<span class="text-[9px] font-bold text-primary">89 EUR</span>
												</div>
											</div>
											<div class="rounded border border-primary/20 bg-background px-2 py-1.5">
												<div class="text-[9px] font-semibold text-foreground/70">
													Food & Market Tour
												</div>
												<div class="flex items-center justify-between">
													<span class="text-[8px] text-muted-foreground">4h, Group</span>
													<span class="text-[9px] font-bold text-primary">65 EUR</span>
												</div>
											</div>
										</div>
										<!-- Action buttons -->
										<div class="mt-2 flex gap-1">
											<div
												class="flex-1 rounded bg-primary/20 py-0.5 text-center text-[8px] font-semibold text-primary"
											>
												Book
											</div>
											<div
												class="flex-1 rounded bg-primary/10 py-0.5 text-center text-[8px] font-medium text-primary/70"
											>
												Pay
											</div>
										</div>
									</div>
									<span class="text-[11px] font-semibold text-primary"
										>Browse, book & pay online</span
									>
								</div>

								<!-- Arrow out of platform -->
								<div class="flex items-center justify-center md:pt-8">
									<svg class="h-8 w-4 text-primary/40 md:hidden" viewBox="0 0 16 32"
										><path
											d="M8 0v24m0 0l-6-6m6 6l6-6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
									<svg
										class="hidden h-4 w-8 flex-shrink-0 text-primary/40 md:block"
										viewBox="0 0 32 16"
										><path
											d="M0 8h24m0 0l-6-6m6 6l-6 6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
								</div>

								<!-- Traveler side -->
								<div class="flex flex-col items-center gap-2 md:flex-1">
									<div
										class="w-full max-w-[160px] rounded-lg border-2 border-foreground/20 bg-background p-3"
									>
										<div class="mb-2 flex items-center gap-1.5">
											<svg
												class="h-4 w-4 text-foreground/50"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="1.5"
												><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path
													d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
												/></svg
											>
											<span class="text-[10px] font-bold uppercase tracking-wide text-foreground/50"
												>Traveler</span
											>
										</div>
										<div class="space-y-1.5">
											<div class="flex items-center gap-1 rounded bg-muted/50 px-2 py-1">
												<svg
													class="h-2.5 w-2.5 text-primary"
													viewBox="0 0 20 20"
													fill="currentColor"
													><path
														fill-rule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clip-rule="evenodd"
													/></svg
												>
												<span class="text-[9px] text-foreground/60">Booking confirmed</span>
											</div>
											<div class="flex items-center gap-1 rounded bg-muted/50 px-2 py-1">
												<svg
													class="h-2.5 w-2.5 text-primary"
													viewBox="0 0 20 20"
													fill="currentColor"
													><path
														fill-rule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clip-rule="evenodd"
													/></svg
												>
												<span class="text-[9px] text-foreground/60">Payment done</span>
											</div>
											<div class="flex items-center gap-1 rounded bg-muted/50 px-2 py-1">
												<svg
													class="h-2.5 w-2.5 text-primary"
													viewBox="0 0 20 20"
													fill="currentColor"
													><path
														fill-rule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clip-rule="evenodd"
													/></svg
												>
												<span class="text-[9px] text-foreground/60">Messenger alert</span>
											</div>
										</div>
									</div>
									<span class="text-[11px] font-medium text-muted-foreground"
										>Auto notifications</span
									>
								</div>
							</div>
						</div>

						<p class="mb-2 text-[15px] leading-relaxed text-foreground/70">
							{$_('profile.cases.tour.did')}
						</p>
						<p class="text-[15px] font-medium leading-relaxed text-foreground/90">
							{@html $_('profile.cases.tour.result')}
						</p>
					</div>

					<!-- Case 8: AI Parking Management -->
					<div class="border-l-2 border-border pl-6 transition-colors hover:border-primary/50">
						<p class="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
							{$_('profile.cases.parking.client')} — {$_('profile.cases.parking.label')}
						</p>
						<p class="mb-2 text-xs text-muted-foreground/70">
							{$_('profile.cases.parking.industry')}
						</p>
						<h4 class="mb-3 text-lg font-semibold">{$_('profile.cases.parking.pain')}</h4>

						<!-- Diagram: CCTV captures car → AI reads plate → Dashboard -->
						<div class="my-6 rounded-lg border border-border bg-muted/30 p-5">
							<div class="flex flex-col gap-4 md:flex-row md:items-start md:gap-5">
								<!-- CCTV Feed capturing car -->
								<div class="flex flex-col items-center gap-2 md:flex-1">
									<div
										class="w-full max-w-[180px] rounded-lg border-2 border-foreground/20 bg-background p-3"
									>
										<!-- Camera viewfinder frame -->
										<div class="relative aspect-[4/3] rounded bg-foreground/5">
											<!-- Corner brackets -->
											<div
												class="absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-foreground/30"
											></div>
											<div
												class="absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-foreground/30"
											></div>
											<div
												class="absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 border-foreground/30"
											></div>
											<div
												class="absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-foreground/30"
											></div>
											<!-- Car silhouette -->
											<div class="absolute inset-0 flex items-center justify-center">
												<svg
													class="h-8 w-12 text-foreground/20"
													viewBox="0 0 48 32"
													fill="currentColor"
													><path
														d="M8 24h4v2a2 2 0 01-4 0v-2zm28 0h4v2a2 2 0 01-4 0v-2zM10 14l4-8h20l4 8H10zm-4 2h36a4 4 0 014 4v4H2v-4a4 4 0 014-4z"
													/></svg
												>
											</div>
											<!-- Plate highlight box -->
											<div
												class="absolute bottom-3 left-1/2 -translate-x-1/2 rounded border border-primary/60 bg-primary/10 px-2 py-0.5"
											>
												<span class="font-mono text-[9px] font-bold text-primary">ABC 1234</span>
											</div>
											<!-- REC indicator -->
											<div class="absolute right-2 top-2 flex items-center gap-1">
												<span class="h-1.5 w-1.5 rounded-full bg-destructive/70 dark:bg-yellow-400"
												></span>
												<span
													class="font-mono text-[7px] font-bold text-destructive/70 dark:text-yellow-400"
													>REC</span
												>
											</div>
										</div>
									</div>
									<span class="text-[11px] font-medium text-muted-foreground"
										>CCTV captures vehicle</span
									>
								</div>

								<!-- Arrow -->
								<div class="flex items-center justify-center md:pt-10">
									<svg class="h-8 w-4 text-primary/40 md:hidden" viewBox="0 0 16 32"
										><path
											d="M8 0v24m0 0l-6-6m6 6l6-6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
									<svg
										class="hidden h-4 w-8 flex-shrink-0 text-primary/40 md:block"
										viewBox="0 0 32 16"
										><path
											d="M0 8h24m0 0l-6-6m6 6l-6 6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
								</div>

								<!-- AI Recognition -->
								<div class="flex flex-col items-center gap-2 md:flex-1">
									<div
										class="w-full max-w-[180px] rounded-lg border-2 border-primary/40 bg-primary/5 p-3"
									>
										<div class="mb-2 flex items-center gap-1.5">
											<svg
												class="h-3.5 w-3.5 text-primary"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
												><path
													d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
												/></svg
											>
											<span class="text-[10px] font-bold uppercase tracking-wide text-primary"
												>AI Reading</span
											>
										</div>
										<div
											class="rounded border border-primary/20 bg-background px-3 py-2 text-center"
										>
											<span class="font-mono text-lg font-bold tracking-wider text-foreground"
												>ABC 1234</span
											>
										</div>
										<div class="mt-2 flex items-center gap-1">
											<svg class="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor"
												><path
													fill-rule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clip-rule="evenodd"
												/></svg
											>
											<span class="text-[10px] text-primary">99.2% confidence</span>
										</div>
									</div>
									<span class="text-[11px] font-semibold text-primary">AI reads plate number</span>
								</div>

								<!-- Arrow -->
								<div class="flex items-center justify-center md:pt-10">
									<svg class="h-8 w-4 text-primary/40 md:hidden" viewBox="0 0 16 32"
										><path
											d="M8 0v24m0 0l-6-6m6 6l6-6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
									<svg
										class="hidden h-4 w-8 flex-shrink-0 text-primary/40 md:block"
										viewBox="0 0 32 16"
										><path
											d="M0 8h24m0 0l-6-6m6 6l-6 6"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
								</div>

								<!-- Dashboard -->
								<div class="flex flex-col items-center gap-2 md:flex-1">
									<div
										class="w-full max-w-[180px] rounded-lg border-2 border-foreground/20 bg-background p-3"
									>
										<div class="mb-2 flex items-center gap-1.5">
											<svg
												class="h-3.5 w-3.5 text-foreground/50"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
												><path
													d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
												/></svg
											>
											<span class="text-[10px] font-bold uppercase tracking-wide text-foreground/50"
												>Dashboard</span
											>
										</div>
										<div class="space-y-1.5">
											<div class="flex items-center justify-between rounded bg-muted/50 px-2 py-1">
												<span class="font-mono text-[9px] text-foreground/60">ABC 1234</span>
												<span class="text-[9px] font-medium text-primary">In</span>
											</div>
											<div class="flex items-center justify-between rounded bg-muted/50 px-2 py-1">
												<span class="font-mono text-[9px] text-foreground/60">XYZ 5678</span>
												<span class="text-[9px] font-medium text-muted-foreground">Parked</span>
											</div>
											<div class="flex items-center justify-between rounded bg-muted/50 px-2 py-1">
												<span class="font-mono text-[9px] text-foreground/60">DEF 9012</span>
												<span
													class="text-[9px] font-medium text-destructive/70 dark:text-yellow-400"
													>Out</span
												>
											</div>
										</div>
									</div>
									<span class="text-[11px] font-medium text-muted-foreground"
										>Cloud management dashboard</span
									>
								</div>
							</div>
						</div>

						<p class="mb-2 text-[15px] leading-relaxed text-foreground/70">
							{$_('profile.cases.parking.did')}
						</p>
						<p class="text-[15px] font-medium leading-relaxed text-foreground/90">
							{@html $_('profile.cases.parking.result')}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- OUR OWN PRODUCTS                                -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="border-t border-border px-4 py-20 md:py-28">
		<div class="mx-auto max-w-3xl">
			<h3 class="mb-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
				{$_('profile.products.title')}
			</h3>
			<p class="mb-10 text-[15px] leading-relaxed text-foreground/60">
				{$_('profile.products.intro')}
			</p>

			<div class="grid gap-5 sm:grid-cols-2">
				<!-- Billsplit -->
				<a
					href="https://n.koostory.net"
					target="_blank"
					rel="noopener noreferrer"
					class="group rounded-lg border border-border p-5 transition-colors hover:border-primary/30 hover:bg-muted/30"
				>
					<div class="mb-2 flex items-center justify-between">
						<h4 class="text-base font-semibold">{$_('profile.products.billsplit.title')}</h4>
						<svg
							class="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							><path
								d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
								stroke-linecap="round"
								stroke-linejoin="round"
							/></svg
						>
					</div>
					<p class="mb-3 text-sm leading-relaxed text-muted-foreground">
						{$_('profile.products.billsplit.description')}
					</p>
					<p class="text-sm font-semibold text-primary">{$_('profile.products.billsplit.stat')}</p>
				</a>

				<!-- Blitzdoc -->
				<a
					href="https://req.koostory.net"
					target="_blank"
					rel="noopener noreferrer"
					class="group rounded-lg border border-border p-5 transition-colors hover:border-primary/30 hover:bg-muted/30"
				>
					<div class="mb-2 flex items-center justify-between">
						<h4 class="text-base font-semibold">{$_('profile.products.blitzdoc.title')}</h4>
						<svg
							class="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							><path
								d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
								stroke-linecap="round"
								stroke-linejoin="round"
							/></svg
						>
					</div>
					<p class="text-sm leading-relaxed text-muted-foreground">
						{$_('profile.products.blitzdoc.description')}
					</p>
				</a>

				<!-- Quote -->
				<a
					href="https://quote.koostory.net"
					target="_blank"
					rel="noopener noreferrer"
					class="group rounded-lg border border-border p-5 transition-colors hover:border-primary/30 hover:bg-muted/30"
				>
					<div class="mb-2 flex items-center justify-between">
						<h4 class="text-base font-semibold">{$_('profile.products.quote.title')}</h4>
						<svg
							class="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							><path
								d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
								stroke-linecap="round"
								stroke-linejoin="round"
							/></svg
						>
					</div>
					<p class="text-sm leading-relaxed text-muted-foreground">
						{$_('profile.products.quote.description')}
					</p>
				</a>

				<!-- Equest -->
				<a
					href="https://equest.koostory.net"
					target="_blank"
					rel="noopener noreferrer"
					class="group rounded-lg border border-border p-5 transition-colors hover:border-primary/30 hover:bg-muted/30"
				>
					<div class="mb-2 flex items-center justify-between">
						<h4 class="text-base font-semibold">{$_('profile.products.equest.title')}</h4>
						<svg
							class="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							><path
								d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
								stroke-linecap="round"
								stroke-linejoin="round"
							/></svg
						>
					</div>
					<p class="text-sm leading-relaxed text-muted-foreground">
						{$_('profile.products.equest.description')}
					</p>
				</a>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- WHAT ELSE WE CAN HELP WITH                      -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="border-t border-border px-4 py-20 md:py-28">
		<div class="mx-auto max-w-3xl">
			<h3 class="mb-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
				{$_('profile.alsoHelp.title')}
			</h3>
			<p class="mb-10 text-[15px] leading-relaxed text-foreground/60">
				{$_('profile.alsoHelp.intro')}
			</p>

			<div class="grid gap-x-8 gap-y-6 sm:grid-cols-2">
				{#each ['order', 'reservation', 'payment', 'cms', 'website', 'automation', 'internal', 'webapp', 'mobile', 'ai'] as key}
					<div class="flex items-start gap-3">
						<svg
							class="mt-1 h-4 w-4 flex-shrink-0 text-primary/60"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
						<div>
							<p class="text-sm font-semibold">{$_(`profile.alsoHelp.items.${key}.title`)}</p>
							<p class="text-xs text-muted-foreground">
								{$_(`profile.alsoHelp.items.${key}.example`)}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- ABOUT ME                                        -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="border-t border-border px-4 py-20 md:py-28">
		<div class="mx-auto max-w-3xl">
			<p class="mb-4 font-mono text-sm text-muted-foreground">02</p>
			<h2 class="mb-8 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
				{$_('profile.about.title')}
			</h2>
			<div class="space-y-6 text-[17px] leading-[1.8] text-foreground/70">
				<p>{@html $_('profile.about.p1')}</p>
				<p>
					{$_('profile.about.p2_before_link')}
					<a
						href="https://equest.koostory.net"
						target="_blank"
						rel="noopener noreferrer"
						class="font-semibold text-foreground underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary"
						>equest</a
					>{$_('profile.about.p2_between_links')}
					<a
						href="https://req.koostory.net"
						target="_blank"
						rel="noopener noreferrer"
						class="font-semibold text-foreground underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary"
						>blitzdoc</a
					>{$_('profile.about.p2_between_links2')}
					<a
						href="https://quote.koostory.net"
						target="_blank"
						rel="noopener noreferrer"
						class="font-semibold text-foreground underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary"
						>quote</a
					>
					{$_('profile.about.p2_after_link')}
				</p>
				<p>{$_('profile.about.p3')}</p>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- WHAT I WON'T DO                                 -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="border-t border-border px-4 py-20 md:py-28">
		<div class="mx-auto max-w-3xl">
			<p class="mb-4 font-mono text-sm text-muted-foreground">03</p>
			<h2 class="mb-10 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
				{$_('profile.wontDo.title')}
			</h2>

			<div class="space-y-6 text-[17px] leading-[1.8] text-foreground/70">
				<p>{$_('profile.wontDo.p1')}</p>
				<p>{$_('profile.wontDo.p2')}</p>
				<p>{@html $_('profile.wontDo.p3')}</p>
				<p>{$_('profile.wontDo.p4')}</p>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- WORKSHOPS                                       -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="border-t border-border px-4 py-20 md:py-28">
		<div class="mx-auto max-w-3xl">
			<h2 class="mb-4 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
				{$_('profile.workshops.title')}
			</h2>
			<p class="mb-8 text-base leading-relaxed text-foreground/70">
				{$_('profile.workshops.intro')}
			</p>

			<!-- Free workshop -->
			<div class="mb-6 rounded-lg border border-dashed border-border bg-muted/20 p-6">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p class="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
							{$_('profile.workshops.free.price')}
						</p>
						<h3 class="text-base font-semibold">{$_('profile.workshops.free.title')}</h3>
						<p class="mt-1 text-sm text-muted-foreground">
							{$_('profile.workshops.free.description')}
						</p>
					</div>
					<Button
						size="sm"
						class="group flex-shrink-0"
						onclick={() => {
							window.location.href = `${langPrefix}/#contact`;
						}}
					>
						{$_('profile.workshops.free.cta')}
						<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
				</div>
			</div>

			<!-- Link to paid workshops -->
			<a
				href="{langPrefix}/workshops"
				class="group flex items-center justify-between rounded-lg border border-border p-6 transition-colors hover:border-primary/30 hover:bg-muted/30"
			>
				<div>
					<h3 class="text-base font-semibold">{$_('profile.workshops.paidLink.title')}</h3>
					<p class="mt-1 text-sm text-muted-foreground">
						{$_('profile.workshops.paidLink.description')}
					</p>
				</div>
				<ArrowRight
					class="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
				/>
			</a>
		</div>
	</section>
</main>
