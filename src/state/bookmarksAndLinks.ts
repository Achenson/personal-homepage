import { newRidgeState } from "react-ridge-state";

import { SingleBookmarkData } from "../utils/interfaces";
import { SingleLinkData } from "../utils/interfaces";

// this can be used everywhere in your application
export const bookmarksDataState = newRidgeState<SingleBookmarkData[]>([
  {
    title: "all",
    color: "bg-teal-400",
    column: 1,
    priority: 1,
    linksTitles: ["facebook", "tvn24", "gmail"],
  },
  {
    title: "main",
    color: "bg-teal-500",
    column: 1,
    priority: 0,
    linksTitles: ["tvn24", "gmail"],
  },
  {
    title: "fun",
    color: "bg-teal-600",
    column: 2,
    priority: 0,
    linksTitles: ["facebook"],
  },
]);

export const linksDataState = newRidgeState<SingleLinkData[]>([
  {
    title: "facebook",
    URL: "https://en.wikipedia.org/wiki/Deadly_Rooms_of_Death",
    tags: ["all", "fun"],
  },
  {
    title: "tvn24",
    URL: "https://en.wikipedia.org/wiki/Webfoot_Technologies",
    tags: ["all", "main"],
  },
  {
    title: "gmail",
    URL: "https://en.wikipedia.org/wiki/Microsoft_Windows",
    tags: ["all", "main"],
  },
]);
