<script lang="ts">
	import { enhance } from '$app/forms';

	let { form }: { form: any } = $props();
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
			{#if form?.success}
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
					<h2 class="text-xl font-bold text-ink">Check your email</h2>
					<p class="mt-2 text-base text-ink/60">
						If an account exists for that address, we've sent a reset link. It expires in 1 hour.
					</p>
					<a
						href="/login"
						class="mt-6 inline-flex items-center justify-center rounded-full border border-brand/20 px-6 py-3 text-sm font-semibold text-brand hover:bg-brand/[0.04]"
					>
						Back to sign in
					</a>
				</div>
			{:else}
				<h1 class="text-2xl font-bold text-ink">Forgot password</h1>
				<p class="mt-1 text-base text-ink/50">Enter your email and we'll send a reset link.</p>

				<form method="POST" use:enhance class="mt-7 space-y-5">
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
							class="w-full rounded-xl border border-brand/15 bg-brand/[0.02] px-4 py-3 text-base text-ink placeholder:text-ink/30 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
						/>
					</div>

					<button
						type="submit"
						class="mt-2 inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90 active:translate-y-px"
					>
						Send Reset Link
					</button>
				</form>

				<p class="mt-5 text-center text-sm text-ink/40">
					<a href="/login" class="font-semibold text-brand hover:opacity-70">Back to sign in</a>
				</p>
			{/if}
		</div>
	</div>
</div>
