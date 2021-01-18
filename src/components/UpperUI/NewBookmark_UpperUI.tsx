import React from "react";

import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { ReactComponent as SaveSVG } from "../../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";
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
  const [bookmarkLinksInput, setBookmarkLinksInput] = useState<string[]>([]);

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

  // ^  and $ -> beginning and end of the text!
  let regexForBookmarks = /^\w+(,\s\w+)*$/;
  let regexForTitle = /^\w+$/;

  const [textAreaValue, setTextAreaValue] = useState<string | null>("");

  return (
    // opacity cannot be used, because children will inherit it and the text won't be readable
    <div
      className="flex z-50 absolute h-screen w-screen items-center justify-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
    >
      <div
        className="bg-gray-200 pb-3 pt-6 border-2 border-teal-500 rounded-sm md:mb-48"
        style={{ width: "350px" }}
      >
        <form action="" className="pl-2 pr-4">
          <div className="flex justify-around mb-2 mt-2">
            <p className="w-32">Title</p>
            <div className="w-full pl-2">
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
            </div>
          </div>
          <div className="flex justify-around mb-2 mt-2">
            <p className="w-32">Column</p>
            <div className="w-full pl-2">
              <input
                type="number"
                min="1"
                max="4"
                className="w-full border border-gray-500"
                value={bookmarkColumnInput}
                onChange={(e) =>
                  setBookmarkColumnInput(parseInt(e.target.value))
                }
                placeholder={"Enter number between 1 and 4"}
              />
            </div>
          </div>

          {bookmarkType === "folder" ? (
            <div className="flex justify-around mb-2 mt-2">
              <p className="w-32">Bookmarks</p>
              <div className="w-full pl-2">
                <input
                  type="text"
                  className="w-full border border-gray-500"
                  value={bookmarkLinksInput.join(", ")}
                  onChange={(e) =>
                    setBookmarkLinksInput([...e.target.value.split(", ")])
                  }
                  placeholder={"Choose at least one"}
                />
              </div>
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

          <div className="flex justify-start mt-3">
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

                  if (!regexForTitle.test(bookmarkTitleInput)) {
                    setTitleFormatErrorVis(true);

                    return;
                  }

                  if (!titleUniquenessCheck()) {
                    setTitleUniquenessErrorVis(true);
                    return;
                  }

                  if (bookmarkType === "folder") {
                    if (
                      !regexForBookmarks.test(bookmarkLinksInput.join(", "))
                    ) {
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
                          ...createNote(bookmarkTitleInput, bookmarkColumnInput, 0, textAreaValue)
                        }
                        //   {
                        //   id: uuidv4(),
                        //   title: bookmarkTitleInput,
                        //   column: bookmarkColumnInput,
                        //   color: null,
                        //   priority: 0,
                        //   type: "note",
                        //   noteInput: textAreaValue,
                        //   // rssLink: null
                        // }
                        
                        )

                      })
                    )
                  }

                  if (bookmarkType === "folder") {
                    setBookmarksData((previous) =>
                      produce(previous, (updated) => {
                        updated.push(
                    
                          {
                            ...createBookmarkFolder(
                              bookmarkTitleInput,
                              bookmarkColumnInput,
                              0
                            ),
                          }
                        );
                      })
                    );

                    // updating links data (tags array)
                    setLinksData((previous) =>
                      produce(previous, (updated) => {
                        updated.forEach((obj) => {
                          if (
                            bookmarkLinksInput.indexOf(obj.title) > -1 &&
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
                        updated.push(
                    
                          {
                            // ...createBookmarkFolder(
                            //   bookmarkTitleInput,
                            //   bookmarkColumnInput,
                            //   0
                            // ),

                            ...createRSS(
                              bookmarkTitleInput,
                              bookmarkColumnInput,
                              0,
                              rssLinkInput
                            ),


                          }
                        );
                      })
                    );
                    }


                  setNewBookmarkVis((b) => !b);

                  function bookmarkExistenceCheck() {
                    let bookmarksArr: string[] = [];

                    linksData.forEach((obj) => {
                      bookmarksArr.push(obj.title);
                    });

                    for (let el of bookmarkLinksInput) {
                      if (bookmarksArr.indexOf(el) === -1) {
                        return false;
                      }
                    }

                    return true;
                  }

                  function tagUniquenessCheck() {
                    let isUnique: boolean = true;

                    bookmarkLinksInput.forEach((el, i) => {
                      let tagsInputCopy = [...bookmarkLinksInput];
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
        </form>
      </div>
    </div>
  );
}

export default NewBookmark_UpperUI;
