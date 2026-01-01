import { BookText, Github, Globe, Package } from "lucide-svelte";

export const featuredProjects = [
  {
    title: "discord_gleam",
    image: "discord_gleam.png",
    description: "A library to create discord bots in gleam",
    links: [
      {
        url: "https://github.com/syslink-sh/discord_gleam",
        icon: Github,
      },
      {
        url: "https://hex.pm/packages/discord_gleam",
        icon: Package,
      },
      {
        url: "https://hexdocs.pm/discord_gleam",
        icon: BookText,
      },
    ],
    tags: ["gleam", "discord", "library"],
  },
  {
    title: "SoM Leaderboard",
    image: "som-lb.png",
    description: "A leaderboard for https://summer.hackclub.com",
    links: [
      {
        url: "https://github.com/syslink-sh/som-lb",
        icon: Github,
      },
      {
        url: "https://som-lb.syslink.dev?utm_source=syslink.dev&utm_medium=featured",
        icon: Globe,
      },
    ],
    tags: ["sveltekit", "hackclub", "leaderboard"],
  },
];
