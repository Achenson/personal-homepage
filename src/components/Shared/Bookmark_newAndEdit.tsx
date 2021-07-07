import React from "react";
import { useState, useEffect } from "react";

import {
  bookmarksDataState,
  tabsDataState,
  bookmarksAllTagsState,
} from "../../state/tabsAndBookmarks";

import NewBookmark_UpperUI from "../UpperUI/NewBookmark_UpperUI";
import Bookmark_lowerUI from "../LowerUI/Bookmark_lowerUI";

import { SingleBookmarkData } from "../../utils/interfaces";

import { UpperVisAction, TabVisAction } from "../../utils/interfaces";

interface Props {
  // setBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  bookmarkComponentType: "new_upperUI" | "new_lowerUI" | "edit";

  upperVisDispatch?: React.Dispatch<UpperVisAction>;
  tabVisDispatch?: React.Dispatch<TabVisAction>;
  colNumber?: number;

  // for "edit" type only
  bookmarkId?: string | number | undefined;
  // for lowerUI newBookmark only
  tabTitle?: string;
  // top?: number;
  // left?: number;
  // tabWidth?: number;
}

const errorsAllFalse = {
  tagErrorVis: false,
  tagRepeatErrorVis: false,
  titleFormatErrorVis: false,
  titleUniquenessErrorVis: false,
  noteErrorVis: false,
  rssErrorVis: false,
  invalidLinkVis: false
};

function Bookmark_newAndEdit({
  // setBookmarkVis,
  bookmarkComponentType,
  bookmarkId,
  tabTitle,
  tabVisDispatch,
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
  const [selectablesInputStr, setSelectablesInputStr] = useState<string>(
    // bookmarkComponentType === "edit" ? generateTagNames() : ""
    () => generateTagNames()
  );

  //   ? (currentLink as SingleLinkData).tags.join(", ")

  function generateTagNames() {
    if (bookmarkComponentType === "new_upperUI") {
      return "";
    }

    if (bookmarkComponentType === "new_lowerUI") {
      
      if (tabTitle !== tabsData.find(obj=> obj.id === "ALL_TAGS")?.title) {
        return tabTitle as string;
      } else return ""
    }

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

  const [selectablesListVis, setSelectablesListVis] = useState<boolean>(false);

  const [visibleTags, setVisibleTags] = useState<string[]>(() =>
    makeInitialTags()
  );

  const [initialTags, setInitialTags] = useState(() => makeInitialTags());

  // tags won't be visible on first render even though visibleTags length won't be 0 (see useEffect)
  // xx const [isThisTheFirstRender, setIsThisTheFirstRender] = useState(true);

  // const [tagErrorVis, setTagErrorVis] = useState<boolean>(false);
  // const [tagRepeatErrorVis, setTagRepeatErrorVis] = useState<boolean>(false);
  // const [titleFormatErrorVis, setTitleFormatErrorVis] = useState<boolean>(
  //   false
  // );
  // const [
  //   titleUniquenessErrorVis,
  //   setTitleUniquenessErrorVis,
  // ] = useState<boolean>(false);
  // const [noteErrorVis, setNoteErrorVis] = useState<boolean>(false);
  // const [rssErrorVis, setRssErrorVis] = useState<boolean>(false);

  const [errors, setErrors] = useState({
    ...errorsAllFalse,
  });

  // ^  and $ -> beginning and end of the text!
  // let regexForTags = /^\w+(,\s\w+)*$/;
  // let regexForTitle = /^\w+$/;
  let regexForTags = /^\w(\s?\w+)*(,\s\w(\s?\w+)*)*$/;
  let regexForTitle = /^\w(\s?\w+)*$/;
   // https://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript
   const regexForLink =
   /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;



  let notesTitlesArr: string[] = [];
  let rssTitlesArr: string[] = [];

  tabsData.forEach((obj) => {
    if (obj.type === "note") {
      notesTitlesArr.push(obj.title);
    }

    if (obj.type === "rss") {
      rssTitlesArr.push(obj.title);
    }
  });

  useEffect(() => {
    // let newVisibleTags: string[] = [];

    // initialTags.forEach((el) => {
    //   // in new RegExp the \ needs to be escaped!
    //   let tagRegex = new RegExp(`\\b${el}\\b`);

    //   if (!tagRegex.test(selectablesInputStr)) {
    //     newVisibleTags.push(el);
    //   }
    // });

    // setVisibleTags([...newVisibleTags]);

    // if (newVisibleTags.length === 0) {
    //   setSelectablesListVis(false);
    // }

    let newVisibleTags: string[] = [];

    let selectablesInputArr = selectablesInputStr.split(", ");

    let lastSelectablesArrEl =
      selectablesInputArr[selectablesInputArr.length - 1];

    function letterToLetterMatch(lastInput: string, el: string) {
      for (let i = 0; i < lastInput.length; i++) {
        if (
          lastInput[i] !== el[i] &&
          // returns true if lastInput is present in initial bookmarks
          initialTags.indexOf(lastInput) === -1 &&
          // returns true is last char is a comma
          selectablesInputStr[selectablesInputStr.length - 1] !== ","
        ) {
          return false;
        }
      }
      return true;
    }

    initialTags.forEach((el) => {
      // in new RegExp the \ needs to be escaped!
      // \b -> word boundary
      let tagRegex = new RegExp(`\\b${el}\\b`);

      // a selectable is visible only if the input does not contain it
      if (
        !tagRegex.test(selectablesInputStr) &&
        (letterToLetterMatch(lastSelectablesArrEl, el) ||
          selectablesInputStr.length === 0)
      ) {
        newVisibleTags.push(el);
      }
    });

    setVisibleTags([...newVisibleTags]);

    if (newVisibleTags.length === 0) {
      setSelectablesListVis(false);
    }
  }, [
    selectablesInputStr,
    initialTags,
    setVisibleTags,
    setSelectablesListVis,
    // isThisTheFirstRender,
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

  const bookmark_props = {
    titleInput,
    setTitleInput,
    urlInput,
    setUrlInput,
    selectablesInputStr,
    setSelectablesInputStr,
    visibleTags,
    setVisibleTags,
    initialTags,
    selectablesListVis,
    setSelectablesListVis,
    notesTitlesArr,
    rssTitlesArr,
    bookmarkComponentType,

    errors,
    setErrors,

    
    regexForTags,
    regexForTitle,
    regexForLink
  };

  return (
    <>
      {bookmarkComponentType === "new_upperUI" ? (
        <NewBookmark_UpperUI
          {...bookmark_props}
          upperVisDispatch={upperVisDispatch as React.Dispatch<UpperVisAction>}
        />
      ) : (
        <Bookmark_lowerUI
          {...bookmark_props}
          currentBookmark={currentBookmark}
          bookmarkId={bookmarkId as string | number}
          tabVisDispatch={tabVisDispatch as React.Dispatch<TabVisAction>}
          colNumber={colNumber as number}
          // top={top as number}
          // left={left as number}
          // tabWidth={tabWidth as number}
        />
      )}
    </>
  );
}

export default Bookmark_newAndEdit;
