<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	import { Button } from '$lib/components/ui/button';

	export let content = '';

	let element: HTMLDivElement;
	let editor: Editor;
	let showMarkdown = false;
	let markdownContent = content;

	onMount(() => {
		editor = new Editor({
			element,
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: 'Start writing your article...'
				})
			],
			content: `<p>${content}</p>`,
			onTransaction: () => {
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				const html = editor.getHTML();
				content = htmlToMarkdown(html);
				markdownContent = content;
			},
			editorProps: {
				attributes: {
					class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4'
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
		// Simple HTML to Markdown conversion
		return html
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

	function markdownToHtml(markdown: string): string {
		// Simple Markdown to HTML conversion for editor
		return markdown
			.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			.replace(/^## (.*$)/gim, '<h2>$1</h2>')
			.replace(/^# (.*$)/gim, '<h1>$1</h1>')
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.+?)\*/g, '<em>$1</em>')
			.replace(/`(.+?)`/g, '<code>$1</code>')
			.replace(/\n\n/g, '</p><p>')
			.replace(/^/, '<p>')
			.replace(/$/, '</p>');
	}

	function toggleMarkdown() {
		showMarkdown = !showMarkdown;
		if (!showMarkdown && editor) {
			editor.commands.setContent(markdownToHtml(markdownContent));
			content = markdownContent;
		}
	}

	function updateMarkdown() {
		content = markdownContent;
		if (editor) {
			editor.commands.setContent(markdownToHtml(markdownContent));
		}
	}
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
				on:click={() => editor.chain().focus().toggleBold().run()}
				class={editor.isActive('bold') ? 'bg-muted' : ''}
			>
				B
			</Button>
			<Button
				variant="ghost"
				size="sm"
				on:click={() => editor.chain().focus().toggleItalic().run()}
				class={editor.isActive('italic') ? 'bg-muted' : ''}
			>
				I
			</Button>
			<Button
				variant="ghost"
				size="sm"
				on:click={() => editor.chain().focus().toggleCode().run()}
				class={editor.isActive('code') ? 'bg-muted' : ''}
			>
				Code
			</Button>
			<div class="mx-1 h-6 w-px bg-border" />
			<Button
				variant="ghost"
				size="sm"
				on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				class={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
			>
				H1
			</Button>
			<Button
				variant="ghost"
				size="sm"
				on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
			>
				H2
			</Button>
			<Button
				variant="ghost"
				size="sm"
				on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				class={editor.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}
			>
				H3
			</Button>
			<div class="mx-1 h-6 w-px bg-border" />
			<Button
				variant="ghost"
				size="sm"
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				class={editor.isActive('bulletList') ? 'bg-muted' : ''}
			>
				List
			</Button>
		{/if}
		<div class="ml-auto">
			<Button variant="ghost" size="sm" on:click={toggleMarkdown}>
				{showMarkdown ? 'Rich Text' : 'Markdown'}
			</Button>
		</div>
	</div>

	{#if showMarkdown}
		<textarea
			bind:value={markdownContent}
			on:input={updateMarkdown}
			class="min-h-[400px] w-full resize-none bg-background p-4 font-mono text-sm focus:outline-none"
			placeholder="Write your article in Markdown..."
		/>
	{:else}
		<div bind:this={element} />
	{/if}
</div>
