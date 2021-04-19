import React, { useState } from "react";

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
  tagsInputStr,
  setTagsInputStr,
  visibleTags,
  setVisibleTags,
  tagsListVis,
  setTagsListVis,
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

    // !!! difference in Link_lower_JSX for edit type

    if (!titleUniquenessCheck()) {
      setTitleUniquenessErrorVis(true);
      setTagsListVis(false);
      return true;
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
      setTagsListVis(false);
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
      if (!tabCorrespondingToTag && tagsInputStr !== "") {
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
        if (tagsInputStr !== "" && tabCorrespondingToTag) {
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
          <p className="w-10">Title</p>

          <input
            type="text"
            className="w-full ml-2 border border-gray-300 pl-px"
            value={titleInput}
            placeholder={"new bookmark title"}
            onChange={(e) => setTitleInput(e.target.value)}
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
            className="w-full ml-2 border border-gray-300 pl-px"
            value={urlInput}
            placeholder={"enter proper URL address"}
            onChange={(e) => setUrlInput(e.target.value)}
            onFocus={(e) => {
              setTagsListVis(false);
            }}
          />
          <ChevronDownSVG className="h-6 invisible" />
        </div>
        <div className="flex justify-start mb-2">
          <p className="w-10">Tags</p>

          <div className="ml-2 relative w-full">
            {/* focus-within:ring-1 focus-within:ring-gray-400 pr-1 */}
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 pl-px pr-5"
                // value={tagsInput.join(", ")}
                value={tagsInputStr}
                placeholder={'tag1, tag2... ("all" tag auto-added)'}
                onChange={(e) => {
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
              {tagsInputStr.length !== 0 && (
                <span
                  className="absolute h-4 bg-white z-50"
                  style={{ top: "7px", right: "2px" }}
                >
                  <XsmallSVG
                    className="h-full text-gray-500 cursor-pointer hover:text-opacity-60"
                    onClick={() => setTagsInputStr("")}
                  />
                </span>
              )}
            </div>

            {tagsListVis && (
              <SelectableList
                setSelectablesInputStr={setTagsInputStr}
                selectablesInputStr={tagsInputStr}
                visibleSelectables={visibleTags}
                marginTop="0px"
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
