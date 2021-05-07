import React, { useState, useEffect, useRef } from "react";

import { produce } from "immer";

import { createBookmark, createFolderTab } from "../../utils/objCreators";

import { ReactComponent as SaveSVG } from "../../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";
import { ReactComponent as XsmallSVG } from "../../svgs/x-small.svg";
import { ReactComponent as ChevronDownSVG } from "../../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../../svgs/chevron-up.svg";

import {
  bookmarksDataState,
  tabsDataState,
  bookmarksAllTagsState,
} from "../../state/tabsAndBookmarks";

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
  selectablesListVis: boolean;
  setSelectablesListVis: React.Dispatch<React.SetStateAction<boolean>>;
  notesTitlesArr: string[];
  rssTitlesArr: string[];
  bookmarkComponentType: "new_upperUI" | "new_lowerUI" | "edit";
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  // setBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  // currentLink: SingleLinkData | undefined
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

function NewBookmark_UpperUI({
  titleInput,
  setTitleInput,
  urlInput,
  setUrlInput,
  selectablesInputStr,
  setSelectablesInputStr,
  visibleTags,
  setVisibleTags,
  selectablesListVis,
  setSelectablesListVis,
  notesTitlesArr,
  rssTitlesArr,
  upperVisDispatch,
  bookmarkComponentType,
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
  rssErrorVis,
  setRssErrorVis,
  regexForTags,
  regexForTitle,
}: // setBookmarkVis,
Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [tabsData, setTabsData] = tabsDataState.use();
  const [
    bookmarksAllTagsData,
    setBookmarksAllTagsData,
  ] = bookmarksAllTagsState.use();

  let selectablesRef = useRef();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  let tagsInputArr = selectablesInputStr.split(", ");

  function errorHandling(): boolean {
    setTagErrorVis(false);
    setTagRepeatErrorVis(false);
    setTitleFormatErrorVis(false);
    setTitleUniquenessErrorVis(false);
    setNoteErrorVis(false);
    setRssErrorVis(false);

    if (!regexForTitle.test(titleInput)) {
      setTitleFormatErrorVis(true);
      setSelectablesListVis(false);
      return true;
    }

    // !!! difference in Link_lower_JSX for edit type

    if (!titleUniquenessCheck()) {
      setTitleUniquenessErrorVis(true);
      setSelectablesListVis(false);
      return true;
    }

    if (
      !regexForTags.test(tagsInputArr.join(", ")) &&
      selectablesInputStr !== ""
    ) {
      setTagErrorVis(true);
      setSelectablesListVis(false);
      return true;
    }

    for (let el of tagsInputArr) {
      if (notesTitlesArr.indexOf(el) > -1) {
        setNoteErrorVis(true);
        setSelectablesListVis(false);
        return true;
      }
    }

    for (let el of tagsInputArr) {
      if (rssTitlesArr.indexOf(el) > -1) {
        setRssErrorVis(true);
        setSelectablesListVis(false);
        return true;
      }
    }

    if (!tagUniquenessCheck()) {
      setTagRepeatErrorVis(true);
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

      bookmarksData.forEach((obj, i) => {
        if (obj.title === titleInput) {
          isUnique = false;
        }
      });

      return isUnique;
    }
  }

  function addBookmark() {
    // !!! diff in Link_lower_JSX
    // all tags always being added
    let tagsInputArr_ToIds: (string | number)[] = ["ALL_TAGS"];

    tagsInputArr.forEach((el) => {
      let tabCorrespondingToTag = tabsData.find((obj) => obj.title === el);

      let sortedTabsInCol = tabsData
        .filter((obj) => obj.column === 1)
        .sort((a, b) => a.priority - b.priority);

      let newTabPriority =
        sortedTabsInCol[sortedTabsInCol.length - 1].priority + 1;

      // if folder with title corresponding to tag doesn't exist
      if (!tabCorrespondingToTag && selectablesInputStr !== "") {
        let newTab = createFolderTab(el, 1, newTabPriority);
        tagsInputArr_ToIds.push(newTab.id);

        // adding new folder in there was no folder with title as a tag befere

        let newBookmarksAllTagsData = [...bookmarksAllTagsData];

        newBookmarksAllTagsData.push(newTab.id);

        setBookmarksAllTagsData([...newBookmarksAllTagsData]);

        setTabsData((previous) =>
          produce(previous, (updated) => {
            updated.push(newTab);
          })
        );
      } else {
        // if input is not empty (if it is empty, "ALL_TAG" will be the only tag)
        if (selectablesInputStr !== "" && tabCorrespondingToTag) {
          tagsInputArr_ToIds.push(tabCorrespondingToTag.id);
        }
      }
    });

    setBookmarksData((previous) =>
      produce(previous, (updated) => {
        updated.push(createBookmark(titleInput, urlInput, tagsInputArr_ToIds));
      })
    );
  }

  function handleKeyDown(event: KeyboardEvent) {
    handleKeyDown_inner(
      event.code,
      selectablesListVis,
      setSelectablesListVis,
      setSelectablesInputStr,
      selectablesRef
    );
  }
  return (
    // opacity cannot be used, because children will inherit it and the text won't be readable
    <div
      className="flex z-50 absolute h-screen w-screen items-center justify-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
    >
      <div
        className="bg-gray-200 pb-2 pt-3 pl-2 pr-1 border-2 border-teal-500 rounded-sm md:mb-48"
        style={{ width: "350px" }}
      >
        <p className="text-center">New bookmark</p>
        <div className="flex justify-around mb-2 mt-3">
          <p className="w-11 flex-none">Title</p>

          <input
            type="text"
            className="w-full border border-gray-300 pl-px"
            value={titleInput}
            placeholder={"new bookmark title"}
            onChange={(e) => setTitleInput(e.target.value)}
            onFocus={(e) => {
              setSelectablesListVis(false);
            }}
          />
          <ChevronDownSVG className="h-6 invisible" />
        </div>
        <div className="flex justify-around mb-2">
          <p className="w-11 flex-none">Link</p>

          <input
            type="text"
            className="w-full border border-gray-300 pl-px"
            value={urlInput}
            placeholder={"enter proper URL address"}
            onChange={(e) => setUrlInput(e.target.value)}
            onFocus={(e) => {
              setSelectablesListVis(false);
            }}
          />
          <ChevronDownSVG className="h-6 invisible" />
        </div>
        <div className="flex justify-start mb-2">
          <p className="w-11 flex-none">Tags</p>

          <div className="relative w-full">
            {/* focus-within:ring-1 focus-within:ring-gray-400 pr-1 */}
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 pl-px pr-5"
                // @ts-ignore
                ref={selectablesRef}
                // value={tagsInput.join(", ")}
                value={selectablesInputStr}
                placeholder={'tag1, tag2... ("all" tag auto-added)'}
                onChange={(e) => {
                  let target = e.target.value;

                  setSelectablesInputStr(target);

                  let tagsInputArr = target.split(", ");
                  // setTagsInputArr(selectablesInputStr.split(" ,"))
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
                setSelectablesVis={setSelectablesListVis}
                marginTop="0px"
              />
            )}
          </div>

          <div className="w-5 h-5 mt-1">
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
          <p className="w-1"></p>
          <div className="w-full flex justify-center">
            <SaveSVG
              className="h-5 fill-current text-black mr-3 hover:text-green-600 cursor-pointer transition-colors duration-75"
              onClick={(e) => {
                e.preventDefault();

                let isThereAnError = errorHandling();
                if (isThereAnError) return;

                // 1. adding bookmark  2. adding folder/s if some tags do not correspond to existing folders
                addBookmark();
                upperVisDispatch({ type: "NEW_BOOKMARK_TOGGLE" });
              }}
            />

            <CancelSVG
              className="h-5 fill-current text-black ml-3 hover:text-red-600 cursor-pointer transition-colors duration-75"
              onClick={(e) => {
                e.preventDefault();
                // setBookmarkVis((b) => !b);
                upperVisDispatch({ type: "NEW_BOOKMARK_TOGGLE" });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewBookmark_UpperUI;
