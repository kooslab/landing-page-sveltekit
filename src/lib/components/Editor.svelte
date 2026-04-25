<script lang="ts">
	import { tick } from 'svelte';
	import { marked } from 'marked';

	let { content = $bindable('') } = $props();

	let activeTab: 'write' | 'preview' = $state('write');
	let previewHtml = $state('');

	let textarea: HTMLTextAreaElement;
	let fileInput: HTMLInputElement;
	let uploading = $state(false);

	// Slash command menu state
	let showSlashMenu = $state(false);
	let slashMenuPos = $state({ top: 0, left: 0 });
	let slashStart = $state(0);
	let slashQuery = $state('');
	let selectedIndex = $state(0);

	const slashCommands = [
		{ id: 'image', label: 'Image', description: 'Upload an image', icon: '🖼️' },
		{ id: 'h1', label: 'Heading 1', description: 'Large heading', icon: 'H1' },
		{ id: 'h2', label: 'Heading 2', description: 'Medium heading', icon: 'H2' },
		{ id: 'h3', label: 'Heading 3', description: 'Small heading', icon: 'H3' },
		{ id: 'bold', label: 'Bold', description: 'Bold text', icon: 'B' },
		{ id: 'italic', label: 'Italic', description: 'Italic text', icon: 'I' },
		{ id: 'code', label: 'Code Block', description: 'Code snippet', icon: '<>' },
		{ id: 'link', label: 'Link', description: 'Insert a link', icon: '🔗' },
		{ id: 'list', label: 'Bullet List', description: 'Unordered list', icon: '•' },
		{ id: 'olist', label: 'Numbered List', description: 'Ordered list', icon: '1.' },
		{ id: 'quote', label: 'Quote', description: 'Block quote', icon: '>' },
		{ id: 'hr', label: 'Divider', description: 'Horizontal rule', icon: '—' },
		{ id: 'table', label: 'Table', description: '3×3 table', icon: '▦' }
	];

	let filteredCommands = $derived(
		slashQuery
			? slashCommands.filter((c) => c.label.toLowerCase().includes(slashQuery.toLowerCase()))
			: slashCommands
	);

	async function uploadImage(file: File): Promise<string | null> {
		if (!file.type.startsWith('image/')) return null;
		if (file.size > 5 * 1024 * 1024) {
			alert('Image too large (max 5MB)');
			return null;
		}

		uploading = true;
		try {
			const formData = new FormData();
			formData.append('file', file);
			const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
			const data = await res.json();
			if (!res.ok) {
				alert(data.error || 'Upload failed');
				return null;
			}
			return data.url;
		} catch {
			alert('Upload failed');
			return null;
		} finally {
			uploading = false;
		}
	}

	function insertAtCursor(text: string, cursorOffset?: number) {
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		content = content.slice(0, start) + text + content.slice(end);
		tick().then(() => {
			const pos = cursorOffset !== undefined ? start + cursorOffset : start + text.length;
			textarea.selectionStart = pos;
			textarea.selectionEnd = pos;
			textarea.focus();
		});
	}

	function replaceSlashAndInsert(text: string, cursorOffset?: number) {
		const end = textarea.selectionStart;
		content = content.slice(0, slashStart) + text + content.slice(end);
		tick().then(() => {
			const pos = cursorOffset !== undefined ? slashStart + cursorOffset : slashStart + text.length;
			textarea.selectionStart = pos;
			textarea.selectionEnd = pos;
			textarea.focus();
		});
	}

	async function executeCommand(id: string) {
		showSlashMenu = false;

		switch (id) {
			case 'image':
				// Remove the slash text first, then trigger file picker
				content = content.slice(0, slashStart) + content.slice(textarea.selectionStart);
				await tick();
				textarea.selectionStart = slashStart;
				textarea.selectionEnd = slashStart;
				fileInput?.click();
				break;
			case 'h1':
				replaceSlashAndInsert('# ');
				break;
			case 'h2':
				replaceSlashAndInsert('## ');
				break;
			case 'h3':
				replaceSlashAndInsert('### ');
				break;
			case 'bold':
				replaceSlashAndInsert('****', 2);
				break;
			case 'italic':
				replaceSlashAndInsert('**', 1);
				break;
			case 'code':
				replaceSlashAndInsert('```\n\n```', 4);
				break;
			case 'link':
				replaceSlashAndInsert('[](url)', 1);
				break;
			case 'list':
				replaceSlashAndInsert('- ');
				break;
			case 'olist':
				replaceSlashAndInsert('1. ');
				break;
			case 'quote':
				replaceSlashAndInsert('> ');
				break;
			case 'hr':
				replaceSlashAndInsert('---\n');
				break;
			case 'table':
				replaceSlashAndInsert(
					'| Header | Header | Header |\n| --- | --- | --- |\n| Cell | Cell | Cell |\n| Cell | Cell | Cell |\n'
				);
				break;
		}
	}

	async function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (!input.files?.length) return;

		for (const file of input.files) {
			const url = await uploadImage(file);
			if (url) {
				insertAtCursor(`![](${url})\n`);
			}
		}
		input.value = '';
	}

	function getCaretCoordinates() {
		// Create a mirror div to measure caret position
		const mirror = document.createElement('div');
		const style = getComputedStyle(textarea);

		mirror.style.position = 'absolute';
		mirror.style.visibility = 'hidden';
		mirror.style.whiteSpace = 'pre-wrap';
		mirror.style.wordWrap = 'break-word';
		mirror.style.width = style.width;
		mirror.style.font = style.font;
		mirror.style.padding = style.padding;
		mirror.style.border = style.border;
		mirror.style.lineHeight = style.lineHeight;
		mirror.style.letterSpacing = style.letterSpacing;

		const textBefore = content.slice(0, textarea.selectionStart);
		mirror.textContent = textBefore;

		const span = document.createElement('span');
		span.textContent = '|';
		mirror.appendChild(span);

		document.body.appendChild(mirror);

		const rect = textarea.getBoundingClientRect();
		const spanRect = span.getBoundingClientRect();
		const mirrorRect = mirror.getBoundingClientRect();

		const top = rect.top + (spanRect.top - mirrorRect.top) - textarea.scrollTop + 24;
		const left = rect.left + (spanRect.left - mirrorRect.left);

		document.body.removeChild(mirror);
		return { top, left };
	}

	function handleInput() {
		if (!textarea) return;
		const pos = textarea.selectionStart;
		const textBefore = content.slice(0, pos);

		// Check if we're in a slash command context
		const lastSlash = textBefore.lastIndexOf('/');
		if (lastSlash !== -1) {
			const textBeforeSlash = textBefore.slice(0, lastSlash);
			const isStartOfLine = lastSlash === 0 || textBeforeSlash.endsWith('\n');
			const query = textBefore.slice(lastSlash + 1);
			const hasSpace = query.includes(' ') || query.includes('\n');

			if (isStartOfLine && !hasSpace) {
				slashStart = lastSlash;
				slashQuery = query;
				selectedIndex = 0;
				const coords = getCaretCoordinates();
				slashMenuPos = coords;
				showSlashMenu = filteredCommands.length > 0;
				return;
			}
		}

		showSlashMenu = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!showSlashMenu) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = (selectedIndex + 1) % filteredCommands.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (filteredCommands[selectedIndex]) {
				executeCommand(filteredCommands[selectedIndex].id);
			}
		} else if (e.key === 'Escape') {
			e.preventDefault();
			showSlashMenu = false;
		}
	}

	// Handle drag-and-drop on textarea
	function handleDrop(e: DragEvent) {
		const files = e.dataTransfer?.files;
		if (!files?.length) return;

		const images = Array.from(files).filter((f) => f.type.startsWith('image/'));
		if (!images.length) return;

		e.preventDefault();
		images.forEach(async (file) => {
			const url = await uploadImage(file);
			if (url) insertAtCursor(`![](${url})\n`);
		});
	}

	// Handle paste images
	function handlePaste(e: ClipboardEvent) {
		const files = e.clipboardData?.files;
		if (!files?.length) return;

		const images = Array.from(files).filter((f) => f.type.startsWith('image/'));
		if (!images.length) return;

		e.preventDefault();
		images.forEach(async (file) => {
			const url = await uploadImage(file);
			if (url) insertAtCursor(`![](${url})\n`);
		});
	}
