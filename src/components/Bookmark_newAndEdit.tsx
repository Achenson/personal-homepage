import React from "react";
import { useState, useEffect } from "react";

import { bookmarksDataState, tabsDataState, bookmarksAllTagsState } from "../state/tabsAndBookmarks";

import Bookmark_upper_JSX from "./Bookmark_upper_JSX";
import Bookmark_lower_JSX from "./Bookmark_lower_JSX";

import { SingleBookmarkData } from "../utils/interfaces";

interface Props {
  setBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  bookmarkComponentType: "new_upperUI" | "new_lowerUI" | "edit";
  // for "edit" type only
  bookmarkId?: string | number | undefined;
}

function Bookmark_newAndEdit({
  setBookmarkVis,
  bookmarkComponentType,
  bookmarkId,
}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [bookmarksAllTagsData, setBookmarksAllTagsData] = bookmarksAllTagsState.use();

  let currentBookmark: SingleBookmarkData | undefined;

  if (bookmarkComponentType === "edit") {
    currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkId)[0];
  }

  const [tabsData, setTabsData] = tabsDataState.use();

  let foldersTab = tabsData.filter((obj) => obj.type === "folder");

  const [titleInput, setTitleInput] = useState<string>(
    bookmarkComponentType === "edit" ? (currentBookmark as SingleBookmarkData).title : ""
  );

  //  !!! diff in editLink
  const [urlInput, setUrlInput] = useState<string>(
    bookmarkComponentType === "edit" ? (currentBookmark as SingleBookmarkData).URL : ""
  );

  //  !!! diff in editLink
  const [tagsInputStr, setTagsInputStr] = useState<string>(
    bookmarkComponentType === "edit" ? generateTagNames() : ""
  );

  //   ? (currentLink as SingleLinkData).tags.join(", ")

  function generateTagNames() {
    let arrOut: string[] = [];

    tabsData.forEach((obj) => {
      if ((currentBookmark as SingleBookmarkData).tags.indexOf(obj.id) > -1 && obj.id !== "ALL_TAGS") {
        arrOut.push(obj.title);
      }
    });

    return arrOut.join(", ");
  }

  // const [tagsInputArr, setTagsInputArr] = useState<string[]>([]);

  const [tagsListVis, setTagsListVis] = useState<boolean>(false);

  const [visibleTags, setVisibleTags] = useState<string[]>(makeInitialTags());

  const [initialTags, setInitialTags] = useState(makeInitialTags());

  // tags won't be visible on first render even though visibleTags length won't be 0 (see useEffect)
  const [isThisTheFirstRender, setIsThisTheFirstRender] = useState(true);

  let notesTitlesArr: string[] = [];

  tabsData.forEach((obj) => {
    if (obj.type === "note") {
      notesTitlesArr.push(obj.title);
    }
  });

  // for editingLink only !!!
  //  shouldn't be 0, but got error otherwise
  let bookmarkIndex: number = 0;

  if (bookmarkComponentType === "edit") {
    bookmarksData.forEach((obj, i) => {
      if (obj.title === (currentBookmark as SingleBookmarkData).title) {
        bookmarkIndex = i;
      }
    });
  }

  useEffect(() => {
    let newVisibleTags: string[] = [];

    initialTags.forEach((el) => {
      // in new RegExp the \ needs to be escaped!
      let tagRegex = new RegExp(`\\b${el}\\b`);

      if (!tagRegex.test(tagsInputStr)) {
        newVisibleTags.push(el);
      }
    });

    setVisibleTags([...newVisibleTags]);

    if (newVisibleTags.length === 0) {
      setTagsListVis(false);
    }

    if (newVisibleTags.length > 0 && !isThisTheFirstRender) {
      setTagsListVis(true);
    }

    setIsThisTheFirstRender(false);
  }, [tagsInputStr, initialTags, setVisibleTags, setTagsListVis]);

  function makeInitialTags(): string[] {
    let tags: string[] = [];

    foldersTab.forEach((obj) => {
      if(obj.id !== "ALL_TAGS") {

        tags.push(obj.title);
      }
    });

    return tags;
  }

  const bookmarkJSX_props = {
    titleInput,
    setTitleInput,
    urlInput,
    setUrlInput,
    tagsInputStr,
    setTagsInputStr,
    visibleTags,
    setVisibleTags,
    tagsListVis,
    setTagsListVis,
    notesTitlesArr,
    bookmarkComponentType,
    bookmarkIndex,
    setBookmarkVis,
    // !!! for lower JSX only, change?
    // currentLink: currentLink,
  };

  return (
    <>
      {bookmarkComponentType === "new_upperUI" ? (
        <Bookmark_upper_JSX {...bookmarkJSX_props} />
      ) : (
        <Bookmark_lower_JSX {...bookmarkJSX_props} currentBookmark={currentBookmark} />
      )}
    </>
  );
}

export default Bookmark_newAndEdit;
