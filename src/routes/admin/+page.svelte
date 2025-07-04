<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex min-h-screen">
	<!-- Sidebar -->
	<div class="w-64 border-r bg-background p-6">
		<div class="mb-8">
			<h2 class="text-lg font-semibold">Admin Panel</h2>
		</div>
		<nav class="space-y-2">
			<a
				href="/admin"
				class="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="3" y="3" width="7" height="7"></rect>
					<rect x="14" y="3" width="7" height="7"></rect>
					<rect x="14" y="14" width="7" height="7"></rect>
					<rect x="3" y="14" width="7" height="7"></rect>
				</svg>
				Dashboard
			</a>
			<a
				href="/admin/blogs"
				class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
					<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
				</svg>
				Blog Posts
			</a>
			<a
				href="/admin/blogs/new"
				class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="12" y1="5" x2="12" y2="19"></line>
					<line x1="5" y1="12" x2="19" y2="12"></line>
				</svg>
				Create Article
			</a>
			<div class="my-4 border-t"></div>
			<a
				href="/"
				class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
					<polyline points="10 17 15 12 10 7"></polyline>
					<line x1="15" y1="12" x2="3" y2="12"></line>
				</svg>
				View Site
			</a>
		</nav>
	</div>

	<!-- Main Content -->
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
				<div class="mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="40"
						height="40"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-primary"
					>
						<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
						<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold">Blog Management</h3>
				<p class="mb-4 text-sm text-muted-foreground">Create, edit, and manage your blog posts</p>
				<Button href="/admin/blogs" class="w-full">Manage Blog</Button>
			</div>

			<!-- Quick Actions Card -->
			<div class="rounded-lg border bg-card p-6 shadow-sm">
				<div class="mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="40"
						height="40"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-primary"
					>
						<line x1="12" y1="5" x2="12" y2="19"></line>
						<line x1="5" y1="12" x2="19" y2="12"></line>
						<circle cx="12" cy="12" r="10"></circle>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold">Quick Actions</h3>
				<p class="mb-4 text-sm text-muted-foreground">Create new content quickly</p>
				<Button href="/admin/blogs/new" variant="secondary" class="w-full">New Article</Button>
			</div>

			<!-- Site Settings Card (placeholder) -->
			<div class="rounded-lg border bg-card p-6 opacity-50 shadow-sm">
				<div class="mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="40"
						height="40"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-muted-foreground"
					>
						<circle cx="12" cy="12" r="3"></circle>
						<path d="M12 1v6m0 6v6m11-11h-6m-6 0H1"></path>
						<path d="m20.5 7.5-3 3L15 8m-9 4-3 3L5 16m14 0-3 3-2.5-2.5M5 8l3 3 2.5-2.5"></path>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold text-muted-foreground">Settings</h3>
				<p class="mb-4 text-sm text-muted-foreground">Coming soon...</p>
				<Button disabled class="w-full">Configure</Button>
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
</div>
