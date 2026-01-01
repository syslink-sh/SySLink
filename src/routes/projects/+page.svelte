<script lang="ts">
    import Links from "$lib/components/Links.svelte";
    import RepoCard from "$lib/components/RepoCard.svelte";
    import { Code, Star } from "lucide-svelte";
    import { onMount } from "svelte";

    let repos: any | null = $state(null);
    let sortingMode: string = $state("stars");

    $effect(() => {
        if (repos) {
            switch (sortingMode) {
                case "stars":
                    repos = repos.sort(
                        (a: any, b: any) =>
                            b.stargazers_count - a.stargazers_count,
                    );
                    break;
                case "forks":
                    repos = repos.sort(
                        (a: any, b: any) => b.forks_count - a.forks_count,
                    );
                    break;
                case "issues_prs":
                    repos = repos.sort(
                        (a: any, b: any) =>
                            b.open_issues_count - a.open_issues_count,
                    );
                    break;
                case "updated":
                    repos = repos.sort(
                        (a: any, b: any) =>
                            new Date(b.updated_at).getTime() -
                            new Date(a.updated_at).getTime(),
                    );
                    break;
                case "alphabetical":
                    repos = repos.sort((a: any, b: any) =>
                        a.name.localeCompare(b.name),
                    );
                    break;
                case "oldest":
                    repos = repos.sort(
                        (a: any, b: any) =>
                            new Date(a.created_at).getTime() -
                            new Date(b.created_at).getTime(),
                    );
                    break;
                case "newest":
                    repos = repos.sort(
                        (a: any, b: any) =>
                            new Date(b.created_at).getTime() -
                            new Date(a.created_at).getTime(),
                    );
                    break;
            }
        }
    });

    onMount(async () => {
        try {
            const response = await fetch(
                "https://api.github.com/users/syslink-sh/repos?per_page=100",
            );

            if (!response.ok) {
                throw new Error("Failed to fetch GitHub repositories");
            }

            repos = await response.json();
        } catch (error) {
            console.error("Error fetching GitHub repositories:", error);
        }
    });
</script>

<div class="px-6 md:w-3/5 mx-auto min-h-screen flex flex-col py-12">
    <div class="flex w-full flex-col md:flex-row items-center md:items-start">
        <h1
            class="text-gradient text-[5.2rem] leading-none tracking-tighter font-black"
        >
            Projects
        </h1>

        <Links />
    </div>

    <div
        class="flex flex-col md:flex-row md:items-center justify-between mt-12 mb-8 gap-4"
    >
        <h2
            class="flex items-center text-zinc-100 text-2xl font-bold tracking-tight"
        >
            <Code class="mr-3 text-white" size={24} />
            Repositories
        </h2>

        <select
            bind:value={sortingMode}
            class="bg-zinc-900 border border-white/5 text-zinc-400 font-black uppercase tracking-widest text-[10px] rounded-full px-4 py-2 outline-none hover:border-white/20 transition-all cursor-pointer"
        >
            <option value="stars">Sort by Stars</option>
            <option value="forks">Sort by Forks</option>
            <option value="issues_prs">Sort by Issues/PRs</option>
            <option value="updated">Sort by Last Updated</option>
            <option value="alphabetical">Sort Alphabetically</option>
            <option value="oldest">Sort by Oldest</option>
            <option value="newest">Sort by Newest</option>
        </select>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {#if repos}
            {#each repos as repo}
                <RepoCard {repo} />
            {/each}
        {:else}
            {#each Array(4) as _}
                <div class="card-base animate-pulse h-64"></div>
            {/each}
        {/if}
    </div>

    <footer
        class="mt-auto pt-24 pb-12 flex flex-col md:flex-row items-center justify-between border-t border-white/5 gap-4"
    >
        <p class="text-zinc-500 text-sm font-medium tracking-tight uppercase">
            &copy; {new Date().getFullYear()}
            <span class="text-white font-black">SySLink</span>
        </p>
        <div
            class="flex gap-8 text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]"
        >
            <a
                href="https://github.com/syslink-sh"
                class="hover:text-white transition-colors">Github</a
            >
            <a
                href="https://syslink.dev"
                class="hover:text-white transition-colors">Website</a
            >
        </div>
    </footer>
</div>