</script>

<div class="relative overflow-hidden rounded-lg border">
	<div class="flex items-center gap-2 border-b bg-muted/50 p-2">
		<button
			class="rounded-md px-3 py-1 text-sm font-medium transition-colors {activeTab === 'write'
				? 'bg-background text-foreground shadow-sm'
				: 'text-muted-foreground hover:text-foreground'}"
			onclick={() => (activeTab = 'write')}
		>
			Write
		</button>
		<button
			class="rounded-md px-3 py-1 text-sm font-medium transition-colors {activeTab === 'preview'
				? 'bg-background text-foreground shadow-sm'
				: 'text-muted-foreground hover:text-foreground'}"
			onclick={async () => {
				previewHtml = await marked(content || '*Nothing to preview*');
				activeTab = 'preview';
			}}
		>
			Preview
		</button>
		{#if activeTab === 'write'}
			<span class="text-xs text-muted-foreground/60">
				Type <kbd class="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]"
					>/</kbd
				> for commands
			</span>
		{/if}
	</div>

	{#if uploading}
		<div
			class="flex items-center gap-2 border-b bg-muted/30 px-4 py-2 text-sm text-muted-foreground"
		>
			<span
				class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"
			></span>
			Uploading image...
		</div>
	{/if}

	{#if activeTab === 'write'}
		<textarea
			bind:this={textarea}
			bind:value={content}
			oninput={handleInput}
			onkeydown={handleKeydown}
			ondrop={handleDrop}
			onpaste={handlePaste}
			class="min-h-[400px] w-full resize-none bg-background p-4 font-mono text-sm focus:outline-none"
			placeholder="Write your article in Markdown... Type / for commands"
		/>
	{:else}
		<div
			class="prose prose-lg min-h-[400px] max-w-none p-4 dark:prose-invert [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg"
		>
			{@html previewHtml}
		</div>
	{/if}
</div>

{#if showSlashMenu}
	<div
		class="fixed z-50 max-h-80 w-64 overflow-y-auto rounded-lg border bg-popover shadow-lg"
		style="top: {slashMenuPos.top}px; left: {slashMenuPos.left}px;"
	>
		<div class="p-1">
			{#each filteredCommands as command, i}
				<button
					class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors {i ===
					selectedIndex
						? 'bg-accent text-accent-foreground'
						: 'text-popover-foreground hover:bg-accent/50'}"
					onmouseenter={() => (selectedIndex = i)}
					onclick={() => executeCommand(command.id)}
				>
					<span
						class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border bg-background text-xs font-medium"
					>
						{command.icon}
					</span>
					<div>
						<div class="font-medium">{command.label}</div>
						<div class="text-xs text-muted-foreground">{command.description}</div>
					</div>
				</button>
			{/each}
			{#if filteredCommands.length === 0}
				<div class="px-3 py-2 text-sm text-muted-foreground">No commands found</div>
			{/if}
		</div>
	</div>
{/if}

<input
	bind:this={fileInput}
	type="file"
	accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
	class="hidden"
	onchange={handleFileSelect}
/>
