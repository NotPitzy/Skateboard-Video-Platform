import { SidebarMenu, SidebarItem } from "../models/index.js";

const sidebar = [
  new SidebarMenu("menu", [
    new SidebarItem("fa-solid fa-house", "Discover"),
    new SidebarItem("fa-solid fa-fire", "Trending"),
    new SidebarItem("fa-solid fa-play", "Streaming"),
    new SidebarItem("fa-solid fa-file-arrow-down", "Playlist"),
    new SidebarItem("fa-solid fa-book-bookmark", "Bookmark"),
  ]),
  new SidebarMenu("category", [
    new SidebarItem("fa-solid fa-tv", "Live Stream"),
    new SidebarItem("fa-solid fa-chart-simple", "Tutorial"),
    new SidebarItem("fa-solid fa-users-line", "Community"),
  ]),
];

export default sidebar;
