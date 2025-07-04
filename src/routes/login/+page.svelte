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
			<CardTitle>Admin Login</CardTitle>
			<CardDescription>Sign in to access the admin panel</CardDescription>
		</CardHeader>
		<CardContent>
			<form method="POST" action="?/login" use:enhance>
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
					</div>

					<div>
						<Label for="password">Password</Label>
						<Input id="password" name="password" type="password" required placeholder="••••••••" />
					</div>

					<Button type="submit" class="w-full">Sign In</Button>
				</div>
			</form>

			<div class="mt-4 text-center text-sm text-muted-foreground">
				Don't have an account? <a href="/register" class="text-primary hover:underline">Register</a>
			</div>
		</CardContent>
	</Card>
</div>
