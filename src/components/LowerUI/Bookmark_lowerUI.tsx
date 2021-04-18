import React, { useState } from "react";

import { produce } from "immer";

import { createBookmark, createFolderTab } from "../../utils/objCreators";

import { ReactComponent as SaveSVG } from "../../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";
import { ReactComponent as ChevronDownSVG } from "../../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../../svgs/chevron-up.svg";

import {
  tabsDataState,
  bookmarksDataState,
  bookmarksAllTagsState,
} from "../../state/tabsAndBookmarks";

import { SingleBookmarkData } from "../../utils/interfaces";

import { TabVisAction } from "../../utils/interfaces";
import { bookmarkErrors } from "../../utils/errors";
import SelectableList from "../Shared/SelectableList";

interface Props {
  titleInput: string;
  setTitleInput: React.Dispatch<React.SetStateAction<string>>;
  urlInput: string;
  setUrlInput: React.Dispatch<React.SetStateAction<string>>;
  tagsInputStr: string;
  setTagsInputStr: React.Dispatch<React.SetStateAction<string>>;
  visibleTags: string[];
  setVisibleTags: React.Dispatch<React.SetStateAction<string[]>>;
  tagsListVis: boolean;
  setTagsListVis: React.Dispatch<React.SetStateAction<boolean>>;
  notesTitlesArr: string[];
  rssTitlesArr: string[];
  bookmarkComponentType: "new_upperUI" | "new_lowerUI" | "edit";
  bookmarkId: string | number;

  // setBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  currentBookmark: SingleBookmarkData | undefined;
  visDispatch: React.Dispatch<TabVisAction>;
  colNumber: number;

  tagErrorVis: boolean;
  setTagErrorVis: React.Dispatch<React.SetStateAction<boolean>>;

  tagRepeatErrorVis: boolean;
  setTagRepeatErrorVis: React.Dispatch<React.SetStateAction<boolean>>;

  titleFormatErrorVis: boolean;
  setTitleFormatErrorVis: React.Dispatch<React.SetStateAction<boolean>>;

  titleUniquenessErrorVis: boolean;
  setTitleUniquenessErrorVis: React.Dispatch<React.SetStateAction<boolean>>;

  noteErrorVis: boolean;
  setNoteErrorVis: React.Dispatch<React.SetStateAction<boolean>>;
  rssErrorVis: boolean;
  setRssErrorVis: React.Dispatch<React.SetStateAction<boolean>>;
  regexForTags: RegExp;
  regexForTitle: RegExp;
}

