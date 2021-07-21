import React, { useState, useEffect, useRef } from "react";
import FocusLock from "react-focus-lock";

import { produce } from "immer";

import { createBookmark, createFolderTab } from "../../utils/objCreators";
import { uiColorState } from "../../state/colorsState";

import { ReactComponent as SaveSVG } from "../../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";
import { ReactComponent as XsmallSVG } from "../../svgs/x-small.svg";
import { ReactComponent as ChevronDownSVG } from "../../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../../svgs/chevron-up.svg";

// import {
//   // bookmarksDataState,
//   // tabsDataState,
//   // bookmarksAllTagsState,
// } from "../../state/tabsAndBookmarks";


import { useBookmarks } from "../../state/useBookmarks";
import {  useTabs} from "../../state/useTabs";

import {useUpperUiContext} from "../../utils/upperUiContext"

import { UpperVisAction } from "../../utils/interfaces";
import { bookmarkErrors } from "../../utils/errors";
import { handleKeyDown_inner } from "../../utils/func_handleKeyDown_inner";
import SelectableList from "../Shared/SelectableList";

interface Props {
  titleInput: string;
  setTitleInput: React.Dispatch<React.SetStateAction<string>>;
  urlInput: string;
  setUrlInput: React.Dispatch<React.SetStateAction<string>>;
  selectablesInputStr: string;
  setSelectablesInputStr: React.Dispatch<React.SetStateAction<string>>;
  visibleTags: string[];
  setVisibleTags: React.Dispatch<React.SetStateAction<string[]>>;
  initialTags: string[];
  selectablesListVis: boolean;
  setSelectablesListVis: React.Dispatch<React.SetStateAction<boolean>>;
  notesTitlesArr: string[];
  rssTitlesArr: string[];
  bookmarkComponentType: "new_upperUI" | "new_lowerUI" | "edit";
  // upperVisDispatch: React.Dispatch<UpperVisAction>;

  errors: {
    tagErrorVis: boolean;
    tagRepeatErrorVis: boolean;
    titleFormatErrorVis: boolean;
    titleUniquenessErrorVis: boolean;
    noteErrorVis: boolean;
    rssErrorVis: boolean;
    invalidLinkVis: boolean;
  };
  setErrors: React.Dispatch<
    React.SetStateAction<{
      tagErrorVis: boolean;
      tagRepeatErrorVis: boolean;
      titleFormatErrorVis: boolean;
      titleUniquenessErrorVis: boolean;
      noteErrorVis: boolean;
      rssErrorVis: boolean;
      invalidLinkVis: boolean;
    }>
  >;

  regexForTags: RegExp;
  regexForTitle: RegExp;
  regexForLink: RegExp;
}

const errorsAllFalse = {
  tagErrorVis: false,
  tagRepeatErrorVis: false,
  titleFormatErrorVis: false,
  titleUniquenessErrorVis: false,
  noteErrorVis: false,
  rssErrorVis: false,
  invalidLinkVis: false,
  regexForLink: false,
};

