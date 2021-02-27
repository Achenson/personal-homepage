import React from "react";
import { produce } from "immer";
import { bookmarksDataState } from "../state/tabsAndBookmarks";

import { ReactComponent as PencilSmallSVG } from "../svgs/pencilSmall.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { ReactComponent as PhotographSVG } from "../svgs/photograph.svg";

import { bookmarksAllTagsState } from "../state/tabsAndBookmarks";

import { SingleBookmarkData } from "../utils/interfaces";

// interface SingleLinkData {
//   id: number | string;
//   title: string;
//   URL: string;
//   tags: string[];
// }

interface Props {
  setEditBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  singleBookmarkData: SingleBookmarkData;

  setBookmarkId: React.Dispatch<React.SetStateAction<string | number | undefined>>;
  tabID: string | number;
  // setEditSingleLinkData: React.Dispatch<React.SetStateAction<SingleBookmarkData>>;
}

function SingleBookmark({
  setEditBookmarkVis,
  singleBookmarkData,
  // setEditSingleLinkData,
  setBookmarkId,
  tabID,
}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [bookmarksAllTagsData, setBookmarksAllTagsData] = bookmarksAllTagsState.use();

  // let linkURL = new URL(singleBookmarkData.URL)

  let tabIndex: number = 0;

  bookmarksData.forEach((obj, i) => {
    if (obj.id === singleBookmarkData.id) {
      tabIndex = i;
    }
  });

  let currentTabTitle = bookmarksData[tabIndex].title;

  return (
    <div className="flex justify-between bg-gray-100 h-10 py-2 border-b">
      <div className="flex">
        <PhotographSVG className="h-6 mr-px" />
        <div>
          <a
            href={singleBookmarkData.URL}
            target="_blank"
            rel="noopener noreferrer"
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
          className="h-5 ml-1 hover:text-black cursor-pointer"
          onClick={() => {
            setEditBookmarkVis((b) => !b);

            setBookmarkId(singleBookmarkData.id);
          }}
        />
        <TrashSmallSVG
          className="h-5 ml-1 hover:text-black cursor-pointer"
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
                updated.splice(tabIndex, 1);
              })
            );
          }}
        />
      </div>
    </div>
  );
}

export default SingleBookmark;