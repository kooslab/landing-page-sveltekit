<script lang="ts">
	import { enhance } from '$app/forms';
	import { Eye, EyeOff } from 'lucide-svelte';

	let { form }: { form: any } = $props();

	let showPassword = $state(false);
</script>

<div class="flex min-h-screen items-center justify-center bg-brand px-4 py-12">
	<div class="w-full max-w-sm">
		<!-- Brand mark -->
		<div class="mb-8 text-center">
			<span class="text-2xl font-bold text-white">KooStory</span>
			<span
				class="ml-2 rounded-full bg-brand-violet/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest text-brand-violet"
			>
				Admin
			</span>
		</div>

		<!-- Card -->
		<div class="rounded-2xl bg-white p-8 shadow-2xl">
			<h1 class="text-2xl font-bold text-ink">Sign in</h1>
			<p class="mt-1 text-base text-ink/50">Access the admin panel</p>

			<form method="POST" action="?/login" use:enhance class="mt-7 space-y-5">
				{#if form?.error}
					<div class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
						{form.error}
					</div>
				{/if}

				<div>
					<label for="email" class="mb-1.5 block text-sm font-semibold text-ink">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						placeholder="admin@example.com"
						value={form?.email ?? ''}
						class="w-full rounded-xl border border-brand/15 bg-brand/[0.02] px-4 py-3 text-base text-ink placeholder:text-ink/30 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
					/>
				</div>

				<div>
					<div class="mb-1.5 flex items-center justify-between">
						<label for="password" class="text-sm font-semibold text-ink">Password</label>
						<a href="/forgot-password" class="text-xs text-brand/60 hover:text-brand">
							Forgot password?
						</a>
					</div>
					<div class="relative">
						<input
							id="password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							required
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
				</div>

				<button
					type="submit"
					class="mt-2 inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90 active:translate-y-px"
				>
					Sign In
				</button>
			</form>

			<p class="mt-5 text-center text-sm text-ink/40">
				Don't have an account?
				<a href="/register" class="font-semibold text-brand hover:opacity-70">Register</a>
			</p>
		</div>
	</div>
</div>
