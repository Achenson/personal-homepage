import React from "react";
import { produce } from "immer";
import { bookmarksDataState } from "../../state/tabsAndBookmarks";

import { ReactComponent as PencilSmallSVG } from "../../svgs/pencilSmall.svg";
import { ReactComponent as TrashSmallSVG } from "../../svgs/trashSmall.svg";
import { ReactComponent as PhotographSVG } from "../../svgs/photograph.svg";

import { bookmarksAllTagsState } from "../../state/tabsAndBookmarks";

import { SingleBookmarkData, TabVisAction, UpperVisAction } from "../../utils/interfaces";

// interface SingleLinkData {
//   id: number | string;
//   title: string;
//   URL: string;
//   tags: string[];
// }

interface Props {
  // setEditBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  singleBookmarkData: SingleBookmarkData;

  setBookmarkId: React.Dispatch<
    React.SetStateAction<string | number | undefined>
  >;
  tabID: string | number;
  visDispatch: React.Dispatch<TabVisAction>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  // setEditSingleLinkData: React.Dispatch<React.SetStateAction<SingleBookmarkData>>;
}

function SingleBookmark({
  // setEditBookmarkVis,
  singleBookmarkData,
  // setEditSingleLinkData,
  setBookmarkId,
  visDispatch,
  upperVisDispatch,
  tabID,
}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [
    bookmarksAllTagsData,
    setBookmarksAllTagsData,
  ] = bookmarksAllTagsState.use();

  // let linkURL = new URL(singleBookmarkData.URL)


  return (
    <div className="flex justify-between bg-gray-50 h-10 py-2 border-b border-l border-r">
      <div className="flex truncate">
        <div className="h-6 mr-px">
        <PhotographSVG className="h-full" />
        </div>
        <div className="truncate">
          <a
            href={singleBookmarkData.URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors duration-75"
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
        <PencilSmallSVG
          className="h-5 ml-1 transition-colors duration-75 hover:text-black cursor-pointer"
          onClick={() => {
            // setEditBookmarkVis((b) => !b);
            visDispatch({ type: "EDIT_BOOKMARK_TOOGLE" });
            upperVisDispatch({type: "CLOSE_ALL"})
            setBookmarkId(singleBookmarkData.id);
          }}
        />
        <TrashSmallSVG
          className="h-5 ml-1 transition-colors duration-75 hover:text-black cursor-pointer"
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
        />
      </div>
    </div>
  );
}

export default SingleBookmark;
