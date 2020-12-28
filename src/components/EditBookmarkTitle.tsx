import React from "react";
import { useState } from "react";

import { ReactComponent as SaveSVG } from "../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../svgs/alphabet-x.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { produce } from "immer";

import { bookmarksDataState } from "../state/bookmarksAndLinks";
import { linksDataState } from "../state/bookmarksAndLinks";
import { deletedBookmarkState } from "../state/bookmarksAndLinks";

interface Props {
  bookmarkTitle: string;
  bookmarkType: "folder" | "note" | "rss";
  setEditBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  noteInput: string | null;
}

function EditBookmarkTitle({
  bookmarkTitle,
  bookmarkType,
  setEditBookmarkVis,
  noteInput,
}: Props): JSX.Element {
  const [deletedBookmark, setDeletedBookmark] = deletedBookmarkState.use();

  const [textAreaValue, setTextAreaValue] = useState<string | null>(noteInput);

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [linksData, setLinksData] = linksDataState.use();

  const [bookmarkTitleInput, setBookmarkTitleInput] = useState<string>(
    bookmarkTitle
  );

  let bookmarkIndex: number;

  bookmarksData.forEach((obj, i) => {
    if (obj.title === bookmarkTitle) {
      bookmarkIndex = i;
    }
  });

  const [tagErrorVis, setTagErrorVis] = useState<boolean>(false);
  const [textAreaErrorVis, setTextAreaErrorVis] = useState<boolean>(false);

  let regexForTitle = /^\w+$/;

  return (
    <div className="absolute z-40 bg-gray-100 pb-3 border w-full pl-2 pr-2">
      <div className="flex items-center mb-2 mt-2 justify-between">
        <p className="mr-2">Title</p>
        <input
          type="text"
          // min-w-0 !!
          className="border w-full max-w-6xl min-w-0"
          value={bookmarkTitleInput}
          onChange={(e) => setBookmarkTitleInput(e.target.value)}
        />
        {/* <div className=""> */}
        <TrashSmallSVG
          className="h-6  fill-current text-gray-700 hover:text-black cursor-pointer ml-2"
          onClick={() => {
            setDeletedBookmark(bookmarkTitle);

            setBookmarksData((previous) =>
              produce(previous, (updated) => {
                updated.splice(bookmarkIndex, 1);
              })
            );

            setEditBookmarkVis((b) => !b);
            // removing deleted bookmark(tag) for links
            linksData.forEach((obj, i) => {
              if (obj.tags.indexOf(bookmarkTitle) > -1) {
                setLinksData((previous) =>
                  produce(previous, (updated) => {
                    updated[i].tags.splice(obj.tags.indexOf(bookmarkTitle), 1);
                  })
                );
              }
            });
          }}
        />
        {/* </div> */}
      </div>

      {tagErrorVis ? (
        <p className={`text-red-600`}>
          Bookmark title should consist of a single word without special
          characters
        </p>
      ) : null}

      {textAreaErrorVis && bookmarkType === "note" ? (
        <p className={`text-red-600`}>Note cannot be empty</p>
      ) : null}

      {bookmarkType === "note" ? (
        <div style={{ marginRight: "27px" }}>
          <textarea
            value={textAreaValue as string}
            className="h-full w-full overflow-visible pl-1 pr-1 border font-mono"
            rows={(noteInput as string).length / 30}
            onChange={(e) => {
              setTextAreaValue(e.target.value);
            }}
          ></textarea>
        </div>
      ) : null}

      <div className="flex justify-start mt-3">
        <p className="w-8"></p>
        <div className="w-full pl-4 flex justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();

              // if(tagsInput.join(", "))

              // if (!regexForTags.test(tagsInput.join(", "))) {
              //   setTagErrorVis(true);
              //   return;
              // }

              if (!regexForTitle.test(bookmarkTitleInput)) {
                setTagErrorVis(true);
                return;
              }

              if (bookmarkType === "note") {
                if ((textAreaValue as string).length === 0) {
                  setTextAreaErrorVis(true);
                  return;
                }
              }

              setTagErrorVis(false);
              setTextAreaErrorVis(false);

              setBookmarksData((previous) =>
                produce(previous, (updated) => {
                  updated[bookmarkIndex].title = bookmarkTitleInput;
                  if (bookmarkType === "note") {
                    updated[bookmarkIndex].noteInput = textAreaValue;
                  }
                })
              );

              if (bookmarkType === "folder") {
                // deleting tag from links
                setLinksData((previous) =>
                  produce(previous, (updated) => {
                    updated.forEach((obj) => {
                      let indexOfBookmarkTitle: number = obj.tags.indexOf(
                        bookmarkTitle
                      );

                      if (indexOfBookmarkTitle > -1) {
                        obj.tags.splice(
                          indexOfBookmarkTitle,
                          1,
                          bookmarkTitleInput
                        );
                      }
                    });
                  })
                );
              }

              setEditBookmarkVis((b) => !b);
            }}
          >
            <SaveSVG className="h-5 fill-current text-gray-900 mr-3 hover:text-green-600" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setEditBookmarkVis((b) => !b);
            }}
          >
            <CancelSVG className="h-5 fill-current text-gray-900 ml-3 hover:text-red-600" />
          </button>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
}

export default EditBookmarkTitle;