function NewBookmark_UpperUI({
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
  // upperVisDispatch,
  bookmarkComponentType,

  errors,
  setErrors,

  regexForTags,
  regexForTitle,
  regexForLink,
}: // setBookmarkVis,
Props): JSX.Element {
  // const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  // const [tabsData, setTabsData] = tabsDataState.use();

  const tabs = useTabs(store => store.tabs)
  const addTab = useTabs(store => store.addTab)

  const bookmarks = useBookmarks(store => store.bookmarks)
  const bookmarksAllTags = useBookmarks(store => store.bookmarksAllTags)  
  const setBookmarksAllTags = useBookmarks(store => store.setBookmarksAllTags)  
  const addBookmark = useBookmarks(store => store.addBookmark)  

  // const [bookmarksAllTagsData, setBookmarksAllTagsData] =
  //   bookmarksAllTagsState.use();

  const [uiColorData, setUiColorData] = uiColorState.use();

  const upperUiContext = useUpperUiContext()

  let selectablesRef = useRef<HTMLInputElement>(null);
  let firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    if (firstFieldRef.current !== null) {
      firstFieldRef.current.focus();
    }
  }, []);

  // let tagsInputArr = selectablesInputStr.split(", ");

  let tagsInputArr: string[] = selectablesInputStr.split(", ");

  let selectablesInputStr_noComma: string;

  if (selectablesInputStr[selectablesInputStr.length - 1] === ",") {
    selectablesInputStr_noComma = selectablesInputStr.slice(
      0,
      selectablesInputStr.length - 1
    );
    tagsInputArr = selectablesInputStr_noComma.split(", ");
  }

  function errorHandling(): boolean {
    if (!regexForTitle.test(titleInput)) {
      // setTitleFormatErrorVis(true);

      setErrors({
        ...errorsAllFalse,
        titleFormatErrorVis: true,
      });

      setSelectablesListVis(false);
      return true;
    }

    // !!! difference in Link_lower_JSX for edit type

    if (!titleUniquenessCheck()) {
      // setTitleUniquenessErrorVis(true);
      setErrors({
        ...errorsAllFalse,
        titleUniquenessErrorVis: true,
      });

      setSelectablesListVis(false);
      return true;
    }

    if (!regexForLink.test(urlInput)) {
      setErrors({
        ...errorsAllFalse,
        invalidLinkVis: true,
      });

      setSelectablesListVis(false);
      return true;
    }

    if (
      !regexForTags.test(tagsInputArr.join(", ")) &&
      selectablesInputStr !== ""
    ) {
      // setTagErrorVis(true);

      setErrors({
        ...errorsAllFalse,
        tagErrorVis: true,
      });

      setSelectablesListVis(false);
      return true;
    }

    for (let el of tagsInputArr) {
      if (notesTitlesArr.indexOf(el) > -1) {
        // setNoteErrorVis(true);
        setErrors({
          ...errorsAllFalse,
          noteErrorVis: true,
        });
        setSelectablesListVis(false);
        return true;
      }
    }

    for (let el of tagsInputArr) {
      if (rssTitlesArr.indexOf(el) > -1) {
        // setRssErrorVis(true);
        setErrors({
          ...errorsAllFalse,
          rssErrorVis: true,
        });
        setSelectablesListVis(false);
        return true;
      }
    }

    if (!tagUniquenessCheck()) {
      // setTagRepeatErrorVis(true);
      setErrors({
        ...errorsAllFalse,
        tagRepeatErrorVis: true,
      });
      setSelectablesListVis(false);
      return true;
    }

    return false;

    function tagUniquenessCheck() {
      let isUnique: boolean = true;

      tagsInputArr.forEach((el, i) => {
        let tagsInputCopy = [...tagsInputArr];
        tagsInputCopy.splice(i, 1);

        if (tagsInputCopy.indexOf(el) > -1) {
          isUnique = false;
          return;
        }
      });

      return isUnique;
    }

    function titleUniquenessCheck() {
      let isUnique: boolean = true;

      bookmarks.forEach((obj, i) => {
        if (obj.title === titleInput) {
          isUnique = false;
        }
      });

      return isUnique;
    }
  }

  function addBookmarkWrapper() {
    // !!! diff in Link_lower_JSX
    // all tags always being added
    let tagsInputArr_ToIds: (string | number)[] = ["ALL_TAGS"];

    tagsInputArr.forEach((el) => {
      let tabCorrespondingToTag = tabs.find((obj) => obj.title === el);

      let sortedTabsInCol = tabs
        .filter((obj) => obj.column === 1)
        .sort((a, b) => a.priority - b.priority);

      let newTabPriority =
        sortedTabsInCol[sortedTabsInCol.length - 1].priority + 1;

      // if folder with title corresponding to tag doesn't exist
      if (!tabCorrespondingToTag && selectablesInputStr !== "") {
        let newTab = createFolderTab(el, 1, newTabPriority);
        tagsInputArr_ToIds.push(newTab.id);

        // adding new folder in there was no folder with title as a tag befere

        let newBookmarksAllTagsData = [...bookmarksAllTags];

        newBookmarksAllTagsData.push(newTab.id);

        setBookmarksAllTags([...newBookmarksAllTagsData]);

        // setTabsData((previous) =>
        //   produce(previous, (updated) => {
        //     updated.push(newTab);
        //   })
        // );

        addTab(newTab);



      } else {
        // if input is not empty (if it is empty, "ALL_TAG" will be the only tag)
        if (selectablesInputStr !== "" && tabCorrespondingToTag) {
          tagsInputArr_ToIds.push(tabCorrespondingToTag.id);
        }
      }
    });

    // setBookmarksData((previous) =>
    //   produce(previous, (updated) => {
    //     updated.push(createBookmark(titleInput, urlInput, tagsInputArr_ToIds));
    //   })
    // );

    addBookmark(createBookmark(titleInput, urlInput, tagsInputArr_ToIds))
  }

  function handleKeyDown(event: KeyboardEvent) {
    handleKeyDown_inner(
      event,
      event.code,
      selectablesListVis,
      setSelectablesListVis,
      setSelectablesInputStr,
      selectablesRef,
      saveFunc
    );
  }

  function saveFunc() {
    let isThereAnError = errorHandling();
    if (isThereAnError) return;

    // 1. adding bookmark  2. adding folder/s if some tags do not correspond to existing folders
    addBookmarkWrapper();
    // upperVisDispatch({ type: "NEW_BOOKMARK_TOGGLE" });
    upperUiContext.upperVisDispatch({type: "NEW_BOOKMARK_TOGGLE"})
  }

  return (
    <FocusLock>
     {/* 
      opacity cannot be used, because children will inherit it and the text
     won't be readable
     */}
      <div
        className="flex z-50 fixed h-full w-screen items-center justify-center"
        style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
        onClick={() => {
          // upperVisDispatch({ type: "NEW_BOOKMARK_TOGGLE" });
          upperUiContext.upperVisDispatch({type: "NEW_BOOKMARK_TOGGLE"})
        }}
      >
        <div
          className={`bg-warmGray-100 pb-2 pt-3 pl-2 pr-0.5 border-2 border-${uiColorData} rounded-sm md:mb-48`}
          style={{ width: "350px" }}
          onClick={(e) => {
            e.stopPropagation();
            return;
          }}
        >
          <p className="text-center">New bookmark</p>
          <div className="flex justify-around mb-2 mt-3">
            <p className="w-11 flex-none">Title</p>

            <input
              type="text"
              ref={firstFieldRef}
              className="w-full border pl-px focus-1"
              value={titleInput}
              placeholder={"new bookmark title"}
              onChange={(e) => setTitleInput(e.target.value)}
              onFocus={(e) => {
                setSelectablesListVis(false);
              }}
            />
            {/* <ChevronDownSVG className="h-6 invisible" /> */}
            <div className="w-5 flex-none"></div>
          </div>
          <div className="flex justify-around mb-2">
            <p className="w-11 flex-none">Link</p>

            <input
              type="text"
              className="w-full border pl-px focus-1"
              value={urlInput}
              placeholder={"enter proper URL address"}
              onChange={(e) => setUrlInput(e.target.value)}
              onFocus={(e) => {
                setSelectablesListVis(false);
              }}
            />
            {/* <ChevronDownSVG className="h-6 invisible" /> */}
            <div className="w-5 flex-none"></div>
          </div>
          <div className="flex justify-start mb-2">
            <p className="w-11 flex-none">Tags</p>

            <div className="relative w-full">
              {/* focus-within:ring-1 focus-within:ring-gray-400 pr-1 */}
              <div className="relative">
                <input
                  type="text"
                  className="w-full border pl-px pr-5 focus-1"
                  ref={selectablesRef}
                  // value={tagsInput.join(", ")}
                  value={selectablesInputStr}
                  placeholder={'tag1, tag2... [optional]'}
                  onChange={(e) => {
                    if (!selectablesListVis) setSelectablesListVis(true);

                    let target = e.target.value;

                    setSelectablesInputStr(target);

                    // let tagsInputArr = target.split(", ");
                    // // setTagsInputArr(selectablesInputStr.split(" ,"))
                    // // let newVisibleTags = [...visibleTags];
                    // let newVisibleTags: string[] = [];

                    // visibleTags.forEach((el) => {
                    //   if (tagsInputArr.indexOf(el) === -1) {
                    //     newVisibleTags.push(el);
                    //   }
                    // });

                    // setVisibleTags([...newVisibleTags]);
                  }}
                  onFocus={(e) => {
                    setSelectablesListVis(true);
                  }}

                  // onChange={(e) => setTagsInput([...e.target.value.split(", ")])}
                />
                {selectablesInputStr.length !== 0 && (
                  <span
                    className="absolute h-4 bg-white z-50"
                    style={{ top: "7px", right: "2px" }}
                  >
                    <XsmallSVG
                      className="h-full text-gray-500 cursor-pointer hover:text-opacity-60"
                      onClick={() => setSelectablesInputStr("")}
                    />
                  </span>
                )}
              </div>

              {selectablesListVis && (
                <SelectableList
                  setSelectablesInputStr={setSelectablesInputStr}
                  selectablesInputStr={selectablesInputStr}
                  visibleSelectables={visibleTags}
                  initialSelectables={initialTags}
                  setSelectablesVis={setSelectablesListVis}
                  marginTop="0px"
                />
              )}
            </div>

            <div className="w-5 h-5 mt-1 flex-none">
              {selectablesListVis ? (
                <ChevronUpSVG
                  className="h-full cursor-pointer hover:text-blueGray-500"
                  onClick={() => {
                    setSelectablesListVis((b) => !b);
                  }}
                />
              ) : (
                <ChevronDownSVG
                  className="h-full cursor-pointer hover:text-blueGray-500"
                  onClick={() => {
                    setSelectablesListVis((b) => !b);
                  }}
                />
              )}
            </div>
          </div>

          {errors.titleFormatErrorVis && (
            <p className={`text-red-600`}>{bookmarkErrors.titleFormat}</p>
          )}

          {errors.titleUniquenessErrorVis && (
            <p className={`text-red-600`}>{bookmarkErrors.titleUniqueness}</p>
          )}

          {errors.invalidLinkVis && (
            <p className={`text-red-600`}>{bookmarkErrors.invalidLink}</p>
          )}

          {errors.tagErrorVis && (
            <p className={`text-red-600`}>{bookmarkErrors.tagFormat}</p>
          )}

          {errors.noteErrorVis && (
            <p className={`text-red-600`}>{bookmarkErrors.noteError}</p>
          )}

          {errors.rssErrorVis && (
            <p className={`text-red-600`}>{bookmarkErrors.rssError}</p>
          )}

          {errors.tagRepeatErrorVis && (
            <p className={`text-red-600`}>{bookmarkErrors.tagRepeat}</p>
          )}

          <div className="w-full flex justify-center mt-5">
            <button
              className="h-5 w-5 mr-6 focus-2-offset-dark"
              onClick={(e) => {
                e.preventDefault();

                saveFunc();
              }}
              aria-label={"Save"}
            >
              <SaveSVG className="h-5 w-5 fill-current text-black hover:text-green-600 cursor-pointer transition-colors duration-75" />
            </button>

            <button
              className="h-5 w-5 focus-2-offset-dark"
              onClick={(e) => {
                e.preventDefault();
                // setBookmarkVis((b) => !b);
                // upperVisDispatch({ type: "NEW_BOOKMARK_TOGGLE" });
                upperUiContext.upperVisDispatch({type: "NEW_BOOKMARK_TOGGLE"})
              }}
              aria-label={"Close"}
            >
              <CancelSVG className="h-5 w-5 fill-current text-black hover:text-red-600 cursor-pointer transition-colors duration-75" />
            </button>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}

export default NewBookmark_UpperUI;
