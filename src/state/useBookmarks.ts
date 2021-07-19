// import { newRidgeState } from "react-ridge-state";

import create from "zustand";
import produce from "immer";

import { SingleBookmarkData } from "../utils/interfaces";

export const useBookmarks = create<{
  deleteBookmark: (
    removeId: string | number,
    singleBookmarkData: SingleBookmarkData
  ) => void;
  setBookmarksAllTags: (newTags: (string|number)[]) => void;
  bookmarksAllTags: (string | number)[];
  bookmarks: SingleBookmarkData[];
}>((set, get) => ({
  deleteBookmark: (removeId, singleBookmarkData) => {
    let tagsIdsToDelete: (string | number)[] = [];

    singleBookmarkData.tags.forEach((el) => {
      let filteredBookmarks = get().bookmarks.filter(
        (obj) => obj.id !== singleBookmarkData.id
      );

      let isElPresent: boolean = false;

      filteredBookmarks.forEach((obj) => {
        if (obj.tags.indexOf(el) > -1) {
          isElPresent = true;
          return;
        }
      });

      if (!isElPresent && el !== "ALL_TAGS") {
        tagsIdsToDelete.push(el);
      }
    });

    let bookmarksAllTagsData_new: (string | number)[] = [];

    get().bookmarksAllTags.forEach((el) => {
      if (tagsIdsToDelete.indexOf(el) === -1) {
        bookmarksAllTagsData_new.push(el);
      }
    });

    // setBookmarksAllTagsData([...bookmarksAllTagsData_new]);

    set((state) => ({
      ...state,
      bookmarks: state.bookmarks.filter(({ id }) => id !== removeId),
      bookmarksAllTags: [...bookmarksAllTagsData_new],
    }));
  },
  
  setBookmarksAllTags: (newTags) => {
    set((state) => ({
      ...state,
      bookmarksAllTags: [...newTags],
    }));
  },
  bookmarksAllTags: ["ALL_TAGS", "2", "3"],
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
}));

export const bookmarksAllTagsState = <(string | number)[]>[
  "ALL_TAGS",
  "2",
  "3",
];

// let deletedTabState = <string | number>"";
