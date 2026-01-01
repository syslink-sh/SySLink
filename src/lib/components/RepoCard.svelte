<script lang="ts">
    import {
        ForkKnife,
        Github,
        GitPullRequestArrow,
        Globe,
        Scroll,
        Star,
    } from "lucide-svelte";

    let { repo } = $props();
</script>

<div class="card-base flex flex-col h-full group">
    <div class="flex flex-col h-full">
        <div class="flex items-start justify-between mb-4">
            <h3
                class="text-2xl font-black text-white group-hover:text-zinc-400 transition-colors duration-300 line-clamp-1"
            >
                {repo.name}
            </h3>

            <div
                class="flex items-center text-white font-black text-xs bg-zinc-800 px-3 py-1 rounded-full border border-white/5"
            >
                {repo.stargazers_count}
                <Star class="ml-1.5" size={12} fill="currentColor" />
            </div>
        </div>

        <p
            class="text-zinc-400 font-medium leading-snug mb-8 line-clamp-2 min-h-[2.5rem]"
        >
            {repo.description || "No description provided."}
        </p>

        <div
            class="flex flex-col mt-auto space-y-4 pt-6 border-t border-white/5"
        >
            <div
                class="flex items-center space-x-6 text-xs font-black uppercase tracking-widest"
            >
                <a
                    href={repo.html_url}
                    target="_blank"
                    class="flex items-center text-white hover:opacity-60"
                >
                    <Github class="mr-2" size={14} />
                    Source
                </a>

                {#if repo.homepage}
                    <a
                        href={repo.homepage}
                        target="_blank"
                        class="flex items-center text-zinc-400 hover:text-white"
                    >
                        <Globe class="mr-2" size={14} />
                        Visit
                    </a>
                {/if}
            </div>

            <div class="flex flex-wrap gap-2">
                {#if repo.topics.length > 0}
                    {#each repo.topics.slice(0, 3) as topic}
                        <span
                            class="bg-zinc-950 text-zinc-500 rounded-lg text-[10px] uppercase font-black tracking-widest px-2 py-1 border border-white/5"
                        >
                            {topic}
                        </span>
                    {/each}
                {/if}
            </div>

            <div
                class="flex items-center justify-between text-[10px] text-zinc-500 font-black uppercase tracking-tighter pt-2"
            >
                <div class="flex items-center">
                    {#if repo.language}
                        <div class="flex items-center mr-6">
                            <span
                                class="size-2 rounded-full mr-2 bg-white shadow-[0_0_8px_white]"
                            ></span>
                            {repo.language}
                        </div>
                    {/if}

                    {#if repo.license && repo.license.spdx_id}
                        <div class="flex items-center">
                            <Scroll class="mr-1.5" size={12} />
                            {repo.license.spdx_id}
                        </div>
                    {/if}
                </div>

                <div class="flex items-center space-x-4">
                    <div class="flex items-center" title="Forks">
                        <ForkKnife class="mr-1" size={12} />
                        {repo.forks_count}
                    </div>
                    <div class="flex items-center" title="Issues">
                        <GitPullRequestArrow class="mr-1" size={12} />
                        {repo.open_issues_count}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
