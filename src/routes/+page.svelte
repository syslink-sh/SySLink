<script lang="ts">
    import Links from "$lib/components/Links.svelte";
    import { Github, Star } from "lucide-svelte";
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    // too lazy to set type rn
    let discordData: any | null = null;
    let githubData: any | null = null;

    let totalStars: number | null = null;

    onMount(async () => {
        try {
            const response = await fetch(
                "https://api.lanyard.rest/v1/users/1423516175161098371",
            );

            if (!response.ok) {
                throw new Error("Failed to fetch Discord status");
            }

            discordData = (await response.json()).data;
        } catch (error) {
            console.error("Error fetching Discord status:", error);
        }

        try {
            const response = await fetch(
                "https://api.github.com/users/syslink-sh",
            );

            if (!response.ok) {
                throw new Error("Failed to fetch GitHub data");
            }

            githubData = await response.json();
        } catch (error) {
            console.error("Error fetching GitHub data:", error);
        }

        try {
            const response = await fetch(
                "https://api.github.com/users/syslink-sh/repos?per_page=100",
            );

            if (!response.ok) {
                throw new Error("Failed to fetch GitHub repositories");
            }

            const repos = await response.json();
            totalStars = repos.reduce(
                (acc: number, repo: any) => acc + repo.stargazers_count,
                0,
            );
        } catch (error) {
            console.error("Error fetching GitHub repositories:", error);
        }
    });

    function elapsedTime(timestamp: number): string {
        const now = Date.now();
        const diff = (now - timestamp) / 1000;

        const hoursDiff = Math.floor(diff / 3600);
        const minutesDiff = Math.floor((diff % 3600) / 60);
        const secondsDiff = Math.floor(diff % 60);

        let string = "";

        if (hoursDiff > 0) {
            string += `${hoursDiff.toString().padStart(2, "0")}:`;
        }

        string += `${minutesDiff.toString().padStart(2, "0")}:`;

        return string + `${secondsDiff.toString().padStart(2, "0")}`;
    }

    // bad trick to make the elapsed time go up
    setInterval(() => {
        if (discordData && discordData.activities.length > 0) {
            discordData.activities[0].timestamps.start =
                Date.now() -
                (Date.now() - discordData.activities[0].timestamps.start);
        }
    }, 1000);

    // update discord data (incase activity changes for example)
    setInterval(
        async () => {
            try {
                const response = await fetch(
                    "https://api.lanyard.rest/v1/users/1423516175161098371",
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch Discord status");
                }

                discordData = (await response.json()).data;
            } catch (error) {
                console.error("Error fetching Discord status:", error);
            }
        },
        1000 * 60 * 5,
    ); // 5 mins
</script>

<div
    class="px-6 md:w-3/5 mx-auto min-h-screen flex flex-col py-12"
    in:fade={{ duration: 800 }}
