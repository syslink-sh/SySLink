<script lang="ts">
    let { project } = $props();

    export function randomColor() {
        const colors = [
            "text-ctp-pink",
            "text-ctp-mauve",
            "text-ctp-red",
            "text-ctp-peach",
            "text-ctp-yellow",
            "text-ctp-green",
            "text-ctp-blue",
        ];

        return colors[Math.floor(Math.random() * colors.length)];
    }
</script>

<div class="flex flex-col border border-ctp-surface0 rounded-lg hover:border-ctp-blue bg-ctp-mantle">
    <img src={project.image} alt={project.title} class="rounded-t-lg" />

    <div class="flex flex-col p-4 h-full">
        <h3 class="text-xl font-bold">{project.title}</h3>
        <p class="text-base mb-auto">{project.description}</p>

        <div class="flex mt-4">
            <div class="flex gap-2">
                {#each project.links as link}
                    <a
                        href={link.url}
                        target="_blank"
                    >
                        <link.icon size={24} />
                    </a>
                {/each}
            </div>

            <div class="flex gap-2 ml-auto mt-auto">
                {#each project.tags as tag}
                    <span class={`bg-ctp-surface0 rounded-sm text-sm px-1.5 ${randomColor()}`}>
                        {tag}
                    </span>
                {/each}
            </div>
        </div>
    </div>
</div>