function Bookmark_lowerUI({
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
  rssTitlesArr,
  bookmarkComponentType,
  bookmarkId,
  currentBookmark,
  visDispatch,
  colNumber,
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

  rssErrorVis,
  setRssErrorVis,
}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [
    bookmarksAllTagsData,
    setBookmarksAllTagsData,
  ] = bookmarksAllTagsState.use();

  const [tabsData, setTabsData] = tabsDataState.use();

  const [initialTagsInputArr, setInitialTagsInputArr] = useState(() =>
    // tagsInputStr.split(", ")
    generateTagIds()
  );

  // for disabling save btn
  const [wasAnythingChanged, setWasAnythingChanged] = useState(false);

  function generateTagIds() {
    if (bookmarkComponentType !== "edit") {
      return [];
    }

    let arrOut: (string | number)[] = [];

    tagsInputStr.split(", ").forEach((el) => {
      // if ((currentBookmark as SingleBookmarkData).tags.indexOf(obj.id) > -1) {
      //   arrOut.push(obj.id);
      // }

      let currentTab = tabsData.find((obj) => obj.title === el);
      if (currentTab) {
        arrOut.push(currentTab.id);
      }
    });

    return arrOut;
  }

  let tagsInputArr = tagsInputStr.split(", ");

  function errorHandling(): boolean {
    setTagErrorVis(false);
    setTagRepeatErrorVis(false);
    setTitleFormatErrorVis(false);
    setTitleUniquenessErrorVis(false);
    setNoteErrorVis(false);
    setRssErrorVis(false);

    if (!regexForTitle.test(titleInput)) {
      setTitleFormatErrorVis(true);
      setTagsListVis(false);

      return true;
    }

    // !!! difference in Bookmark_upper_JSX

    if (bookmarkComponentType === "edit") {
      if (
        !titleUniquenessCheck() &&
        // for editing it is permitted to have same title as before
        titleInput !== (currentBookmark as SingleBookmarkData).title
      ) {
        setTitleUniquenessErrorVis(true);
        setTagsListVis(false);

        return true;
      }
    } else {
      if (!titleUniquenessCheck()) {
        setTitleUniquenessErrorVis(true);
        setTagsListVis(false);

        return true;
      }
    }

    if (!regexForTags.test(tagsInputArr.join(", ")) && tagsInputStr !== "") {
      setTagErrorVis(true);
      setTagsListVis(false);

      return true;
    }

    for (let el of tagsInputArr) {
      if (notesTitlesArr.indexOf(el) > -1) {
        setNoteErrorVis(true);
        setTagsListVis(false);

        return true;
      }
    }

    for (let el of tagsInputArr) {
      if (rssTitlesArr.indexOf(el) > -1) {
        setRssErrorVis(true);
        setTagsListVis(false);

        return true;
      }
    }

    if (!tagUniquenessCheck()) {
      setTagRepeatErrorVis(true);

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

      bookmarksData.forEach((obj, i) => {
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
      let tabForCurrentTag = tabsData.find((obj) => obj.title === el);

      let sortedTabsInCol = tabsData
        .filter((obj) => obj.column === colNumber)
        .sort((a, b) => a.priority - b.priority);

      let newTabPriority =
        sortedTabsInCol[sortedTabsInCol.length - 1].priority + 1;

      // if folder with title corresponding to tag doesn't exist create it...
      if (!tabForCurrentTag && tagsInputStr !== "") {
        // let newTab = createFolderTab(el, 1, 0);
        let newTab = createFolderTab(el, colNumber, newTabPriority);
        tagsInputArr_ToIds.push(newTab.id);
        // for edit only
        newTabId = newTab.id;

        //... and add new folder tab to the main tags list

        let newBookmarksAllTagsData = [...bookmarksAllTagsData];

        newBookmarksAllTagsData.push(newTab.id);

        console.log(newBookmarksAllTagsData);

        setBookmarksAllTagsData([...newBookmarksAllTagsData]);
        setTabsData((previous) =>
          produce(previous, (updated) => {
            updated.push(newTab);
          })
        );
      } else {
        if (tagsInputStr !== "" && tabForCurrentTag) {
          tagsInputArr_ToIds.push(tabForCurrentTag.id);
        }
      }
    });

    if (bookmarkComponentType === "edit") {
      setBookmarksData((previous) =>
        produce(previous, (updated) => {
          let bookmarkToUpdate = updated.find((obj) => obj.id === bookmarkId);
          //"if" to get rid of ts error
          if (bookmarkToUpdate) {
            bookmarkToUpdate.title = titleInput;
            bookmarkToUpdate.URL = urlInput;
            bookmarkToUpdate.tags = [...tagsInputArr_ToIds];
          }
        })
      );

      // for deleting empty folder

      let tagsIdsToDelete: (string | number)[] = [];

      initialTagsInputArr.forEach((el) => {
        // if the tag was present in initial tags, but is not present in the end
        if (tagsInputArr_ToIds.indexOf(el) === -1) {
          // all bookmarks except for curren
          let filteredBookmarks = bookmarksData.filter(
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

      bookmarksAllTagsData.forEach((el) => {
        if (tagsIdsToDelete.indexOf(el) === -1) {
          bookmarksAllTagsData_new.push(el);
        }
      });

      setBookmarksAllTagsData([...bookmarksAllTagsData_new]);
    } else {
      setBookmarksData((previous) =>
        produce(previous, (updated) => {
          updated.push(
            createBookmark(titleInput, urlInput, tagsInputArr_ToIds)
          );
        })
      );
    }
  }

  return (
    <div className="absolute z-40 bg-gray-100 w-full pb-2 pl-1 border">
      <div className="mt-2">
        <div className="flex justify-around mb-2 mt-2">
          <p className="w-10">Title</p>

          <input
            type="text"
            className="w-full ml-2 border pl-px"
            value={titleInput}
            placeholder={"new bookmark title"}
            onChange={(e) => {
              setTitleInput(e.target.value);
              setWasAnythingChanged(true);
            }}
            onFocus={(e) => {
              setTagsListVis(false);
            }}
          />
          <ChevronDownSVG className="h-6 invisible" />
        </div>
        <div className="flex justify-around mb-2">
          <p className="w-10">Link</p>

          <input
            type="text"
            className="w-full ml-2 border pl-px"
            value={urlInput}
            placeholder={"enter proper URL address"}
            onChange={(e) => {
              setUrlInput(e.target.value);
              setWasAnythingChanged(true);
            }}
            onFocus={(e) => {
              setTagsListVis(false);
            }}
          />
          <ChevronDownSVG className="h-6 invisible" />
        </div>
        <div className="flex justify-start mb-2">
          <p className="w-10">Tags</p>

          <div className="ml-2 relative w-full">
            <input
              type="text"
              className="w-full border pl-px"
              // value={tagsInput.join(", ")}
              value={tagsInputStr}
              placeholder={"tag1, tag2..."}
              onChange={(e) => {
                setWasAnythingChanged(true);

                let target = e.target.value;

                setTagsInputStr(target);

                let tagsInputArr = target.split(", ");

                // setTagsInputArr(tagsInputStr.split(" ,"))

                // let newVisibleTags = [...visibleTags];
                let newVisibleTags: string[] = [];

                visibleTags.forEach((el) => {
                  if (tagsInputArr.indexOf(el) === -1) {
                    newVisibleTags.push(el);
                  }
                });

                setVisibleTags([...newVisibleTags]);
              }}
              onFocus={(e) => {
                setTagsListVis(true);
              }}

              // onChange={(e) => setTagsInput([...e.target.value.split(", ")])}
            />

            {tagsListVis && (
              <SelectableList
                setSelectablesInputStr={setTagsInputStr}
                selectablesInputStr={tagsInputStr}
                visibleSelectables={visibleTags}
                marginTop="0px"
                setWasAnythingClicked={setWasAnythingChanged}
              />
            )}
          </div>

          {tagsListVis ? (
            <ChevronUpSVG
              className="h-6 cursor-pointer hover:text-blueGray-500"
              onClick={() => {
                setTagsListVis((b) => !b);
              }}
            />
          ) : (
            <ChevronDownSVG
              className="h-6 cursor-pointer hover:text-blueGray-500"
              onClick={() => {
                setTagsListVis((b) => !b);
              }}
            />
          )}
        </div>

        {titleFormatErrorVis && (
          <p className={`text-red-600`}>{bookmarkErrors.titleFormat}</p>
        )}

        {titleUniquenessErrorVis && (
          <p className={`text-red-600`}>{bookmarkErrors.titleUniqueness}</p>
        )}

        {tagErrorVis && (
          <p className={`text-red-600`}>{bookmarkErrors.tagFormat}</p>
        )}

        {noteErrorVis && (
          <p className={`text-red-600`}>{bookmarkErrors.noteError}</p>
        )}

        {rssErrorVis && (
          <p className={`text-red-600`}>{bookmarkErrors.rssError}</p>
        )}

        {tagRepeatErrorVis && (
          <p className={`text-red-600`}>{bookmarkErrors.tagRepeat}</p>
        )}

        <div className="flex justify-start mt-5">
          {/* SaveSVG is cut without the <p> - bug? */}
          <p className="w-px"></p>
          <div className="w-full flex justify-center">
            <SaveSVG
              className={`h-5 fill-current text-black mr-3 transition-colors duration-75 ${
                wasAnythingChanged || bookmarkComponentType === "new_lowerUI"
                  ? "text-gray-900 hover:text-green-600 cursor-pointer"
                  : "text-blueGray-400 cursor-default"
              }`}
              onClick={(e) => {
                e.preventDefault();

                if(bookmarkComponentType === "edit" && !wasAnythingChanged) {
                  return
                }

                let isThereAnError = errorHandling();
                if (isThereAnError) return;

                // 1. adding or editing bookmark  
                // 2. adding folder/s (also to the main state with array of tags) if some tags do not correspond to existing folders
                // 3. (if editing bookmark) for deleting empty folder -> setting bookmarksAllTagsState
                addOrEditBookmark();

                // setBookmarkVis((b) => !b);
                if (bookmarkComponentType === "edit") {
                  visDispatch({ type: "EDIT_BOOKMARK_TOOGLE" });
                }

                if (bookmarkComponentType === "new_lowerUI") {
                  visDispatch({ type: "NEW_BOOKMARK_TOOGLE" });
                }
              }}
            />

            <CancelSVG
              className="h-5 fill-current text-black ml-3 hover:text-red-600 cursor-pointer transition-colors duration-75"
              onClick={(e) => {
                e.preventDefault();
                // setBookmarkVis((b) => !b);
                // visDispatch({type: "NEW_BOOKMARK_TOOGLE"})
                if (bookmarkComponentType === "edit") {
                  visDispatch({ type: "EDIT_BOOKMARK_TOOGLE" });
                }

                if (bookmarkComponentType === "new_lowerUI") {
                  visDispatch({ type: "NEW_BOOKMARK_TOOGLE" });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookmark_lowerUI;
