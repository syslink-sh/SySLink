<script lang="ts">
    import { browser } from "$app/environment";

    let path: string = "";

    if (browser) {
        path = window.location.pathname;
    }
</script>

<div
    class="md:ml-auto mt-[-16px] md:mt-8 flex justify-center md:justify-end gap-10 text-xs font-black uppercase tracking-[0.3em]"
>
    <a
        href="/"
        class="{path == '/'
            ? 'text-white border-b-2 border-white'
            : 'text-zinc-500 hover:text-white'} transition-all duration-300 pb-2"
        >home</a
    >
    <a
        href="/projects"
        class="{path == '/projects'
            ? 'text-white border-b-2 border-white'
            : 'text-zinc-500 hover:text-white'} transition-all duration-300 pb-2"
        >projects</a
    >
</div>
