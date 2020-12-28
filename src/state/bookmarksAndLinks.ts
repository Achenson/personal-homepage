import { newRidgeState } from "react-ridge-state";

import { SingleBookmarkData } from "../utils/interfaces";
import { SingleLinkData } from "../utils/interfaces";

// this can be used everywhere in your application
export const bookmarksDataState = newRidgeState<SingleBookmarkData[]>([
  {
    title: "all",
    color: null,
    column: 1,
    priority: 1,
    type: "folder",
    noteInput: null,
    rssLink: null
    // linksTitles: ["facebook", "tvn24", "gmail"],
  },
  {
    title: "main",
    color: "red-400",
    column: 1,
    priority: 0,
    type: "folder",
    noteInput: null,
    rssLink: null
    // linksTitles: ["tvn24", "gmail"],
  },
  {
    title: "fun",
    color: null,
    column: 2,
    priority: 0,
    type: "folder",
    noteInput: null,
    rssLink: null
    // linksTitles: ["facebook"],
  },
  {
    title: "note",
    color: null,
    column: 1,
    priority: 0,
    type: "note",
    noteInput: "someText moreText someText moreText someText moreText someText moreText someText moreText someText moreText",
    rssLink: null
    // linksTitles: ["facebook"],
  },
  {
    title: "SciAmerican",
    color: null,
    column: 2,
    priority: 0,
    type: "rss",
    noteInput: null,
    rssLink: "http://rss.sciam.com/basic-science"
    // linksTitles: ["facebook"],
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

export const deletedBookmarkState = newRidgeState<string | null>(null)