>
    <div class="flex w-full flex-col md:flex-row items-center md:items-start">
        <h1
            class="text-gradient text-7xl md:text-8xl tracking-tighter mb-4 md:mb-0"
            in:fly={{ y: -20, duration: 1000, delay: 200 }}
        >
            SySLink
        </h1>

        <Links />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 items-start">
        <div
            class="flex flex-col space-y-8"
            in:fly={{ x: -20, duration: 1000, delay: 400 }}
        >
            <p class="text-3xl leading-snug text-zinc-100 font-medium">
                I'm <span class="bg-white text-zinc-950 px-2 rounded-lg"
                    >SySLink</span
                >, a developer and designer. I specialize in crafting
                <span class="text-zinc-400">premium</span> digital experiences.
            </p>

            <div class="flex flex-col space-y-2">
                <p class="text-zinc-400 text-xl font-medium tracking-tight">
                    Stats
                </p>
                <div class="flex gap-4">
                    <div
                        class="bg-zinc-900 border border-white/5 rounded-2xl px-4 py-2"
                    >
                        <span class="text-white font-black text-2xl"
                            >{totalStars || "?"}</span
                        >
                        <span
                            class="text-zinc-500 text-sm ml-1 uppercase tracking-widest font-bold"
                            >Stars</span
                        >
                    </div>
                    <div
                        class="bg-zinc-900 border border-white/5 rounded-2xl px-4 py-2"
                    >
                        <span class="text-white font-black text-2xl"
                            >{githubData?.followers || "?"}</span
                        >
                        <span
                            class="text-zinc-500 text-sm ml-1 uppercase tracking-widest font-bold"
                            >Followers</span
                        >
                    </div>
                </div>
            </div>

            <div class="pt-4 flex justify-center md:justify-start">
                <a
                    href="https://github.com/syslink-sh"
                    class="btn-primary flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Github class="mr-2" size={20} />
                    GitHub
                </a>
            </div>
        </div>

        <div
            class="flex flex-col space-y-4"
            in:fly={{ x: 20, duration: 1000, delay: 600 }}
        >
            {#if discordData}
                <div class="card-base flex flex-col space-y-6">
                    <div
                        class="flex items-center justify-between border-b border-white/5 pb-4"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="size-3 rounded-full animate-pulse
                                {discordData.discord_status === 'online'
                                    ? 'bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.5)]'
                                    : discordData.discord_status === 'idle'
                                      ? 'bg-yellow-400 opacity-80'
                                      : discordData.discord_status === 'dnd'
                                        ? 'bg-red-400'
                                        : 'bg-zinc-600'}"
                            ></div>
                            <h2
                                class="text-zinc-400 font-bold uppercase tracking-[0.2em] text-xs"
                            >
                                Discord Status
                            </h2>
                        </div>
                        <p
                            class="text-zinc-500 text-xs font-mono lowercase tracking-tighter"
                        >
                            {discordData.discord_status}
                        </p>
                    </div>

                    {#if discordData.listening_to_spotify}
                        <div class="flex flex-col space-y-4 group">
                            <p
                                class="text-[0.65rem] text-zinc-500 font-black tracking-[0.3em] uppercase"
                            >
                                Current Beat
                            </p>
                            <div
                                class="flex items-center bg-zinc-950/50 p-3 rounded-2xl border border-white/5"
                            >
                                <img
                                    class="size-20 rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                                    src={discordData.spotify.album_art_url}
                                    alt="spotify_album_art"
                                />
                                <div class="flex flex-col ml-5 overflow-hidden">
                                    <p
                                        class="font-black text-white text-lg leading-tight truncate"
                                    >
                                        {discordData.spotify.track}
                                    </p>
                                    <p
                                        class="text-zinc-400 text-sm font-medium truncate mt-1"
                                    >
                                        {discordData.spotify.artist}
                                    </p>
                                    <div
                                        class="mt-3 h-1 w-full bg-zinc-800 rounded-full overflow-hidden"
                                    >
                                        <div
                                            class="h-full bg-white w-1/3 animate-pulse"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {:else if discordData.activities.find((a: any) => a.type == 0)}
                        {@const activity = discordData.activities.find(
                            (a: any) => a.type == 0,
                        )}
                        <div class="flex flex-col space-y-4 group">
                            <p
                                class="text-[0.65rem] text-zinc-500 font-black tracking-[0.3em] uppercase"
                            >
                                Playing {activity.name}
                            </p>
                            <div
                                class="flex items-center bg-zinc-950/50 p-3 rounded-2xl border border-white/5"
                            >
                                {#if activity.assets}
                                    <img
                                        class="size-20 rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                                        src="https://cdn.discordapp.com/app-assets/{activity.application_id}/{activity
                                            .assets.large_image}.png"
                                        alt="activity_large"
                                    />
                                {/if}
                                <div class="flex flex-col ml-5 overflow-hidden">
                                    <p
                                        class="font-black text-white text-lg leading-tight truncate"
                                    >
                                        {activity.details || "In-game"}
                                    </p>
                                    <p
                                        class="text-zinc-400 text-sm font-medium truncate mt-1"
                                    >
                                        {activity.state || ""}
                                    </p>
                                    {#if activity.timestamps}
                                        <div
                                            class="mt-3 bg-zinc-800/50 self-start px-2 py-1 rounded-md"
                                        >
                                            <p
                                                class="text-[10px] font-black font-mono text-zinc-400 uppercase tracking-widest"
                                            >
                                                {elapsedTime(
                                                    activity.timestamps.start,
                                                )}
                                            </p>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {:else}
                        <div
                            class="py-12 flex flex-col items-center justify-center bg-zinc-950/30 rounded-2xl border border-zinc-800/30"
                        >
                            <p
                                class="text-zinc-600 text-sm font-bold uppercase tracking-widest"
                            >
                                No Activity
                            </p>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    </div>

    <footer class="mt-auto pb-4 text-sm text-ctp-subtext0">
        All Rights Reserved &copy; {new Date().getFullYear()} SySLink
    </footer>
</div>
