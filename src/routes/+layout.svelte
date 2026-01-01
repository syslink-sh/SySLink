<script lang="ts">
	import "../app.css";
	import { injectAnalytics } from "@vercel/analytics/sveltekit";
	import { dev } from "$app/environment";

	injectAnalytics({ mode: dev ? "development" : "production" });

	let { children } = $props();
</script>

{@render children()}
