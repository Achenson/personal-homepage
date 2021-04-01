import { newRidgeState } from "react-ridge-state";

import { SingleTabData } from "../utils/interfaces";
import { SingleBookmarkData } from "../utils/interfaces";

// this can be used everywhere in your application
export const tabsDataState = newRidgeState<SingleTabData[]>([
  {
    id: "ALL_TAGS",
    title: "all",
    color: null,
    column: 1,
    priority: 2,
    opened: false,
    deletable: false,
    type: "folder",
    // noteInput: null,
    // rssLink: null
    // linksTitles: ["facebook", "tvn24", "gmail"],
  },
  {
    id: "2",
    title: "main",
    color: "red-400",
    column: 1,
    priority: 1,
    opened: true,
    deletable: true,
    type: "folder",
    // noteInput: null,
    // rssLink: null
    // linksTitles: ["tvn24", "gmail"],
  },
  {
    id: "3",
    title: "fun",
    color: null,
    column: 3,
    priority: 0,
    opened: true,
    deletable: true,
    type: "folder",
    // noteInput: null,
    // rssLink: null
    // linksTitles: ["facebook"],
  },
  {
    id: "4",
    title: "note",
    color: null,
    column: 1,
    priority: 0,
    opened: false,
    deletable: true,
    type: "note",
    noteInput:
      "someText moreText",
    // rssLink: null
    // linksTitles: ["facebook"],
  },
  {
    id: "5",
    title: "dailygalaxy",
    color: null,
    column: 2,
    priority: 0,
    opened: false,
    deletable: true,
    type: "rss",
    date: null,
    description: null,
    itemsPerPage: null,
    items: [],
    rssLink: "https://dailygalaxy.com/feed/",
    // rssLink: "http://rss.sciam.com/basic-science"
    // rssLink: "https://tvn24.pl/najwazniejsze.xml",
    // rssLink: "https://feeds.feedburner.com/sciencealert-latestnews"
    // rssLink: "https://science.sciencemag.org/rss/twis.xml", <- works
    // rssLink: "https://techbeacon.com/rss.xml"
  // rssLink:  "https://feeds.theguardian.com/theguardian/uk-news/rss"
  // rssLink: "http://rss.cnn.com/rss/edition.rss"
  

  },
  // {
  //   id: "6",
  //   title: "sciam",
  //   color: null,
  //   column: 2,
  //   priority: 1,
  //   opened: false,
  //   deletable: true,
  //   type: "rss",
  //   date: null,
  //   description: null,
  //   itemsPerPage: null,
  //   items: [],
  //   rssLink: "http://rss.sciam.com/basic-science",
  // },
  {
    id: "7",
    title: "tvn24",
    color: null,
    column: 2,
    priority: 1,
    opened: false,
    deletable: true,
    type: "rss",
    date: null,
    description: null,
    itemsPerPage: null,
    items: [],
    rssLink: "https://tvn24.pl/najwazniejsze.xml",
  },
  // {
  //   id: "8",
  //   title: "science alert",
  //   color: null,
  //   column: 2,
  //   priority: 1,
  //   opened: false,
  //   deletable: true,
  //   type: "rss",
  //   date: null,
  //   description: null,
  //   itemsPerPage: null,
  //   items: [],
  //   rssLink: "https://feeds.feedburner.com/sciencealert-latestnews",
  // },
  {
    id: "9",
    title: "guardian",
    color: null,
    column: 2,
    priority: 2,
    opened: false,
    deletable: true,
    type: "rss",
    date: null,
    description: null,
    itemsPerPage: null,
    items: [],
    rssLink: "https://feeds.theguardian.com/theguardian/uk-news/rss",
  },
  // {
  //   id: "10",
  //   title: "cnn",
  //   color: null,
  //   column: 2,
  //   priority: 1,
  //   opened: false,
  //   deletable: true,
  //   type: "rss",
  //   date: null,
  //   description: null,
  //   itemsPerPage: null,
  //   items: [],
  //   rssLink: "http://rss.cnn.com/rss/edition.rss",
  // },








]);

export const bookmarksDataState = newRidgeState<SingleBookmarkData[]>([
  {
    id: 1,
    title: "facebook",
    URL: "https://en.wikipedia.org/wiki/Deadly_Rooms_of_Death",
    // tags: ["all", "fun"],
    tags: ["ALL_TAGS", "3"],
  },
  {
    id: 2,
    title: "tvn24 dsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsds",
    URL: "https://en.wikipedia.org/wiki/Webfoot_Technologies",
    // tags: ["all", "main"],
    tags: ["ALL_TAGS", "2"],
  },
  {
    id: 3,
    title: "gmail",
    URL: "https://en.wikipedia.org/wiki/Microsoft_Windows",
    // tags: ["all", "main"],
    tags: ["ALL_TAGS", "2"],
  },
]);

export const bookmarksAllTagsState = newRidgeState<(string | number)[]>(["ALL_TAGS", "2", "3"]);

export const deletedTabState = newRidgeState<string | number>("");
