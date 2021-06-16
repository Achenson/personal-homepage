import React from "react";
import { produce } from "immer";
import { bookmarksDataState } from "../../state/tabsAndBookmarks";

import { ReactComponent as PencilSmallSVG } from "../../svgs/pencilSmall.svg";
import { ReactComponent as TrashSmallSVG } from "../../svgs/trashSmall.svg";
import { ReactComponent as PhotographSVG } from "../../svgs/photograph.svg";

import { bookmarksAllTagsState } from "../../state/tabsAndBookmarks";
import { globalSettingsState } from "../../state/defaultSettings";

import {
  SingleBookmarkData,
  TabVisAction,
  VisState,
  UpperVisAction,
} from "../../utils/interfaces";
import Bookmark_newAndEdit from "../Shared/Bookmark_newAndEdit";

// interface SingleLinkData {
//   id: number | string;
//   title: string;
//   URL: string;
//   tags: string[];
// }

interface Props {
  // setEditBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  singleBookmarkData: SingleBookmarkData;
  bookmarkId: string | number;
  setBookmarkId: React.Dispatch<
    React.SetStateAction<string | number | undefined>
  >;
  colNumber: number;
  tabID: string | number;
  visState: VisState;
  visDispatch: React.Dispatch<TabVisAction>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  // setEditSingleLinkData: React.Dispatch<React.SetStateAction<SingleBookmarkData>>;
}

function SingleBookmark({
  // setEditBookmarkVis,
  singleBookmarkData,
  // setEditSingleLinkData,
  bookmarkId,
  setBookmarkId,
  colNumber,
  visState,
  visDispatch,
  upperVisDispatch,
  tabID,
}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [bookmarksAllTagsData, setBookmarksAllTagsData] =
    bookmarksAllTagsState.use();

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  // let linkURL = new URL(singleBookmarkData.URL)

  return (
    <div>
      {visState.editBookmarkVis !== bookmarkId && (
        <div
          className={`flex justify-between bg-gray-50 h-10 pt-2 border border-t-0 ${
            globalSettingsData.picBackground
              ? ""
              : "border-black border-opacity-10"
          }`}
          // style={{height: "40px", paddingTop : "8px"}}
        >
          <div className="flex truncate">
            <div className="h-6 mr-px">
              <PhotographSVG className="h-full" />
            </div>
            <div className="truncate">
              <a
                href={singleBookmarkData.URL}
                target="_blank"
                rel="noopener noreferrer"
                className="z-50 hover:text-gray-600 transition-colors duration-75 focus:outline-none focus:ring-2 focus:ring-blueGray-300 ring-inset py-0.5 px-0.5"
              >
                {singleBookmarkData.title}
              </a>
              {/* <a href="https://en.wikipedia.org/wiki/Deadly_Rooms_of_Death" target="_blank" rel="noopener noreferrer">{singleBookmarkData.title}</a> */}
            </div>
          </div>
          <div
            className="flex fill-current text-gray-500"
            style={{ marginTop: "2px" }}
          >
            <button
              className="h-5 w-5 ml-1 focus:outline-none focus:ring-1 focus:ring-blueGray-300 focus:ring-inset"
              onClick={() => {
                // setEditBookmarkVis((b) => !b);
                visDispatch({
                  type: "EDIT_BOOKMARK_OPEN",
                  payload: bookmarkId,
                });
                upperVisDispatch({ type: "CLOSE_ALL" });
                setBookmarkId(singleBookmarkData.id);
              }}
            >
              <PencilSmallSVG className="h-full w-full transition-colors duration-75 hover:text-black cursor-pointer" />
            </button>

            <button
              className="h-5 w-5 ml-1 focus:outline-none focus:ring-1 focus:ring-blueGray-300 focus:ring-inset"
              onClick={() => {
                // for deleting empty folder

                let tagsIdsToDelete: (string | number)[] = [];

                singleBookmarkData.tags.forEach((el) => {
                  let filteredBookmarks = bookmarksData.filter(
                    (obj) => obj.id !== singleBookmarkData.id
                  );

                  let isElPresent: boolean = false;

                  filteredBookmarks.forEach((obj) => {
                    if (obj.tags.indexOf(el) > -1) {
                      isElPresent = true;
                      return;
                    }
                  });

                  if (!isElPresent && el !== "ALL_TAGS") {
                    tagsIdsToDelete.push(el);
                  }
                });

                let bookmarksAllTagsData_new: (string | number)[] = [];

                bookmarksAllTagsData.forEach((el) => {
                  if (tagsIdsToDelete.indexOf(el) === -1) {
                    bookmarksAllTagsData_new.push(el);
                  }
                });

                setBookmarksAllTagsData([...bookmarksAllTagsData_new]);

                setBookmarksData((previous) =>
                  produce(previous, (updated) => {
                    let bookmarkToDelete = updated.find(
                      (obj) => obj.id === singleBookmarkData.id
                    );
                    if (bookmarkToDelete) {
                      let tabIndex = updated.indexOf(bookmarkToDelete);
                      updated.splice(tabIndex, 1);
                    }
                  })
                );
              }}
            >
              <TrashSmallSVG className="h-full w-full transition-colors duration-75 hover:text-black cursor-pointer" />
            </button>
          </div>
        </div>
      )}

      {visState.editBookmarkVis === bookmarkId && (
        <Bookmark_newAndEdit
          bookmarkComponentType="edit"
          visDispatch={visDispatch}
          colNumber={colNumber}
          bookmarkId={bookmarkId as string | number}
        />
      )}
    </div>
  );
}

export default SingleBookmark;
