import React, { useEffect } from "react";

import { ReactComponent as SaveSVG } from "../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../svgs/alphabet-x.svg";
import { ReactComponent as ChevronDownSVG } from "../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../svgs/chevron-up.svg";

import TagsList_UpperUI from "./UpperUI/TagsList_UpperUI";

import { useState } from "react";
import { produce } from "immer";

import { linksDataState, bookmarksDataState } from "../state/bookmarksAndLinks";

interface Props {
  setNewLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
  bookmarkTitle: string;
}

function NewLink({ setNewLinkVis, bookmarkTitle }: Props): JSX.Element {
  const [linksData, setLinksData] = linksDataState.use();
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  let bookmarkFolders = bookmarksData.filter((obj) => obj.type === "folder");

  const [titleInput, setTitleInput] = useState<string>("");

  const [urlInput, setUrlInput] = useState<string>("");
  const [tagsInput, setTagsInput] = useState<string[]>([bookmarkTitle]);

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

  const [tagsListVis, setTagsListVis] = useState<boolean>(true);

  const [chevronDown, setChevronDown] = useState(true);

  const [tagsInputStr, setTagsInputStr] = useState<string>("");

  const [visibleTags, setVisibleTags] = useState<string[]>(makeInitialTags());

  const [initialTags, setInitialTags] = useState(makeInitialTags());

  // tags won't be visible on first render even though visibleTags length won't be 0 (see useEffect)
  const [isThisTheFirstRender, setIsThisTheFirstRender] = useState(true);

  let notesTitlesArr: string[] = [];

  bookmarksData.forEach((obj) => {
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
  }, [tagsInputStr, initialTags, setVisibleTags, setTagsListVis]);

  function makeInitialTags(): string[] {
    let tags: string[] = [];

    bookmarkFolders.forEach((obj) => {
      tags.push(obj.title);
    });

    return tags;
  }

  return (
    <div className="absolute z-40 bg-gray-100 w-full pb-3 border">
      <div className="flex justify-around mb-2 mt-2">
        <p className="w-10">Title</p>

        <input
          type="text"
          className="w-full  border"
          value={titleInput}
          placeholder={"new link title"}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <ChevronDownSVG className="h-6 invisible" />
      </div>
      <div className="flex justify-around mb-2">
        <p className="w-10">Link</p>

        <input
          type="text"
          className="w-full  border"
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
          className="w-full border"
          value={tagsInputStr}
          placeholder={"[tag1], [tag2]..."}
          // onChange={(e) => setTagsInput([...e.target.value.split(", ")])}
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
          Tags should consist of words separated by coma and space
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

      <div className="flex justify-start mt-3">
        <p className="w-8"></p>
        <div className="w-full pl-4 flex justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();

              // if(tagsInput.join(", "))

              setTagErrorVis(false);
              setTagRepeatErrorVis(false);
              setTitleFormatErrorVis(false);
              setTitleUniquenessErrorVis(false);
              setNoteErrorVis(false);

              if (!regexForTitle.test(titleInput)) {
                setTitleFormatErrorVis(true);

                return;
              }

              if (!titleUniquenessCheck()) {
                setTitleUniquenessErrorVis(true);
                return;
              }

              if (!regexForTags.test(tagsInput.join(", "))) {
                setTagErrorVis(true);
                return;
              }

              for (let el of tagsInput) {
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
                  updated.push({
                    title: titleInput,
                    URL: urlInput,
                    tags: [...tagsInput],
                  });
                })
              );

              setNewLinkVis((b) => !b);

              function tagUniquenessCheck() {
                let isUnique: boolean = true;

                tagsInput.forEach((el, i) => {
                  let tagsInputCopy = [...tagsInput];
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
            <SaveSVG className="h-5 fill-current text-gray-900 mr-3 hover:text-green-600" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setNewLinkVis((b) => !b);
            }}
          >
            <CancelSVG className="h-5 fill-current text-gray-900 ml-3 hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewLink;
