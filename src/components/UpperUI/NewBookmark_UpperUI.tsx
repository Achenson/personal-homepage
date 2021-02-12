import React from "react";

import { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { ReactComponent as SaveSVG } from "../../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";
import { ReactComponent as ChevronDownSVG } from "../../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../../svgs/chevron-up.svg";

import TagsList_UpperUI from "./TagsList_UpperUI";

import {
  createBookmarkFolder,
  createNote,
  createRSS,
} from "../../utils/objCreators";

import { produce } from "immer";

import { bookmarksDataState } from "../../state/bookmarksAndLinks";
import { linksDataState } from "../../state/bookmarksAndLinks";

interface Props {
  setNewBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  bookmarkType: "folder" | "note" | "rss";
}

function NewBookmark_UpperUI({
  setNewBookmarkVis,
  bookmarkType,
}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  const [linksData, setLinksData] = linksDataState.use();

  const [bookmarkTitleInput, setBookmarkTitleInput] = useState<string>("");
  const [rssLinkInput, setRssLinkInput] = useState<string>("");

  const [bookmarkColumnInput, setBookmarkColumnInput] = useState<number>(1);
  // const [bookmarkLinksInput, setBookmarkLinksInput] = useState<string[]>([]);

  const [bookmarksErrorVis, setBookmarksErrorVis] = useState<boolean>(false);
  const [
    bookmarksRepeatErrorVis,
    setBookmarksRepeatErrorVis,
  ] = useState<boolean>(false);
  const [
    bookmarksExistenceErrorVis,
    setBookmarksExistenceErrorVis,
  ] = useState<boolean>(false);

  const [titleFormatErrorVis, setTitleFormatErrorVis] = useState<boolean>(
    false
  );
  const [
    titleUniquenessErrorVis,
    setTitleUniquenessErrorVis,
  ] = useState<boolean>(false);
  // for notes
  const [textAreaErrorVis, setTextAreaErrorVis] = useState<boolean>(false);

  const [bookmarksListVis, setBookmarksListVis] = useState<boolean>(false);

  const [visibleBookmarks, setVisibleBookmarks] = useState<string[]>(
    makeInitialBookmarks()
  );

  const [bookmarksInputStr, setBookmarksInputStr] = useState<string>("");

  // ^  and $ -> beginning and end of the text!
  let regexForBookmarks = /^\w+(,\s\w+)*$/;
  let regexForTitle = /^\w+$/;

  const [textAreaValue, setTextAreaValue] = useState<string | null>("");

  const [chevronDown, setChevronDown] = useState(true);

  const [initialBookmarks, setInitialBookmarks] = useState(
    makeInitialBookmarks()
  );

  // tags won't be visible on first render even though visibleTags length won't be 0 (see useEffect)
  const [isThisTheFirstRender, setIsThisTheFirstRender] = useState(true);

  useEffect(() => {
    let newVisibleTags: string[] = [];

    initialBookmarks.forEach((el) => {
      // in new RegExp the \ needs to be escaped!
      let tagRegex = new RegExp(`\\b${el}\\b`);

      if (!tagRegex.test(bookmarksInputStr)) {
        newVisibleTags.push(el);
      }
    });

    setVisibleBookmarks([...newVisibleTags]);

    if (newVisibleTags.length === 0) {
      setBookmarksListVis(false);
    }

    if (newVisibleTags.length > 0 && !isThisTheFirstRender) {
      setBookmarksListVis(true);
    }

    setIsThisTheFirstRender(false);
  }, [
    bookmarksInputStr,
    initialBookmarks,
    setVisibleBookmarks,
    setBookmarksListVis,
  ]);

  function makeInitialBookmarks(): string[] {
    let bookmarks: string[] = [];

    linksData.forEach((obj) => {
      bookmarks.push(obj.title);
    });

    return bookmarks;
  }

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
          <p className="w-32">Title</p>
          {/* <div className="w-full pl-2"> */}
          <input
            type="text"
            className="w-full border border-gray-500"
            value={bookmarkTitleInput}
            placeholder={
              // bookmarkType === "folder"
              //   ? "new folder title"
              //   : "new note title"
              bookmarkType === "folder"
                ? "new folder title"
                : bookmarkType === "note"
                ? "new note title"
                : "new RSS title"
            }
            onChange={(e) => setBookmarkTitleInput(e.target.value)}
          />
          {/* </div> */}
          <ChevronDownSVG className="h-6 invisible" />
        </div>
        <div className="flex justify-around mb-2 mt-2">
          <p className="w-32">Column</p>
          {/* <div className="w-full pl-2"> */}
          <input
            type="number"
            min="1"
            max="4"
            className="w-full border border-gray-500"
            value={bookmarkColumnInput}
            onChange={(e) => setBookmarkColumnInput(parseInt(e.target.value))}
            placeholder={"Enter number between 1 and 4"}
          />
          {/* </div> */}
          <ChevronDownSVG className="h-6 invisible" />
        </div>

        {bookmarkType === "folder" ? (
          <div className="flex justify-around mb-2 mt-2">
            <p className="w-32">Bookmarks</p>
            {/* <div className="w-full pl-2"> */}
            <input
              type="text"
              className="w-full border border-gray-500"
              // value={bookmarkLinksInput.join(", ")}
              value={bookmarksInputStr}
              // onChange={(e) =>
              //   setBookmarkLinksInput([...e.target.value.split(", ")])
              // }

              onChange={(e) => {
                let target = e.target.value;

                setBookmarksInputStr(target);

                let bookmarksInputArr = target.split(", ");

                // setTagsInputArr(tagsInputStr.split(" ,"))

                // let newVisibleTags = [...visibleTags];
                let newVisibleBookmarks: string[] = [];

                visibleBookmarks.forEach((el) => {
                  if (bookmarksInputArr.indexOf(el) === -1) {
                    newVisibleBookmarks.push(el);
                  }
                });

                setVisibleBookmarks([...newVisibleBookmarks]);
              }}
              placeholder={"Choose at least one"}
            />
            {/* </div> */}
            {chevronDown ? (
              <ChevronDownSVG
                className="h-6 cursor-pointer hover:text-blueGray-500"
                onClick={() => {
                  setChevronDown((b) => !b);
                  setBookmarksListVis((b) => !b);
                }}
              />
            ) : (
              <ChevronUpSVG
                className="h-6 cursor-pointer hover:text-blueGray-500"
                onClick={() => {
                  setChevronDown((b) => !b);
                  setBookmarksListVis((b) => !b);
                }}
              />
            )}
          </div>
        ) : null}

        {bookmarkType === "note" ? (
          <div>
            <textarea
              value={textAreaValue as string}
              className="h-full w-full overflow-visible pl-1 pr-1 border font-mono"
              rows={10}
              onChange={(e) => {
                setTextAreaValue(e.target.value);
              }}
            ></textarea>
          </div>
        ) : null}

        {bookmarkType === "rss" ? (
          <div className="flex justify-around mb-2 mt-2">
            <p className="w-32">RSS link</p>
            <div className="w-full pl-2">
              <input
                type="text"
                className="w-full border border-gray-500"
                value={rssLinkInput}
                placeholder="enter RSS link"
                onChange={(e) => setRssLinkInput(e.target.value)}
              />
            </div>
          </div>
        ) : null}

        {bookmarksListVis ? (
          <TagsList_UpperUI
            setTagsInputStr={setBookmarksInputStr}
            tagsInputStr={bookmarksInputStr}
            visibleTags={visibleBookmarks}
            width="228px"
            marginLeft="89px"
          />
        ) : null}

        {titleFormatErrorVis ? (
          <p className={`text-red-600`}>
            Folder title can contain letters, numbers or underscore
          </p>
        ) : null}

        {titleUniquenessErrorVis ? (
          <p className={`text-red-600`}>
            Folder with that title already exists
          </p>
        ) : null}

        {bookmarksErrorVis && bookmarkType === "folder" ? (
          <p className={`text-red-600`}>
            Bookmarks should consist of words separated by coma and space
          </p>
        ) : null}

        {bookmarksExistenceErrorVis && bookmarkType === "folder" ? (
          <p className={`text-red-600`}>
            You can choose from existing bookmarks only
          </p>
        ) : null}

        {bookmarksRepeatErrorVis && bookmarkType === "folder" ? (
          <p className={`text-red-600`}>Each bookmark should be unique</p>
        ) : null}

        {textAreaErrorVis && bookmarkType === "note" ? (
          <p className={`text-red-600`}>Note cannot be empty</p>
        ) : null}

        <div className="flex justify-start mt-6">
          <p className="w-8"></p>
          {/* !!! pl-4 in NewLink */}
          <div className="w-full flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();

                // if(tagsInput.join(", "))

                setBookmarksErrorVis(false);
                setBookmarksRepeatErrorVis(false);
                setTitleFormatErrorVis(false);
                setTitleUniquenessErrorVis(false);
                setBookmarksExistenceErrorVis(false);
                setTextAreaErrorVis(false);

                let bookmarksInputArr = bookmarksInputStr.split(", ");

                if (!regexForTitle.test(bookmarkTitleInput)) {
                  setTitleFormatErrorVis(true);

                  return;
                }

                if (!titleUniquenessCheck()) {
                  setTitleUniquenessErrorVis(true);
                  return;
                }

                if (bookmarkType === "folder") {
                  // if (!regexForBookmarks.test(bookmarkLinksInput.join(", "))) {
                  if (!regexForBookmarks.test(bookmarksInputArr.join(", "))) {
                    setBookmarksErrorVis(true);
                    return;
                  }

                  if (!bookmarkExistenceCheck()) {
                    setBookmarksExistenceErrorVis(true);
                    return;
                  }

                  if (!tagUniquenessCheck()) {
                    setBookmarksRepeatErrorVis(true);
                    return;
                  }

                  
                }

                if (bookmarkType === "note") {
                  if ((textAreaValue as string).length === 0) {
                    setTextAreaErrorVis(true);
                    return;
                  }
                }

                if (bookmarkType === "note") {
                  setBookmarksData((previous) =>
                    produce(previous, (updated) => {
                      updated.push({
                        ...createNote(
                          bookmarkTitleInput,
                          bookmarkColumnInput,
                          0,
                          textAreaValue
                        ),
                      });
                    })
                  );
                }

                if (bookmarkType === "folder") {
                  setBookmarksData((previous) =>
                    produce(previous, (updated) => {
                      updated.push({
                        ...createBookmarkFolder(
                          bookmarkTitleInput,
                          bookmarkColumnInput,
                          0
                        ),
                      });
                    })
                  );

                  // updating links data (tags array)
                  setLinksData((previous) =>
                    produce(previous, (updated) => {
                      updated.forEach((obj) => {
                        if (
                          bookmarksInputArr.indexOf(obj.title) > -1 &&
                          obj.tags.indexOf(bookmarkTitleInput) === -1
                        ) {
                          obj.tags.push(bookmarkTitleInput);
                        }
                      });
                    })
                  );
                }

                if (bookmarkType === "rss") {
                  setBookmarksData((previous) =>
                    produce(previous, (updated) => {
                      updated.push({
                        ...createRSS(
                          bookmarkTitleInput,
                          bookmarkColumnInput,
                          0,
                          rssLinkInput
                        ),
                      });
                    })
                  );
                }

                setNewBookmarkVis((b) => !b);

                function bookmarkExistenceCheck() {
                  let bookmarksArr: string[] = [];

                  linksData.forEach((obj) => {
                    bookmarksArr.push(obj.title);
                  });

                  for (let el of bookmarksInputArr) {
                    if (bookmarksArr.indexOf(el) === -1) {
                      return false;
                    }
                  }

                  return true;
                }

                function tagUniquenessCheck() {
                  let isUnique: boolean = true;

                  bookmarksInputArr.forEach((el, i) => {
                    let tagsInputCopy = [...bookmarksInputArr];
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
                    if (obj.title === bookmarkTitleInput) {
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
                setNewBookmarkVis((b) => !b);
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
