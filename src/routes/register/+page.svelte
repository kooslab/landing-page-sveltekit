<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	export let form;
</script>

<div class="container mx-auto max-w-md px-4 py-16">
	<Card>
		<CardHeader>
			<CardTitle>Create Admin Account</CardTitle>
			<CardDescription>Register a new admin account</CardDescription>
		</CardHeader>
		<CardContent>
			<form method="POST" action="?/register" use:enhance>
				<div class="space-y-4">
					{#if form?.error}
						<div class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
							{form.error}
						</div>
					{/if}

					<div>
						<Label for="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							required
							placeholder="admin@example.com"
							value={form?.email ?? ''}
						/>
						<p class="mt-1 text-sm text-muted-foreground">
							Enter your email address for the admin account
						</p>
					</div>

					<div>
						<Label for="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							required
							minlength="8"
							placeholder="••••••••"
						/>
						<p class="mt-1 text-sm text-muted-foreground">Minimum 8 characters</p>
					</div>

					<div>
						<Label for="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							required
							minlength="8"
							placeholder="••••••••"
						/>
						<p class="mt-1 text-sm text-muted-foreground">Re-enter your password</p>
					</div>

					<Button type="submit" class="w-full">Create Account</Button>
				</div>
			</form>

			<div class="mt-4 text-center text-sm text-muted-foreground">
				Already have an account? <a href="/login" class="text-primary hover:underline">Sign in</a>
			</div>
		</CardContent>
	</Card>
</div>
