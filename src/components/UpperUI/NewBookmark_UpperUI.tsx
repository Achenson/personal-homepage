import React, { useState } from "react";

import { produce } from "immer";

import TagsList_UpperUI from "../Shared/SelectableList";

import { SingleBookmarkData } from "../../utils/interfaces";

import { createBookmark, createFolderTab } from "../../utils/objCreators";

import { ReactComponent as SaveSVG } from "../../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";
import { ReactComponent as ChevronDownSVG } from "../../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../../svgs/chevron-up.svg";

import { bookmarksDataState, tabsDataState, bookmarksAllTagsState } from "../../state/tabsAndBookmarks";

import {UpperVisAction} from "../../utils/interfaces"

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
  bookmarkComponentType: "new_upperUI" | "new_lowerUI" | "edit";
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  // setBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  // currentLink: SingleLinkData | undefined
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
  upperVisDispatch,
  bookmarkComponentType,
  // setBookmarkVis,
}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [tabsData, setTabsData] = tabsDataState.use();
  const [bookmarksAllTagsData, setBookmarksAllTagsData] = bookmarksAllTagsState.use();

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

  const [chevronDown, setChevronDown] = useState(true);

  // ^  and $ -> beginning and end of the text!
  // let regexForTags = /^\w+(,\s\w+)*$/;
  // let regexForTitle = /^\w+$/;
  let regexForTags = /^\w(\s?\w+)*(,\s\w(\s?\w+)*)*$/
  let regexForTitle = /^\w(\s?\w+)*$/;

  return (
    // opacity cannot be used, because children will inherit it and the text won't be readable
    <div
      className="flex z-50 absolute h-screen w-screen items-center justify-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
    >
      <div
        className="bg-gray-200 pb-3 pt-6 pl-2 pr-1 border-2 border-teal-500 rounded-sm md:mb-48"
        style={{ width: "350px" }}
      >
        <div className="flex justify-around mb-2 mt-2">
          <p className="w-10">Title</p>

          <input
            type="text"
            className="w-full ml-2 border border-gray-500"
            value={titleInput}
            placeholder={"new tab title"}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <ChevronDownSVG className="h-6 invisible" />
        </div>
        <div className="flex justify-around mb-2">
          <p className="w-10">Link</p>

          <input
            type="text"
            className="w-full ml-2 border border-gray-500"
            value={urlInput}
            placeholder={"enter proper URL address"}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <ChevronDownSVG className="h-6 invisible" />
        </div>
        <div className="flex justify-start mb-2">
          <p className="w-10">Tags</p>

          <input
            type="text"
            className="w-full ml-2 border border-gray-500  "
            // value={tagsInput.join(", ")}
            value={tagsInputStr}
            placeholder={"[tag1], [tag2]..."}
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

            // onChange={(e) => setTagsInput([...e.target.value.split(", ")])}
          />
          {chevronDown ? (
            <ChevronDownSVG
              className="h-6 cursor-pointer hover:text-blueGray-500"
              onClick={() => {
                setChevronDown((b) => !b);
                setTagsListVis((b) => !b);
              }}
            />
          ) : (
            <ChevronUpSVG
              className="h-6 cursor-pointer hover:text-blueGray-500"
              onClick={() => {
                setChevronDown((b) => !b);
                setTagsListVis((b) => !b);
              }}
            />
          )}
        </div>

        {tagsListVis && (
          <TagsList_UpperUI
            setTagsInputStr={setTagsInputStr}
            tagsInputStr={tagsInputStr}
            visibleTags={visibleTags}
            width="271px"
            marginLeft="42px"
          />
        )}

        {titleFormatErrorVis && (
          <p className={`text-red-600`}>
            Bookmark title can contain letters, numbers or underscore
          </p>
        )}

        {titleUniquenessErrorVis && (
          <p className={`text-red-600`}>Bookmark with that title already exists</p>
        )}

        {tagErrorVis && (
          <p className={`text-red-600`}>
            Tags should consist of words separated by coma and single space
          </p>
        )}

        {noteErrorVis && (
          <p className={`text-red-600`}>
            Names for tags cannot be the same as Notes titles
          </p>
        )}

        {tagRepeatErrorVis && (
          <p className={`text-red-600`}>Each tag should be unique</p>
        )}

        <div className="flex justify-start mt-6">
          <p className="w-1"></p>
          <div className="w-full flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();

                // if(tagsInput.join(", "))

                setTagErrorVis(false);
                setTagRepeatErrorVis(false);
                setTitleFormatErrorVis(false);
                setTitleUniquenessErrorVis(false);
                setNoteErrorVis(false);

                let tagsInputArr = tagsInputStr.split(", ");

                
                

                if (!regexForTitle.test(titleInput)) {
                  setTitleFormatErrorVis(true);

                  return;
                }

                // !!! difference in Link_lower_JSX for edit type

                if (!titleUniquenessCheck()) {
                  setTitleUniquenessErrorVis(true);
                  return;
                }

                if (!regexForTags.test(tagsInputArr.join(", ")) && tagsInputStr !== "") {
                  setTagErrorVis(true);
                  return;
                }

                for (let el of tagsInputArr) {
                  if (notesTitlesArr.indexOf(el) > -1) {
                    setNoteErrorVis(true);
                    return;
                  }
                }

                if (!tagUniquenessCheck()) {
                  setTagRepeatErrorVis(true);
                  return;
                }

                // !!! diff in Link_lower_JSX

                // all tags always being added
                let tagsInputArr_ToIds: (string | number)[] = ["ALL_TAGS"];
                

                tagsInputArr.forEach((el) => {
                  let filteredTab = tabsData.filter(
                    (obj) => obj.title === el
                  )[0];


                  let sortedTabsInCol = tabsData
                  .filter((obj) => obj.column === 1)
                  .sort((a, b) => a.priority - b.priority);

                let newTabPriority =
                  sortedTabsInCol[sortedTabsInCol.length - 1].priority + 1;

                  // if folder with title corresponding to tag doesn't exist
                  if (!filteredTab && tagsInputStr !== "") {
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
                    // if input is not empty
                    if(tagsInputStr !== "") {

                      tagsInputArr_ToIds.push(filteredTab.id);
                    }
                    
                  }
                });


                setBookmarksData((previous) =>
                  produce(previous, (updated) => {
                    updated.push(
                      createBookmark(titleInput, urlInput, tagsInputArr_ToIds)
                    );
                  })
                );

                // setBookmarkVis((b) => !b);
                upperVisDispatch({type: "NEW_BOOKMARK_TOGGLE"})

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
              }}
            >
              <SaveSVG className="h-5 fill-current text-black mr-3 hover:text-green-600" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                // setBookmarkVis((b) => !b);
                upperVisDispatch({type: "NEW_BOOKMARK_TOGGLE"})
              }}
            >
              <CancelSVG className="h-5 fill-current text-black ml-3 hover:text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewBookmark_UpperUI;
