import React, { useState, useRef, useEffect } from "react";

import FocusLock from "react-focus-lock";

import ReactDOM from "react-dom";

import { produce } from "immer";

import { createBookmark, createFolderTab} from "../../utils/objCreators";
import {useTabContext} from "../../utils/tabContext"

import { useBookmarks } from "../../state/useBookmarks";
import { useTabs } from "../../state/useTabs";

import { ReactComponent as SaveSVG } from "../../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";
import { ReactComponent as XsmallSVG } from "../../svgs/x-small.svg";
import { ReactComponent as ChevronDownSVG } from "../../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../../svgs/chevron-up.svg";

// import {
//   // tabsDataState,
//   // bookmarksDataState,
//   // bookmarksAllTagsState,
// } from "../../state/tabsAndBookmarks";

import { SingleBookmarkData, TabVisAction } from "../../utils/interfaces";
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
  bookmarkId: string | number;
  currentBookmark: SingleBookmarkData | undefined;
  // tabVisDispatch: React.Dispatch<TabVisAction>;
  colNumber: number;

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

  // top: number;
  // left: number;
  // tabWidth: number;
}

const errorsAllFalse = {
  tagErrorVis: false,
  tagRepeatErrorVis: false,
  titleFormatErrorVis: false,
  titleUniquenessErrorVis: false,
  noteErrorVis: false,
  rssErrorVis: false,
  invalidLinkVis: false,
};

