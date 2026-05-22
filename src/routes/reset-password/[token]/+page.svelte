<script lang="ts">
	import { enhance } from '$app/forms';
	import { Eye, EyeOff } from 'lucide-svelte';

	let { data, form }: { data: any; form: any } = $props();

	let showPassword = $state(false);
	let showConfirm = $state(false);
</script>

<div class="flex min-h-screen items-center justify-center bg-brand px-4 py-12">
	<div class="w-full max-w-sm">
		<div class="mb-8 text-center">
			<span class="text-2xl font-bold text-white">KooStory</span>
			<span
				class="ml-2 rounded-full bg-brand-violet/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest text-brand-violet"
			>
				Admin
			</span>
		</div>

		<div class="rounded-2xl bg-white p-8 shadow-2xl">
			{#if !data.valid}
				<div class="py-4 text-center">
					<p class="text-2xl">⚠️</p>
					<h2 class="mt-3 text-xl font-bold text-ink">Link expired</h2>
					<p class="mt-2 text-base text-ink/60">This reset link is invalid or has expired.</p>
					<a
						href="/forgot-password"
						class="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:opacity-90"
					>
						Request a new link
					</a>
				</div>
			{:else if form?.success}
				<div class="py-4 text-center">
					<div
						class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10"
					>
						<svg class="h-7 w-7 text-brand" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<h2 class="text-xl font-bold text-ink">Password updated</h2>
					<p class="mt-2 text-base text-ink/60">Your password has been changed successfully.</p>
					<a
						href="/login"
						class="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-bold text-white hover:opacity-90"
					>
						Sign in
					</a>
				</div>
			{:else}
				<h1 class="text-2xl font-bold text-ink">New password</h1>
				<p class="mt-1 text-base text-ink/50">Choose a strong password.</p>

				<form method="POST" use:enhance class="mt-7 space-y-5">
					{#if form?.error}
						<div class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
							{form.error}
						</div>
					{/if}

					<div>
						<label for="password" class="mb-1.5 block text-sm font-semibold text-ink"
							>New password</label
						>
						<div class="relative">
							<input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								required
								minlength={8}
								placeholder="••••••••"
								class="w-full rounded-xl border border-brand/15 bg-brand/[0.02] px-4 py-3 pr-11 text-base text-ink placeholder:text-ink/30 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
							/>
							<button
								type="button"
								onclick={() => (showPassword = !showPassword)}
								class="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60"
								aria-label={showPassword ? 'Hide password' : 'Show password'}
							>
								{#if showPassword}
									<EyeOff class="h-5 w-5" />
								{:else}
									<Eye class="h-5 w-5" />
								{/if}
							</button>
						</div>
						<p class="mt-1 text-xs text-ink/40">Minimum 8 characters</p>
					</div>

					<div>
						<label for="confirmPassword" class="mb-1.5 block text-sm font-semibold text-ink"
							>Confirm password</label
						>
						<div class="relative">
							<input
								id="confirmPassword"
								name="confirmPassword"
								type={showConfirm ? 'text' : 'password'}
								required
								minlength={8}
								placeholder="••••••••"
								class="w-full rounded-xl border border-brand/15 bg-brand/[0.02] px-4 py-3 pr-11 text-base text-ink placeholder:text-ink/30 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
							/>
							<button
								type="button"
								onclick={() => (showConfirm = !showConfirm)}
								class="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60"
								aria-label={showConfirm ? 'Hide password' : 'Show password'}
							>
								{#if showConfirm}
									<EyeOff class="h-5 w-5" />
								{:else}
									<Eye class="h-5 w-5" />
								{/if}
							</button>
						</div>
					</div>

					<button
						type="submit"
						class="mt-2 inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90 active:translate-y-px"
					>
						Update Password
					</button>
				</form>
			{/if}
		</div>
	</div>
</div>
