import React, { useEffect } from "react";
import { useState } from "react";

import { ReactComponent as SaveSVG } from "../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../svgs/alphabet-x.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { ReactComponent as TrashSVG } from "../svgs/trash.svg";
import { ReactComponent as LockClosedSVG } from "../svgs/lock-closed.svg";
import { ReactComponent as LockOpenSVG } from "../svgs/lock-open.svg";

import { produce } from "immer";

import { bookmarksDataState } from "../state/bookmarksAndLinks";
import { linksDataState } from "../state/bookmarksAndLinks";
import { deletedBookmarkState } from "../state/bookmarksAndLinks";
import { rssSettingsState } from "../state/defaultSettings";

interface Props {
  // bookmarkTitle: string;
  bookmarkType: "folder" | "note" | "rss";
  setEditBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  // noteInput: string | null;
  bookmarkID: string | number;
}

function EditBookmarkTitle({
  bookmarkID,

  bookmarkType,
  setEditBookmarkVis,
}: // noteInput,
Props): JSX.Element {
  const [deletedBookmark, setDeletedBookmark] = deletedBookmarkState.use();

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [rssSettingsData, setRssSettingsData] = rssSettingsState.use();

  let currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkID);
  let bookmarkTitle = currentBookmark[0].title;

  let rssLink: string | null | undefined = "no link";
  // let rssLink;

  if (bookmarkType === "rss") {
    rssLink = currentBookmark[0].rssLink;
  }

  const [linksData, setLinksData] = linksDataState.use();
  // for note only
  const [textAreaValue, setTextAreaValue] = useState<string | null>(
    currentBookmark[0].noteInput as string | null
  );

  const [bookmarkTitleInput, setBookmarkTitleInput] = useState<string>(
    bookmarkTitle
  );

  const [rssLinkInput, setRssLinkInput] = useState<string>(rssLink as string);

  const [descriptionCheckbox, setDescriptionCheckbox] = useState(() => {
    if (typeof currentBookmark[0].description === "boolean") {
      return currentBookmark[0].description;
    }

    return rssSettingsData.description;
  });
  const [dateCheckbox, setDateCheckbox] = useState(() => {
    if (typeof currentBookmark[0].date === "boolean") {
      return currentBookmark[0].date;
    }
    return rssSettingsData.date;
  });
  // checkboxes won't be saved on Save if there were not manipulated
  //  (so they will still respond to changing default setting (they will have null as a property))
  const [wasCheckboxClicked, setWasCheckboxClicked] = useState(false);

  const [rssItemsPerPage, setRssItemsPerPage] = useState(() => {
    if (typeof currentBookmark[0].itemsPerPage === "number") {
      return currentBookmark[0].itemsPerPage;
    }
    return rssSettingsData.itemsPerPage;
  });

  // items per page won't be saved on Save if there were not manipulated
  const [wasItemsPerPageClicked, setWasItemsPerPageClicked] = useState(false);

  const [wasFolderOpenClicked, setWasFolderOpenClicked] = useState(false);

  // for disabling save btn
  const [wasAnythingClicked, setWasAnythingClicked] = useState(false);

  useEffect(() => {
    if (wasCheckboxClicked || wasFolderOpenClicked || wasItemsPerPageClicked) {
      setWasAnythingClicked(true);
    }
  }, [wasCheckboxClicked, wasFolderOpenClicked, wasItemsPerPageClicked]);

  let bookmarkIndex: number;

  bookmarksData.forEach((obj, i) => {
    if (obj.title === bookmarkTitle) {
      bookmarkIndex = i;
    }
  });

  const [tagErrorVis, setTagErrorVis] = useState<boolean>(false);
  const [textAreaErrorVis, setTextAreaErrorVis] = useState<boolean>(false);
  const [noDeletionErrorVis, setNoDeletionErrorVis] = useState<boolean>(false);

  let regexForTitle = /^\w+$/;

  const [folderOpen, setFolderOpen] = useState(currentBookmark[0].opened);

  return (
    <div className="absolute z-40 bg-gray-100 pb-3 border w-full pl-2 pr-3">
      <div className="flex items-center mt-2 justify-between">
        <p className={bookmarkType === "rss" ? "w-24" : "w-12"}>Title</p>
        <input
          type="text"
          // min-w-0 !!
          // className="border w-full max-w-6xl min-w-0"
          className="border w-full"
          value={bookmarkTitleInput}
          onChange={(e) => {
            setBookmarkTitleInput(e.target.value);
            setWasAnythingClicked(true);
          }}
        />
        {/* <div className=""> */}

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

      {noDeletionErrorVis ? (
        <p className={`text-red-600`}>
          Folder with all bookmarks cannot be deleted. You can hide it in the
          global settings instead
        </p>
      ) : null}

      {bookmarkType === "note" ? (
        <div className="mt-2">
          <textarea
            value={textAreaValue as string}
            className="h-full w-full overflow-visible pl-1 pr-1 border font-mono"
            rows={(currentBookmark[0].noteInput as string).length / 30}
            onChange={(e) => {
              setTextAreaValue(e.target.value);
              setWasAnythingClicked(true);
            }}
          ></textarea>
        </div>
      ) : null}

      {bookmarkType === "rss" ? (
        <div>
          <div className="flex items-center mb-2 mt-2 justify-between">
            <p className="w-24 whitespace-nowrap">RSS link</p>
            <input
              type="text"
              // min-w-0 !!
              className="border w-full max-w-6xl min-w-0"
              value={rssLinkInput}
              onChange={(e) => {
                setRssLinkInput(e.target.value);
                setWasAnythingClicked(true);
              }}
            />
          </div>
          <div className="flex items-center mb-2 mt-2 justify-between">
            <p className="whitespace-nowrap w-32">Display</p>
            <div className="flex">
              <div className="flex items-center mr-2">
                <input
                  type="checkbox"
                  name="description"
                  // className="w-full border border-gray-500"
                  // className="border w-14 max-w-6xl min-w-0 mr-6 pl-1"
                  checked={descriptionCheckbox}
                  onChange={() => {
                    setDescriptionCheckbox((b) => !b);
                    setWasCheckboxClicked(true);
                  }}
                />
                <label className="ml-1" htmlFor="description">
                  Description
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="date"
                  checked={dateCheckbox}
                  onChange={() => {
                    setDateCheckbox((b) => !b);
                    setWasCheckboxClicked(true);
                  }}

                  // placeholder={"5-15"}
                />
                <label className="ml-1" htmlFor="date">
                  Date
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2 justify-between">
            <p className="whitespace-nowrap w-32">Items per page</p>
            <input
              type="number"
              min="5"
              max="15"
              // className="w-full border border-gray-500"
              className="border w-11 pl-1"
              value={rssItemsPerPage}
              onChange={(e) => {
                setRssItemsPerPage(parseInt(e.target.value));
                setWasItemsPerPageClicked(true);
              }}
              // placeholder={"5-15"}
            />
          </div>
        </div>
      ) : null}

      <div className={`mt-3 pt-2`} style={{ borderTop: "solid lightGray 1px" }}>
        <div className="flex justify-between items-center">
          <p>Lock as always-open</p>
          <button>
            {folderOpen ? (
              <LockClosedSVG
                className="h-6 text-gray-700 hover:text-black cursor-pointer"
                onClick={() => {
                  setFolderOpen((b) => !b);
                  setWasFolderOpenClicked(true);
                }}
              />
            ) : (
              <LockOpenSVG
                className="h-6 text-gray-700 hover:text-black cursor-pointer"
                onClick={() => {
                  setFolderOpen((b) => !b);
                  setWasFolderOpenClicked(true);
                }}
              />
            )}
          </button>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p>Delete</p>
          <button>
            <TrashSVG
              className="h-6 text-gray-500 hover:text-black cursor-pointer"
              onClick={() => {
                if (!currentBookmark[0].deletable) {
                  setNoDeletionErrorVis(true);
                  return;
                }

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
                        updated[i].tags.splice(
                          obj.tags.indexOf(bookmarkTitle),
                          1
                        );
                      })
                    );
                  }
                });
              }}
            />
          </button>
        </div>
      </div>

      <div className="flex justify-start mt-2">
        <p className="w-8"></p>
        <div className="w-full pl-4 flex justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();

              if (!wasAnythingClicked) {
                return;
              }

              setWasCheckboxClicked(false);
              setWasItemsPerPageClicked(false);

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
              setNoDeletionErrorVis(false);

              setBookmarksData((previous) =>
                produce(previous, (updated) => {
                  updated[bookmarkIndex].title = bookmarkTitleInput;


                  if (wasFolderOpenClicked) {
                    updated[bookmarkIndex].opened = folderOpen;
                  }

                  if (bookmarkType === "note") {
                    updated[bookmarkIndex].noteInput = textAreaValue;
                  }
                  if (bookmarkType === "rss") {
                    updated[bookmarkIndex].rssLink = rssLinkInput;

                    if (wasCheckboxClicked) {
                      updated[bookmarkIndex].date = dateCheckbox;
                    }

                    if (wasCheckboxClicked) {
                      updated[bookmarkIndex].description = descriptionCheckbox;
                    }

                    if (wasItemsPerPageClicked) {
                      updated[bookmarkIndex].itemsPerPage = rssItemsPerPage;
                    }
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
            <SaveSVG
              className={`h-5 fill-current mr-3 ${
                wasAnythingClicked
                  ? "text-gray-900 hover:text-green-600"
                  : "text-blueGray-400 cursor-default"
              }`}
            />
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
