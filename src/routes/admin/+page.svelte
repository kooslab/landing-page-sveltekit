<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { BookOpen, Plus, Calendar } from 'lucide-svelte';
</script>

<div class="flex-1 px-8 py-8">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-3xl font-bold">Admin Dashboard</h1>
		<form method="POST" action="/logout">
			<Button type="submit" variant="outline">Logout</Button>
		</form>
	</div>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		<!-- Blog Management Card -->
		<div class="rounded-lg border bg-card p-6 shadow-sm">
			<BookOpen size={40} class="mb-4 text-primary" />
			<h3 class="mb-2 text-lg font-semibold">Blog Management</h3>
			<p class="mb-4 text-sm text-muted-foreground">Create, edit, and manage your blog posts</p>
			<Button href="/admin/blogs" class="w-full">Manage Blog</Button>
		</div>

		<!-- Quick Actions Card -->
		<div class="rounded-lg border bg-card p-6 shadow-sm">
			<Plus size={40} class="mb-4 text-primary" />
			<h3 class="mb-2 text-lg font-semibold">Quick Actions</h3>
			<p class="mb-4 text-sm text-muted-foreground">Create new content quickly</p>
			<Button href="/admin/blogs/new" variant="secondary" class="w-full">New Article</Button>
		</div>

		<!-- Reservations Card -->
		<div class="rounded-lg border bg-card p-6 shadow-sm">
			<Calendar size={40} class="mb-4 text-primary" />
			<h3 class="mb-2 text-lg font-semibold">Workshop Reservations</h3>
			<p class="mb-4 text-sm text-muted-foreground">View and manage workshop bookings</p>
			<Button href="/admin/reservations" variant="secondary" class="w-full">
				Manage Reservations
			</Button>
		</div>
	</div>

	<div class="mt-8">
		<h2 class="mb-4 text-xl font-semibold">Welcome to Admin Panel</h2>
		<p class="text-muted-foreground">
			This is your admin dashboard where you can manage your website content. Use the sidebar to
			navigate between different sections.
		</p>
	</div>
</div>
