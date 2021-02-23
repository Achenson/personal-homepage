import React, { useState } from "react";

import { produce } from "immer";

import TagsList_UpperUI from "./UpperUI/TagsList_UpperUI";

import { createLink, createBookmarkFolder } from "../utils/objCreators";

import { ReactComponent as SaveSVG } from "../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../svgs/alphabet-x.svg";
import { ReactComponent as ChevronDownSVG } from "../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../svgs/chevron-up.svg";

import {
  bookmarksDataState,
  linksDataState,
  linksAllTagsState,
} from "../state/bookmarksAndLinks";

import { SingleLinkData } from "../utils/interfaces";

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
  linkComponentType: "new_upperUI" | "new_lowerUI" | "edit";
  linkIndex: number;
  setLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
  currentLink: SingleLinkData | undefined;
}

function Link_lower_JSX({
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
  linkComponentType,
  linkIndex,
  setLinkVis,
  currentLink,
}: Props): JSX.Element {
  const [linksData, setLinksData] = linksDataState.use();
  const [linksAllTagsData, setLinksAllTagsData] = linksAllTagsState.use();

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  const [initialTagsInputArr, setInitialTagsInputArr] = useState(() =>
    // tagsInputStr.split(", ")
    generateTagIds()
  );

  function generateTagIds() {
    let arrOut: (string | number)[] = [];

    tagsInputStr.split(", ").forEach((el) => {
      // if ((currentLink as SingleLinkData).tags.indexOf(obj.id) > -1) {
      //   arrOut.push(obj.id);
      // }

      let filteredBookmark = bookmarksData.filter((obj) => obj.title === el)[0];
      arrOut.push(filteredBookmark.id);
    });

    return arrOut;
  }

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
  let regexForTags = /^\w+(,\s\w+)*$/;
  let regexForTitle = /^\w+$/;

  return (
    <div className="absolute z-40 bg-gray-100 w-full pb-3 border">
      <div className="mb-2 mt-2">
        <div className="flex justify-around mb-2 mt-2">
          <p className="w-10">Title</p>

          <input
            type="text"
            className="w-full ml-2 border border-gray-500"
            value={titleInput}
            placeholder={"new bookmark title"}
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

        {tagsListVis ? (
          <TagsList_UpperUI
            setTagsInputStr={setTagsInputStr}
            tagsInputStr={tagsInputStr}
            visibleTags={visibleTags}
            width="271px"
            marginLeft="42px"
          />
        ) : null}

        {titleFormatErrorVis ? (
          <p className={`text-red-600`}>
            Link title can contain letters, numbers or underscore
          </p>
        ) : null}

        {titleUniquenessErrorVis ? (
          <p className={`text-red-600`}>Link with that title already exists</p>
        ) : null}

        {tagErrorVis ? (
          <p className={`text-red-600`}>
            Tags should consist of words separated by coma and single space
          </p>
        ) : null}

        {noteErrorVis ? (
          <p className={`text-red-600`}>
            Names for tags cannot be the same as Notes titles
          </p>
        ) : null}

        {tagRepeatErrorVis ? (
          <p className={`text-red-600`}>Each tag should be unique</p>
        ) : null}

        <div className="flex justify-start mt-6">
          <p className="w-8"></p>
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

                // !!! difference in Link_upper_JSX

                if (linkComponentType === "edit") {
                  if (
                    !titleUniquenessCheck() &&
                    // for editing it is permitted to have same title as before
                    titleInput !== (currentLink as SingleLinkData).title
                  ) {
                    setTitleUniquenessErrorVis(true);
                    return;
                  }
                } else {
                  if (!titleUniquenessCheck()) {
                    setTitleUniquenessErrorVis(true);
                    return;
                  }
                }

                if (!regexForTags.test(tagsInputArr.join(", "))) {
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

                // !!! diff in Link_upper_JSX

                let tagsInputArr_ToIds: (string | number)[] = [];

                tagsInputArr.forEach((el) => {
                  let filteredBookmark = bookmarksData.filter(
                    (obj) => obj.title === el
                  )[0];

                  // if folder with title corresponding to tag doesn't exist
                  if (!filteredBookmark) {
                    let newBookmark = createBookmarkFolder(el, 1, 0);
                    tagsInputArr_ToIds.push(newBookmark.id);

                    // adding new folder in there was no folder with title as a tag befere

                    let newLinksAllTagsData = [...linksAllTagsData];

                    newLinksAllTagsData.push(newBookmark.id);

                    setLinksAllTagsData([...newLinksAllTagsData]);
                    setBookmarksData((previous) =>
                      produce(previous, (updated) => {
                        updated.push(newBookmark);
                      })
                    );
                  } else {
                    tagsInputArr_ToIds.push(filteredBookmark.id);
                  }
                });

                if (linkComponentType === "edit") {
                  setLinksData((previous) =>
                    produce(previous, (updated) => {
                      updated[linkIndex].title = titleInput;
                      updated[linkIndex].URL = urlInput;
                      // updated[linkIndex].tags = [...tagsInputArr];
                      updated[linkIndex].tags = [...tagsInputArr_ToIds];
                    })
                  );

                  // for deleting empty folder

                  let tagsIdsToDelete: (string | number)[] = [];

                  initialTagsInputArr.forEach((el) => {
                    if (tagsInputArr_ToIds.indexOf(el) === -1) {
                      let filteredLinks = linksData.filter(
                        (obj) => obj.id !== (currentLink as SingleLinkData).id
                      );

                      let isElPresent: boolean = false;

                      filteredLinks.forEach((obj) => {
                        if (obj.tags.indexOf(el) > -1) {
                          isElPresent = true;
                          return;
                        }
                      });


                      if (!isElPresent && el !== "1") {
                        tagsIdsToDelete.push(el);
                      }
                    }
                  });

                  let linksAllTagsData_new: (string | number)[] = [];

                  linksAllTagsData.forEach((el) => {
                    if (tagsIdsToDelete.indexOf(el) === -1) {
                      linksAllTagsData_new.push(el);
                    }
                  });

                  setLinksAllTagsData([...linksAllTagsData_new]);



                } else {
                  setLinksData((previous) =>
                    produce(previous, (updated) => {
                      updated.push(
                        createLink(titleInput, urlInput, tagsInputArr)
                      );
                    })
                  );
                }

                setLinkVis((b) => !b);

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

                  linksData.forEach((obj, i) => {
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
                setLinkVis((b) => !b);
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

export default Link_lower_JSX;