function Bookmark_lowerUI({
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
  bookmarkId,
  currentBookmark,
  // tabVisDispatch,
  colNumber,

  errors,
  setErrors,

  regexForTags,
  regexForTitle,
  regexForLink,
}: // top,
// left,
// tabWidth,
Props): JSX.Element {
  // const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  // const [bookmarksAllTagsData, setBookmarksAllTagsData] =
  //   bookmarksAllTagsState.use();

  const addBookmark = useBookmarks(store => store.addBookmark);
  const editBookmark = useBookmarks(store => store.editBookmark);
  const bookmarks = useBookmarks(store => store.bookmarks)  
  const bookmarksAllTags = useBookmarks(store => store.bookmarksAllTags)  
  const setBookmarksAllTags = useBookmarks(store => store.setBookmarksAllTags)  

  const addTab = useTabs(store => store.addTab);
  const tabs = useTabs(store => store.tabs);

  // const [tabsData, setTabsData] = tabsDataState.use();

  const tabContext = useTabContext()

  let selectablesRef = useRef<HTMLInputElement>(null);

  let firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstFieldRef.current !== null) {
      firstFieldRef.current.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const [initialTagsInputArr, setInitialTagsInputArr] = useState(() =>
    // selectablesInputStr.split(", ")
    generateTagIds()
  );

  // for disabling save btn
  const [wasAnythingChanged, setWasAnythingChanged] = useState(false);

  function generateTagIds() {
    if (bookmarkComponentType !== "edit") {
      return [];
    }

    let arrOut: (string | number)[] = [];

    selectablesInputStr.split(", ").forEach((el) => {
      let currentTab = tabs.find((obj) => obj.title === el);
      if (currentTab) {
        arrOut.push(currentTab.id);
      }
    });

    return arrOut;
  }

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

    // !!! difference in Bookmark_upper_JSX

    if (bookmarkComponentType === "edit") {
      if (
        !titleUniquenessCheck() &&
        // for editing it is permitted to have same title as before
        titleInput !== (currentBookmark as SingleBookmarkData).title
      ) {
        // setTitleUniquenessErrorVis(true);
        setErrors({
          ...errorsAllFalse,
          titleUniquenessErrorVis: true,
        });
        setSelectablesListVis(false);

        return true;
      }
    } else {
      if (!titleUniquenessCheck()) {
        // setTitleUniquenessErrorVis(true);
        setErrors({
          ...errorsAllFalse,
          titleUniquenessErrorVis: true,
        });
        setSelectablesListVis(false);

        return true;
      }
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

  function addOrEditBookmark() {
    // !!! diff in Bookmark_upper_JSX

    // creating tags for bookmark being added
    let tagsInputArr_ToIds: (string | number)[] = ["ALL_TAGS"];
    // for edit only
    let newTabId: undefined | string | number;

    tagsInputArr.forEach((el) => {
      let tabForCurrentTag = tabs.find((obj) => obj.title === el);

      let sortedTabsInCol = tabs
        .filter((obj) => obj.column === colNumber)
        .sort((a, b) => a.priority - b.priority);

      let newTabPriority =
        sortedTabsInCol[sortedTabsInCol.length - 1].priority + 1;

      // if folder with title corresponding to tag doesn't exist create it...
      if (!tabForCurrentTag && selectablesInputStr !== "") {
        // let newTab = createFolderTab(el, 1, 0);
        let newTab = createFolderTab(el, colNumber, newTabPriority);
        tagsInputArr_ToIds.push(newTab.id);
        // for edit only
        newTabId = newTab.id;

        //... and add new folder tab to the main tags list

        let newBookmarksAllTagsData = [...bookmarksAllTags];

        newBookmarksAllTagsData.push(newTab.id);

        console.log(newBookmarksAllTagsData);

        setBookmarksAllTags([...newBookmarksAllTagsData]);

        // setTabsData((previous) =>
        //   produce(previous, (updated) => {
        //     updated.push(newTab);
        //   })
        // );

        addTab(newTab);





      } else {
        if (selectablesInputStr !== "" && tabForCurrentTag) {
          tagsInputArr_ToIds.push(tabForCurrentTag.id);
        }
      }
    });

    if (bookmarkComponentType === "edit") {
      // setBookmarksData((previous) =>
      //   produce(previous, (updated) => {
      //     let bookmarkToUpdate = updated.find((obj) => obj.id === bookmarkId);
      //     //"if" to get rid of ts error
      //     if (bookmarkToUpdate) {
      //       bookmarkToUpdate.title = titleInput;
      //       bookmarkToUpdate.URL = urlInput;
      //       bookmarkToUpdate.tags = [...tagsInputArr_ToIds];
      //     }
      //   })
      // );

        editBookmark(bookmarkId, titleInput, urlInput, tagsInputArr_ToIds)


      // for deleting empty folder

      let tagsIdsToDelete: (string | number)[] = [];

      initialTagsInputArr.forEach((el) => {
        // if the tag was present in initial tags, but is not present in the end
        if (tagsInputArr_ToIds.indexOf(el) === -1) {
          // all bookmarks except for curren
          let filteredBookmarks = bookmarks.filter(
            (obj) => obj.id !== (currentBookmark as SingleBookmarkData).id
          );

          let isElPresent: boolean = false;

          filteredBookmarks.forEach((obj) => {
            if (obj.tags.indexOf(el) > -1) {
              // tag is present in some other bookmark than this
              isElPresent = true;
              return;
            }
          });

          if (!isElPresent && el !== "ALL_TAGS") {
            tagsIdsToDelete.push(el);
          }
        }
      });

      let bookmarksAllTagsData_new: (string | number)[] = [];

      if (newTabId) {
        bookmarksAllTagsData_new.push(newTabId);
      }

      bookmarksAllTags.forEach((el) => {
        if (tagsIdsToDelete.indexOf(el) === -1) {
          bookmarksAllTagsData_new.push(el);
        }
      });

      setBookmarksAllTags([...bookmarksAllTagsData_new]);
    } else {

      addBookmark(createBookmark(titleInput, urlInput, tagsInputArr_ToIds))

      // setBookmarksData((previous) =>
      //   produce(previous, (updated) => {
      //     updated.push(
      //       createBookmark(titleInput, urlInput, tagsInputArr_ToIds)
      //     );
      //   })
      // );


    }
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
    if (bookmarkComponentType === "edit" && !wasAnythingChanged) {
      return;
    }

    let isThereAnError = errorHandling();
    if (isThereAnError) return;

    // 1. adding or editing bookmark
    // 2. adding folder/s (also to the main state with array of tags) if some tags do not correspond to existing folders
    // 3. (if editing bookmark) for deleting empty folder -> setting bookmarksAllTagsState
    addOrEditBookmark();

    // setBookmarkVis((b) => !b);
    if (bookmarkComponentType === "edit") {
      // tabVisDispatch({ type: "EDIT_BOOKMARK_CLOSE" });
      tabContext.tabVisDispatch({type: "EDIT_BOOKMARK_CLOSE"})
    }

    if (bookmarkComponentType === "new_lowerUI") {
      // tabVisDispatch({ type: "NEW_BOOKMARK_TOOGLE" });
      tabContext.tabVisDispatch({type: "NEW_BOOKMARK_TOOGLE"})
    }
  }

  {
    return bookmarkComponentType === "edit" ? (
      <FocusLock>
        <div
          className=" bg-gray-100 pb-2 pl-1"
          style={{
            boxShadow:
              "inset 11px 11px 4px -10px rgba(0, 0, 0, 0.8), inset -11px -11px 4px -10px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div className="pt-2">
            <div className="flex justify-around mb-2 mt-2">
              <p className="w-10 flex-none">Title</p>

              <input
                type="text"
                ref={firstFieldRef}
                className="w-full border pl-px focus-1"
                value={titleInput}
                placeholder={"new bookmark title"}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                  setWasAnythingChanged(true);
                }}
                onFocus={(e) => {
                  setSelectablesListVis(false);
                }}
              />

              <div className="invisible flex-none" style={{ width: "18px" }} />
            </div>
            <div className="flex justify-around mb-2">
              <p className="w-10 flex-none">Link</p>

              <input
                type="text"
                className="w-full border pl-px focus-1"
                value={urlInput}
                placeholder={"enter proper URL address"}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setWasAnythingChanged(true);
                }}
                onFocus={(e) => {
                  setSelectablesListVis(false);
                }}
              />
              <div className="invisible flex-none" style={{ width: "18px" }} />
            </div>
            <div className="flex justify-start mb-2">
              <p className="w-10 flex-none">Tags</p>

              <div className="relative w-full">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full border pl-px pr-5 focus-1"
                    ref={selectablesRef}
                    // value={tagsInput.join(", ")}
                    value={selectablesInputStr}
                    placeholder={"tag1, tag2..."}
                    onChange={(e) => {
                      setWasAnythingChanged(true);
                      if (!selectablesListVis) setSelectablesListVis(true);

                      let target = e.target.value;

                      setSelectablesInputStr(target);
                    }}
                    onFocus={(e) => {
                      setSelectablesListVis(true);
                    }}

                    // onChange={(e) => setTagsInput([...e.target.value.split(", ")])}
                  />
                  {selectablesInputStr.length !== 0 && (
                    <span
                      className="absolute h-4"
                      style={{ top: "7px", right: "2px" }}
                    >
                      <XsmallSVG
                        className="h-full text-gray-500 cursor-pointer hover:text-opacity-60"
                        onClick={() => {
                          setSelectablesInputStr("");
                          if ((bookmarkComponentType = "edit")) {
                            setWasAnythingChanged(true);
                          }
                        }}
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
                    setWasAnythingClicked={setWasAnythingChanged}
                  />
                )}
              </div>

              <div
                style={{ height: "18px", width: "18px", marginTop: "5px" }}
                className=" flex-none"
              >
                {selectablesListVis ? (
                  <ChevronUpSVG
                    className="h-full cursor-pointer hover:text-blueGray-500 transition-colors duration-75"
                    onClick={() => {
                      setSelectablesListVis((b) => !b);
                    }}
                  />
                ) : (
                  <ChevronDownSVG
                    className="h-full cursor-pointer hover:text-blueGray-500 transition-colors duration-75"
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

            {/* SaveSVG is cut without the <p> - bug? */}
            <div className="mt-5 w-full flex justify-center">
              <button
                className="h-5 w-5 mr-6 focus-2-offset-dark"
                onClick={(e) => {
                  e.preventDefault();
                  saveFunc();
                }}
                aria-label={"Save"}
              >
                <SaveSVG
                  className={`h-5 w-5 fill-current text-black transition-colors duration-75 ${
                    wasAnythingChanged
                      ? "text-gray-900 hover:text-green-600 cursor-pointer"
                      : "text-blueGray-400 cursor-default"
                  }`}
                />
              </button>

              <button
                className="h-5 w-5 focus-2-offset-dark"
                onClick={(e) => {
                  e.preventDefault();
                  // setBookmarkVis((b) => !b);
                  // tabVisDispatch({type: "NEW_BOOKMARK_TOOGLE"})
                  if (bookmarkComponentType === "edit") {
                    // tabVisDispatch({ type: "EDIT_BOOKMARK_CLOSE" });
                    tabContext.tabVisDispatch({type: "EDIT_BOOKMARK_CLOSE"})
                  }

                  if (bookmarkComponentType === "new_lowerUI") {
                    // tabVisDispatch({ type: "NEW_BOOKMARK_TOOGLE" });
                    tabContext.tabVisDispatch({type: "NEW_BOOKMARK_TOOGLE"})
                  }
                }}
                aria-label={"Close"}
              >
                <CancelSVG className="h-5 w-5 fill-current text-black hover:text-red-600 cursor-pointer transition-colors duration-75" />
              </button>
            </div>
          </div>
        </div>
      </FocusLock>
    ) : (
      <FocusLock>
        <div
          className="absolute w-full z-40 bg-gray-50 pb-2 pl-1 border border-blueGray-303 shadow-md"
          // style={{
          //   top: `${top + 32 + document.documentElement.scrollTop}px`,
          //   left: `${left}px`,
          //   width: `${tabWidth}px`,
          // }}
        >
          <div className="mt-2">
            <div className="flex justify-around mb-2 mt-2">
              <p className="w-10 flex-none">Title</p>

              <input
                type="text"
                ref={firstFieldRef}
                className="w-full border pl-px focus-1"
                value={titleInput}
                placeholder={"new bookmark title"}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                  setWasAnythingChanged(true);
                }}
                onFocus={(e) => {
                  setSelectablesListVis(false);
                }}
              />

              <div className="invisible flex-none" style={{ width: "18px" }} />
            </div>
            <div className="flex justify-around mb-2">
              <p className="w-10 flex-none">Link</p>

              <input
                type="text"
                className="w-full border pl-px focus-1"
                value={urlInput}
                placeholder={"enter proper URL address"}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setWasAnythingChanged(true);
                }}
                onFocus={(e) => {
                  setSelectablesListVis(false);
                }}
              />
              <div className="invisible flex-none" style={{ width: "18px" }} />
            </div>
            <div className="flex justify-start mb-2">
              <p className="w-10 flex-none">Tags</p>

              <div className="relative w-full">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full border pl-px pr-5 focus-1"
                    ref={selectablesRef}
                    // value={tagsInput.join(", ")}
                    value={selectablesInputStr}
                    placeholder={"tag1, tag2... [optional]"}
                    onChange={(e) => {
                      setWasAnythingChanged(true);
                      if (!selectablesListVis) setSelectablesListVis(true);

                      let target = e.target.value;

                      setSelectablesInputStr(target);
                    }}
                    onFocus={(e) => {
                      setSelectablesListVis(true);
                      // let target = e.target.value;

                      // setSelectablesInputStr(target);
                    }}

                    // onChange={(e) => setTagsInput([...e.target.value.split(", ")])}
                  />
                  {selectablesInputStr.length !== 0 && (
                    <span
                      className="absolute h-4"
                      style={{ top: "7px", right: "2px" }}
                    >
                      <XsmallSVG
                        className="h-full text-gray-500 cursor-pointer hover:text-opacity-60"
                        onClick={() => {
                          setSelectablesInputStr("");
                          if ((bookmarkComponentType = "edit")) {
                            setWasAnythingChanged(true);
                          }
                        }}
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
                    setWasAnythingClicked={setWasAnythingChanged}
                  />
                )}
              </div>

              <div
                style={{ height: "18px", width: "18px", marginTop: "5px" }}
                className=" flex-none"
              >
                {selectablesListVis ? (
                  <ChevronUpSVG
                    className="h-full cursor-pointer hover:text-blueGray-500 transition-colors duration-75"
                    onClick={() => {
                      setSelectablesListVis((b) => !b);
                    }}
                  />
                ) : (
                  <ChevronDownSVG
                    className="h-full cursor-pointer hover:text-blueGray-500 transition-colors duration-75"
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

            {/* SaveSVG is cut without the <p> - bug? */}
            <div className="mt-5 w-full flex justify-center">
              <button
                className="h-5 w-5 mr-6 focus-2-offset-dark"
                onClick={(e) => {
                  e.preventDefault();
                  saveFunc();
                }}
                aria-label={"Save"}
              >
                <SaveSVG
                  className={`h-5 w-5 fill-current text-black transition-colors duration-75 ${
                    wasAnythingChanged ||
                    bookmarkComponentType === "new_lowerUI"
                      ? "text-gray-900 hover:text-green-600 cursor-pointer"
                      : "text-blueGray-400 cursor-default"
                  }`}
                />
              </button>

              <button
                className="h-5 w-5 focus-2-offset-dark"
                onClick={(e) => {
                  e.preventDefault();
                  // setBookmarkVis((b) => !b);
                  // tabVisDispatch({type: "NEW_BOOKMARK_TOOGLE"})
                  if (bookmarkComponentType === "edit") {
                    // tabVisDispatch({ type: "EDIT_BOOKMARK_CLOSE" });
                    tabContext.tabVisDispatch({type: "EDIT_BOOKMARK_CLOSE"})
                  }

                  if (bookmarkComponentType === "new_lowerUI") {
                    // tabVisDispatch({ type: "NEW_BOOKMARK_TOOGLE" });
                    tabContext.tabVisDispatch({type: "NEW_BOOKMARK_TOOGLE"})
                  }
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
}

export default Bookmark_lowerUI;
