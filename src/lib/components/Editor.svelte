<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	import Table from '@tiptap/extension-table';
	import TableRow from '@tiptap/extension-table-row';
	import TableCell from '@tiptap/extension-table-cell';
	import TableHeader from '@tiptap/extension-table-header';
	import { Button } from '$lib/components/ui/button';
	import { marked } from 'marked';

	let { content = $bindable('') } = $props();

	let element: HTMLDivElement;
	let editor: Editor;
	let showMarkdown = $state(true);
	let markdownContent = $state(content);

	// Configure marked for consistency
	marked.setOptions({
		gfm: true,
		breaks: true,
		tables: true
	});

	onMount(() => {
		editor = new Editor({
			element,
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: 'Start writing your article...'
				}),
				Table.configure({
					resizable: true
				}),
				TableRow,
				TableHeader,
				TableCell
			],
			content: content ? marked(content) : '',
			onTransaction: () => {
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				const html = editor.getHTML();
				const markdown = htmlToMarkdown(html);
				markdownContent = markdown;
				// Update parent component
				content = markdown;
			},
			editorProps: {
				attributes: {
					class:
						'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4 [&_table]:border-collapse [&_table]:w-full [&_td]:border [&_td]:border-gray-300 [&_td]:p-2 [&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_th]:bg-gray-100 [&_th]:font-bold dark:[&_th]:bg-gray-800 dark:[&_td]:border-gray-600 dark:[&_th]:border-gray-600'
				}
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	function htmlToMarkdown(html: string): string {
		// Convert tables first (more complex regex)
		let markdown = html;

		// Handle tables
		markdown = markdown.replace(
			/<table[^>]*>([\s\S]*?)<\/table>/gi,
			(_match, tableContent: string) => {
				let rows = tableContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
				let tableMarkdown = '';

				rows.forEach((row: string, index: number) => {
					let cells = row.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi) || [];
					let rowContent = '|';

					cells.forEach((cell: string) => {
						let cellContent = cell
							.replace(/<t[hd][^>]*>/gi, '')
							.replace(/<\/t[hd]>/gi, '')
							.replace(/<[^>]+>/g, '')
							.trim();
						rowContent += ' ' + cellContent + ' |';
					});

					tableMarkdown += rowContent + '\n';

					// Add separator after header row
					if (index === 0) {
						let separatorRow = '|';
						cells.forEach(() => {
							separatorRow += ' --- |';
						});
						tableMarkdown += separatorRow + '\n';
					}
				});

				return '\n' + tableMarkdown + '\n';
			}
		);

		// Then do simple replacements
		return markdown
			.replace(/<h1>(.*?)<\/h1>/g, '# $1\n')
			.replace(/<h2>(.*?)<\/h2>/g, '## $1\n')
			.replace(/<h3>(.*?)<\/h3>/g, '### $1\n')
			.replace(/<p>(.*?)<\/p>/g, '$1\n\n')
			.replace(/<strong>(.*?)<\/strong>/g, '**$1**')
			.replace(/<em>(.*?)<\/em>/g, '*$1*')
			.replace(/<code>(.*?)<\/code>/g, '`$1`')
			.replace(/<br\s*\/?>/g, '\n')
			.replace(/<ul>/g, '')
			.replace(/<\/ul>/g, '\n')
			.replace(/<li>(.*?)<\/li>/g, '- $1\n')
			.replace(/<ol>/g, '')
			.replace(/<\/ol>/g, '\n')
			.replace(/<li>(.*?)<\/li>/g, '1. $1\n')
			.trim();
	}

	function toggleMarkdown() {
		showMarkdown = !showMarkdown;
		if (!showMarkdown && editor) {
			editor.commands.setContent(marked(markdownContent));
			content = markdownContent;
		}
	}

	function preprocessMarkdown(markdown: string): string {
		// Fix tables that have extra line breaks between rows
		return markdown.replace(/(\|.*\|)\n\n+(\|)/g, '$1\n$2');
	}

	function updateMarkdown() {
		const cleaned = preprocessMarkdown(markdownContent);
		content = cleaned;
		markdownContent = cleaned;
		if (editor) {
			editor.commands.setContent(marked(cleaned));
		}
	}

	// Keep markdown content in sync
	$effect(() => {
		if (!showMarkdown && editor) {
			// Only update if content has changed externally
			if (content !== markdownContent) {
				markdownContent = content;
				editor.commands.setContent(marked(content));
			}
		}
	});
</script>

<div class="overflow-hidden rounded-lg border">
	<div class="flex items-center gap-2 border-b bg-muted/50 p-2">
		<span class="px-2 text-sm font-medium text-muted-foreground">
			{showMarkdown ? 'Markdown Editor' : 'Rich Text Editor'}
		</span>
		<div class="h-6 w-px bg-border" />
		{#if editor && !showMarkdown}
			<Button
				variant="ghost"
				size="sm"
				onclick={() => editor.chain().focus().toggleBold().run()}
				class={editor.isActive('bold') ? 'bg-muted' : ''}
			>
				B
			</Button>
			<Button
				variant="ghost"
				size="sm"
				onclick={() => editor.chain().focus().toggleItalic().run()}
				class={editor.isActive('italic') ? 'bg-muted' : ''}
			>
				I
			</Button>
			<Button
				variant="ghost"
				size="sm"
				onclick={() => editor.chain().focus().toggleCode().run()}
				class={editor.isActive('code') ? 'bg-muted' : ''}
			>
				Code
			</Button>
			<div class="mx-1 h-6 w-px bg-border" />
			<Button
				variant="ghost"
				size="sm"
				onclick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				class={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
			>
				H1
			</Button>
			<Button
				variant="ghost"
				size="sm"
				onclick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
			>
				H2
			</Button>
			<Button
				variant="ghost"
				size="sm"
				onclick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				class={editor.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}
			>
				H3
			</Button>
			<div class="mx-1 h-6 w-px bg-border" />
			<Button
				variant="ghost"
				size="sm"
				onclick={() => editor.chain().focus().toggleBulletList().run()}
				class={editor.isActive('bulletList') ? 'bg-muted' : ''}
			>
				List
			</Button>
			<div class="mx-1 h-6 w-px bg-border" />
			<Button
				variant="ghost"
				size="sm"
				onclick={() =>
					editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
			>
				Table
			</Button>
			{#if editor.isActive('table')}
				<Button
					variant="ghost"
					size="sm"
					onclick={() => editor.chain().focus().addColumnAfter().run()}
					title="Add column"
				>
					+Col
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onclick={() => editor.chain().focus().addRowAfter().run()}
					title="Add row"
				>
					+Row
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onclick={() => editor.chain().focus().deleteColumn().run()}
					title="Delete column"
				>
					-Col
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onclick={() => editor.chain().focus().deleteRow().run()}
					title="Delete row"
				>
					-Row
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onclick={() => editor.chain().focus().deleteTable().run()}
					title="Delete table"
				>
					Del
				</Button>
			{/if}
		{/if}
		<div class="ml-auto">
			<Button variant="ghost" size="sm" onclick={toggleMarkdown}>
				{showMarkdown ? 'Rich Text' : 'Markdown'}
			</Button>
		</div>
	</div>

	{#if showMarkdown}
		<textarea
			bind:value={markdownContent}
			oninput={updateMarkdown}
			class="min-h-[400px] w-full resize-none bg-background p-4 font-mono text-sm focus:outline-none"
			placeholder="Write your article in Markdown..."
		/>
	{:else}
		<div bind:this={element} />
	{/if}
</div>
