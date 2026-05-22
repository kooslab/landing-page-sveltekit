<script lang="ts">
	import { BookOpen, Plus, Calendar } from 'lucide-svelte';
</script>

<div class="flex-1 px-8 py-10">
	<div class="mb-10 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold text-ink">Dashboard</h1>
			<p class="mt-1 text-base text-ink/50">Welcome back, admin.</p>
		</div>
		<form method="POST" action="/logout">
			<button
				type="submit"
				class="rounded-full border border-brand/20 px-5 py-2 text-sm font-semibold text-ink/60 transition-colors hover:border-brand/40 hover:text-ink"
			>
				Logout
			</button>
		</form>
	</div>

	<div class="grid gap-5 md:grid-cols-3">
		<div class="rounded-2xl border border-brand/10 bg-white p-7 shadow-sm">
			<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/[0.07]">
				<BookOpen size={22} class="text-brand" />
			</div>
			<h3 class="text-lg font-bold text-ink">Blog Posts</h3>
			<p class="mt-1 text-sm text-ink/50">Create, edit, and publish articles</p>
			<a
				href="/admin/blogs"
				class="mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
			>
				Manage Blog
			</a>
		</div>

		<div class="rounded-2xl border border-brand/10 bg-white p-7 shadow-sm">
			<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-violet/15">
				<Plus size={22} class="text-brand" />
			</div>
			<h3 class="text-lg font-bold text-ink">New Article</h3>
			<p class="mt-1 text-sm text-ink/50">Start writing a new blog post</p>
			<a
				href="/admin/blogs/new"
				class="mt-5 inline-flex w-full items-center justify-center rounded-full border border-brand/20 bg-white px-5 py-2.5 text-sm font-bold text-brand transition-colors hover:bg-brand/[0.04]"
			>
				Create Article
			</a>
		</div>

		<div class="rounded-2xl border border-brand/10 bg-white p-7 shadow-sm">
			<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/[0.07]">
				<Calendar size={22} class="text-brand" />
			</div>
			<h3 class="text-lg font-bold text-ink">Reservations</h3>
			<p class="mt-1 text-sm text-ink/50">View and manage bookings</p>
			<a
				href="/admin/reservations"
				class="mt-5 inline-flex w-full items-center justify-center rounded-full border border-brand/20 bg-white px-5 py-2.5 text-sm font-bold text-brand transition-colors hover:bg-brand/[0.04]"
			>
				View Bookings
			</a>
		</div>
	</div>
</div>
