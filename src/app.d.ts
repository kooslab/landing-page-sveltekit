// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { User, Session } from 'lucia';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			session: Session | null;
		}
		interface PageData {
			user?: User | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '*.md' {
	import type { ComponentType } from 'svelte';
	const component: ComponentType;
	export default component;
}

export {};
