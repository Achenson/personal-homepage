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
    priority: 5,
    opened: false,
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
    priority: 1,
    opened: false,
    type: "folder",
    // noteInput: null,
    // rssLink: null
    // linksTitles: ["tvn24", "gmail"],
  },
  {
    id: 3,
    title: "fun",
    color: null,
    column: 3,
    priority: 0,
    opened: true,
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
    opened: false,
    type: "note",
    noteInput: "someText moreText someText moreText someText moreText someText moreText someText moreText someText moreText",
    // rssLink: null
    // linksTitles: ["facebook"],
  },
  {
    id: 5,
    title: "sciam",
    color: null,
    column: 2,
    priority: 1,
    opened: false,
    type: "rss",
    date: null,
    description: null,
    itemsPerPage: null,
    // noteInput: null,
    // rssLink: "http://rss.sciam.com/basic-science"
    rssLink: "https://tvn24.pl/najwazniejsze.xml",

    items: []
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



