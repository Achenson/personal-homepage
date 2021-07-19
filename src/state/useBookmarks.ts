// import { newRidgeState } from "react-ridge-state";

import create from "zustand";
import produce from "immer";

import { SingleBookmarkData } from "../utils/interfaces";

interface UseBookmarks {
  addBookmark: (singleBookmarkData: SingleBookmarkData) => void;
  editBookmark: (
    editId: string | number,
    title: string,
    URL: string,
    tags: (string | number)[]
  ) => void;
  deleteBookmark: (
    removeId: string | number,
    singleBookmarkData: SingleBookmarkData
  ) => void;
  // changing or adding a tag in all bookmarks
  editTag: (tabID: string | number, arrOfBookmarksNames: string[], bookmarksInputArr: string[]) => void;
  // delete tag in all bookmarks
  deleteTag: (tabTitle: string) => void;
  setBookmarksAllTags: (newTags: (string | number)[]) => void;
  bookmarksAllTags: (string | number)[];
  bookmarks: SingleBookmarkData[];
}

export const useBookmarks = create<UseBookmarks>((set, get) => ({
  addBookmark: (singleBookmarkData) => {
    set(
      produce((state: UseBookmarks) => {
        state.bookmarks.push(singleBookmarkData);
      })
    );
  },
  editBookmark: (editId, title, URL, tags) => {
    set(
      produce((state: UseBookmarks) => {
        let bookmarkToUpdate = state.bookmarks.find((obj) => obj.id === editId);

        if (bookmarkToUpdate) {
          bookmarkToUpdate.title = title;
          bookmarkToUpdate.URL = URL;
          bookmarkToUpdate.tags = [...tags];
        }
      })
    );
  },

  // setBookmarksData((previous) =>
  // produce(previous, (updated) => {
  //   let bookmarkToUpdate = updated.find((obj) => obj.id === bookmarkId);
  //   //"if" to get rid of ts error
  //   if (bookmarkToUpdate) {
  //     bookmarkToUpdate.title = titleInput;
  //     bookmarkToUpdate.URL = urlInput;
  //     bookmarkToUpdate.tags = [...tagsInputArr_ToIds];
  //   }
  // })
  // );

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

  editTag: (tabID, arrOfBookmarksNames, bookmarksInputArr) => {
    set(
      produce((state: UseBookmarks) => {
        state.bookmarks.forEach((obj) => {
          // let bookmarksInputArr = selectablesInputStr.split(", ");

          // make array of missing bookmarks
          let missingBookmarks: string[] = [];

          arrOfBookmarksNames.forEach((el, i) => {
            if (bookmarksInputArr.indexOf(el) === -1) {
              missingBookmarks.push(el);
            }
          });

          // if this bookmarks' title is inside missing bookmarks
          // cut out tabID (current folder) from tags
          if (missingBookmarks.indexOf(obj.title) > -1) {
            obj.tags.splice(obj.tags.indexOf(tabID), 1);
          }

          //  if link title is present in folder's new input for tags & if folder title wasn't already in tags
          // add new tag
          if (
            bookmarksInputArr.indexOf(obj.title) > -1 &&
            obj.tags.indexOf(tabID) === -1
          ) {
            obj.tags.push(tabID);
          }
        });
      })
    );
  },

  deleteTag: (tabTitle) => {
    get().bookmarks.forEach((obj, i) => {
      if (obj.tags.indexOf(tabTitle as string) > -1) {
        set(
          produce((state: UseBookmarks) => {
            state.bookmarks[i].tags.splice(
              obj.tags.indexOf(tabTitle as string),
              1
            );
          })
        );

        // setBookmarksData((previous) =>
        //   produce(previous, (updated) => {
        //     updated[i].tags.splice(
        //       obj.tags.indexOf(tabTitle as string),
        //       1
        //     );
        //   })
        // );
      }
    });
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
