import { newRidgeState } from "react-ridge-state";

import { SingleBookmarkData } from "../utils/interfaces";
import { SingleLinkData } from "../utils/interfaces";

// this can be used everywhere in your application
export const bookmarksDataState = newRidgeState<SingleBookmarkData[]>([
  {
    id: 1,
    title: "all",
    color: null,
    column: 1,
    priority: 1,
    type: "folder",
    // noteInput: null,
    // rssLink: null
    // linksTitles: ["facebook", "tvn24", "gmail"],
  },
  {
    id: 2,
    title: "main",
    color: "red-400",
    column: 1,
    priority: 0,
    type: "folder",
    // noteInput: null,
    // rssLink: null
    // linksTitles: ["tvn24", "gmail"],
  },
  {
    id: 3,
    title: "fun",
    color: null,
    column: 2,
    priority: 0,
    type: "folder",
    // noteInput: null,
    // rssLink: null
    // linksTitles: ["facebook"],
  },
  {
    id: 4,
    title: "note",
    color: null,
    column: 1,
    priority: 0,
    type: "note",
    noteInput: "someText moreText someText moreText someText moreText someText moreText someText moreText someText moreText",
    // rssLink: null
    // linksTitles: ["facebook"],
  },
  {
    id: 5,
    title: "sci am",
    color: null,
    column: 2,
    priority: 0,
    type: "rss",
    // noteInput: null,
    // rssLink: "http://rss.sciam.com/basic-science"
    rssLink: "https://tvn24.pl/najwazniejsze.xml"
    // rssLink: "https://techbeacon.com/rss.xml"
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



