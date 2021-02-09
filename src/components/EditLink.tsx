import React from "react";
import { useState, useEffect } from "react";
import { produce } from "immer";

import { linksDataState } from "../state/bookmarksAndLinks";
import { bookmarksDataState } from "../state/bookmarksAndLinks";

import { ReactComponent as SaveSVG } from "../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../svgs/alphabet-x.svg";
import { ReactComponent as ChevronDownSVG } from "../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../svgs/chevron-up.svg";

import TagsList_UpperUI from "./UpperUI/TagsList_UpperUI";

interface SingleLinkData {
  title: string;
  URL: string;
  tags: string[];
}

interface Props {
  setEditLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
  editSingleLinkData: SingleLinkData;
}

function EditLink({ setEditLinkVis, editSingleLinkData }: Props): JSX.Element {
  const [linksData, setLinksData] = linksDataState.use();
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  let bookmarkFolders = bookmarksData.filter((obj) => obj.type === "folder");

  const [titleInput, setTitleInput] = useState<string>(
    editSingleLinkData.title
  );

  const [urlInput, setUrlInput] = useState<string>(editSingleLinkData.URL);

  const [tagsInputStr, setTagsInputStr] = useState<string>(
    editSingleLinkData.tags.join(", ")
  );

  // const [tagsInput, setTagsInput] = useState<string[]>([
  //   ...editSingleLinkData.tags,
  // ]);

  const [tagsListVis, setTagsListVis] = useState<boolean>(false);

  const [visibleTags, setVisibleTags] = useState<string[]>(makeInitialTags());

  const [initialTags, setInitialTags] = useState(makeInitialTags());

  // tags won't be visible on first render even though visibleTags length won't be 0 (see useEffect)
  const [isThisTheFirstRender, setIsThisTheFirstRender] = useState(true);

  const [chevronDown, setChevronDown] = useState(true);

  let linkIndex: number;

  linksData.forEach((obj, i) => {
    if (obj.title === editSingleLinkData.title) {
      linkIndex = i;
    }
  });

  // ^  and $ -> beginning and end of the text!
  let regexForTags = /^\w+(,\s\w+)*$/;
  let regexForTitle = /^\w+$/;

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

  let notesTitlesArr: string[] = [];

  bookmarksData.forEach((obj) => {
    if (obj.type === "note") {
      notesTitlesArr.push(obj.title);
    }
  });

  function makeInitialTags(): string[] {
    let tags: string[] = [];

    bookmarkFolders.forEach((obj) => {
      tags.push(obj.title);
    });

    return tags;
  }

  return (
    <div className="absolute z-40 bg-gray-100 w-full pb-3 border">
      <div className="mb-2 mt-2">
        {/* <div
        className="bg-gray-200 pb-3 pt-6 pl-2 pr-1 border-2 border-teal-500 rounded-sm md:mb-48"
        style={{ width: "350px" }}
      > */}
        <div className="flex justify-around mb-2 mt-2">
          <p className="w-10">Title</p>
          {/* <div className="w-full pl-2"> */}
          <input
            type="text"
            className="w-full ml-2 border border-gray-500"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          {/* </div> */}
          <ChevronDownSVG className="h-6 invisible" />
        </div>
        <div className="flex justify-around mb-2">
          <p className="w-10">Link</p>
          {/* <div className="w-full pl-2"> */}
          <input
            type="text"
            className="w-full ml-2 border border-gray-500"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <ChevronDownSVG className="h-6 invisible" />
          {/* </div> */}
        </div>
        <div className="flex justify-start mb-2">
          <p className="w-10">Tags</p>
          {/* <div className="w-full pl-2"> */}
          <input
            type="text"
            className="w-full ml-2 border border-gray-500"
            value={tagsInputStr}
            onChange={(e) => {
              let target = e.target.value;

              setTagsInputStr(target);

              let tagsInputArr = target.split(", ");

              let newVisibleTags: string[] = [];

              visibleTags.forEach((el) => {
                if (tagsInputArr.indexOf(el) === -1) {
                  newVisibleTags.push(el);
                }
              });

              setVisibleTags([...newVisibleTags]);
            }}
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

          {/* </div> */}
        </div>
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
        <div className="w-full pl-4 flex justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();

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

              // !!! diff than newink
              if (
                !titleUniquenessCheck() &&
                titleInput !== editSingleLinkData.title
              ) {
                setTitleUniquenessErrorVis(true);
                return;
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

              setLinksData((previous) =>
                produce(previous, (updated) => {
                  updated[linkIndex].title = titleInput;
                  updated[linkIndex].URL = urlInput;
                  updated[linkIndex].tags = [...tagsInputArr];
                })
              );

              setEditLinkVis((b) => !b);

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

              // function folderTypeCheck(objType: string) {
              //   if (objType === "folder") {
              //     return true;
              //   }

              //   return false;
              // }
            }}
          >
            <SaveSVG className="h-5 fill-current text-gray-900 mr-3 hover:text-green-600" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setEditLinkVis((b) => !b);
            }}
          >
            <CancelSVG className="h-5 fill-current text-gray-900 ml-3 hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditLink;
