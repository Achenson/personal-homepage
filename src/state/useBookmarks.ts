// import { newRidgeState } from "react-ridge-state";

import create from "zustand";
import produce from "immer";

import { SingleBookmarkData } from "../utils/interfaces";


export const useBookmarks = create<{
  bookmarks: SingleBookmarkData[];
  deleteBookmark: (removeId: string | number) => void;
}>((set) => ({
  bookmarks: [
    {
      id: 1,
      title: "facebook",
      URL: "https://en.wikipedia.org/wiki/Deadly_Rooms_of_Death",
      // tags: ["all", "fun"],
      tags: ["ALL_TAGS", "3"],
    },
    {
      id: 2,
      title: "tvn24 d",
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
    {
      id: 4,
      title: "oneMore",
      URL: "https://en.wikipedia.org/wiki/Microsoft_Windows",
      // tags: ["all", "main"],
      tags: ["ALL_TAGS"],
    },
    {
      id: 5,
      title: "anotherOne",
      URL: "https://en.wikipedia.org/wiki/Microsoft_Windows",
      // tags: ["all", "main"],
      tags: ["ALL_TAGS"],
    },
  ],
  deleteBookmark: (removeId: string | number) =>
    set((state) => ({
      ...state,
      bookmarks: state.bookmarks.filter(({ id }) => id !== removeId),
    })),
}));


// let bookmarksAllTagsState = <(string | number)[]>["ALL_TAGS", "2", "3"];

// let deletedTabState = <string | number>"";
