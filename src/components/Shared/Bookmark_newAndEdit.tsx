import React from "react";
import { useState, useEffect } from "react";

import {
  bookmarksDataState,
  tabsDataState,
  bookmarksAllTagsState,
} from "../../state/tabsAndBookmarks";

import Bookmark_upper_JSX from "../UpperUI/NewBookmark_UpperUI";
import Bookmark_lower_JSX from "../LowerUI/Bookmark_lowerUI";

import { SingleBookmarkData } from "../../utils/interfaces";

import { UpperVisAction, TabVisAction } from "../../utils/interfaces";

interface Props {
  // setBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  bookmarkComponentType: "new_upperUI" | "new_lowerUI" | "edit";
  // for "edit" type only
  bookmarkId?: string | number | undefined;
  upperVisDispatch?: React.Dispatch<UpperVisAction>;
  visDispatch?: React.Dispatch<TabVisAction>;
  colNumber?: number;
}

function Bookmark_newAndEdit({
  // setBookmarkVis,
  bookmarkComponentType,
  bookmarkId,
  visDispatch,
  upperVisDispatch,
  colNumber,
}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [
    bookmarksAllTagsData,
    setBookmarksAllTagsData,
  ] = bookmarksAllTagsState.use();

  let currentBookmark: SingleBookmarkData | undefined;

  if (bookmarkComponentType === "edit") {
    currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkId)[0];
  }

  const [tabsData, setTabsData] = tabsDataState.use();

  let foldersTab = tabsData.filter((obj) => obj.type === "folder");

  const [titleInput, setTitleInput] = useState<string>(
    bookmarkComponentType === "edit"
      ? (currentBookmark as SingleBookmarkData).title
      : ""
  );

  //  !!! diff in editLink
  const [urlInput, setUrlInput] = useState<string>(
    bookmarkComponentType === "edit"
      ? (currentBookmark as SingleBookmarkData).URL
      : ""
  );

  //  !!! diff in editLink
  const [tagsInputStr, setTagsInputStr] = useState<string>(
    bookmarkComponentType === "edit" ? generateTagNames() : ""
  );

  //   ? (currentLink as SingleLinkData).tags.join(", ")

  function generateTagNames() {
    let arrOut: string[] = [];

    tabsData.forEach((obj) => {
      if (
        (currentBookmark as SingleBookmarkData).tags.indexOf(obj.id) > -1 &&
        obj.id !== "ALL_TAGS"
      ) {
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

  const [tagErrorVis, setTagErrorVis] = useState<boolean>(false);
  const [tagRepeatErrorVis, setTagRepeatErrorVis] = useState<boolean>(false);
  const [titleFormatErrorVis, setTitleFormatErrorVis] = useState<boolean>(
    false
  );
  const [
    titleUniquenessErrorVis,
    setTitleUniquenessErrorVis,
  ] = useState<boolean>(false);
  const [noteErrorVis, setNoteErrorVis] = useState<boolean>(false);

  // ^  and $ -> beginning and end of the text!
  // let regexForTags = /^\w+(,\s\w+)*$/;
  // let regexForTitle = /^\w+$/;
  let regexForTags = /^\w(\s?\w+)*(,\s\w(\s?\w+)*)*$/;
  let regexForTitle = /^\w(\s?\w+)*$/;

  let notesTitlesArr: string[] = [];

  tabsData.forEach((obj) => {
    if (obj.type === "note") {
      notesTitlesArr.push(obj.title);
    }
  });

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
  }, [
    tagsInputStr,
    initialTags,
    setVisibleTags,
    setTagsListVis,
    isThisTheFirstRender,
  ]);




  function makeInitialTags(): string[] {
    let tags: string[] = [];

    foldersTab.forEach((obj) => {
      if (obj.id !== "ALL_TAGS") {
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
    // setBookmarkVis,

    // !!! for lower JSX only, change?
    // currentLink: currentLink,

    tagErrorVis,
    setTagErrorVis,

    tagRepeatErrorVis,
    setTagRepeatErrorVis,

    titleFormatErrorVis,
    setTitleFormatErrorVis,

    titleUniquenessErrorVis,
    setTitleUniquenessErrorVis,

    noteErrorVis,
    setNoteErrorVis,
    regexForTags,
    regexForTitle,
  };

  return (
    <>
      {bookmarkComponentType === "new_upperUI" ? (
        <Bookmark_upper_JSX
          {...bookmarkJSX_props}
          upperVisDispatch={upperVisDispatch as React.Dispatch<UpperVisAction>}
        />
      ) : (
        <Bookmark_lower_JSX
          {...bookmarkJSX_props}
          currentBookmark={currentBookmark}
          bookmarkId={bookmarkId as string | number}
          visDispatch={visDispatch as React.Dispatch<TabVisAction>}
          colNumber={colNumber as number}
        />
      )}
    </>
  );
}

export default Bookmark_newAndEdit;
