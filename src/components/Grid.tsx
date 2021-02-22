import React from "react";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Bookmark from "./Bookmark";

import {
  bookmarksDataState,
  linksDataState,
  deletedBookmarkState,
} from "../state/bookmarksAndLinks";

import { closeAllFoldersState } from "../state/defaultSettings";

import { createBookmarkFolder } from "../utils/objCreators";

import { produce } from "immer";

import { columnsColorsState, resetColorsState } from "../state/colorsState";

import { globalSettingsState } from "../state/defaultSettings";
import Column from "./Column";

import useSize from "@react-hook/size";

interface Props {}

function Grid({}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [linksData, setLinksData] = linksDataState.use();
  const [resetColorsData, setResetColorsData] = resetColorsState.use();
  const [deletedBookmark, setDeletedBookmark] = deletedBookmarkState.use();

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const [closeAllFolders, setCloseAllFolders] = useState(false);
  const [
    closeAllFoldersData,
    setCloseAllFoldersData,
  ] = closeAllFoldersState.use();

  const target = React.useRef(null);
  const [width, height] = useSize(target);

  // const [{addedProps}, drop] = useDrop({

  // })

  useEffect(() => {
    if (closeAllFoldersData) {
      setCloseAllFoldersData(false);
    }
  }, [closeAllFoldersData, setCloseAllFoldersData]);

  useEffect(() => {
    if (resetColorsData) {
      // bookmarksData.forEach((obj, i) => {});

      setBookmarksData((previous) =>
        produce(previous, (updated) => {
          updated.forEach((obj, i) => {
            obj.color = null;
          });
        })
      );

      setResetColorsData(false);
    }
  }, [resetColorsData, setBookmarksData, setResetColorsData]);

  useEffect(() => {
    let linksDataTags: (string | number)[] = [];
    let bookmarksDataIds: (string | number)[] = [];

    linksData.forEach((obj) => {
      obj.tags.forEach((el) => {
        if (linksDataTags.indexOf(el) === -1) {
          linksDataTags.push(el);
        }
      });
    });

    bookmarksData.forEach((obj) => {
      bookmarksDataIds.push(obj.id);
    });





    // let linksDataTagsIds: (string | number)[] = [];

    // linksDataTags.forEach((id) => {
    //   let filteredBookmark = bookmarksData.filter((obj) => obj.id === id)[0];
    //   linksDataTagsIds.push(filteredBookmark.id);
    // });

    // // adding a bookmark(folder) if previously non-existing tag was added to a link / if new bookmark is being added
    // linksDataTagsIds.forEach((el) => {
    //   // no adding bookmark if it was just set up for deletion

    //   if (bookmarksDataIds.indexOf(el) === -1 && deletedBookmark !== el) {
    //     setBookmarksData((previous) =>
    //       produce(previous, (updated) => {
    //         updated.push({
    //           ...createBookmarkFolder(bookmarksData.filter(obj => obj.id === el)[0].title, 1, 0),
    //         });
    //       })
    //     );
    //   }
    // });







    // deleting a bookmark if there is no tags with the same name in links

    bookmarksData.forEach((obj, i) => {
      if (linksDataTags.indexOf(obj.id) === -1 && obj.type === "folder") {
        setBookmarksData((previous) =>
          produce(previous, (updated) => {
            updated.splice(i, 1);
          })
        );
      }
    });

    
  }, [bookmarksData, setBookmarksData, linksData, deletedBookmark]);

  function renderColumns(numberOfCols: 1 | 2 | 3 | 4) {
    switch (numberOfCols) {
      case 1:
        return <Column colNumber={1} closeAllFolders={closeAllFoldersData} />;
      case 2:
        return (
          <>
            <Column colNumber={1} closeAllFolders={closeAllFoldersData} />
            <Column colNumber={2} closeAllFolders={closeAllFoldersData} />
          </>
        );
      case 3:
        return (
          <>
            <Column colNumber={1} closeAllFolders={closeAllFoldersData} />
            <Column colNumber={2} closeAllFolders={closeAllFoldersData} />
            <Column colNumber={3} closeAllFolders={closeAllFoldersData} />
          </>
        );
      case 4:
        return (
          <>
            <Column colNumber={1} closeAllFolders={closeAllFoldersData} />
            <Column colNumber={2} closeAllFolders={closeAllFoldersData} />
            <Column colNumber={3} closeAllFolders={closeAllFoldersData} />
            <Column colNumber={4} closeAllFolders={closeAllFoldersData} />
          </>
        );
    }
  }

  function gridSettings(numberOfCols: 1 | 2 | 3 | 4) {
    switch (numberOfCols) {
      case 1:
        return ``;
      case 2:
        return `sm:grid-cols-2`;
      case 3:
        return `sm:grid-cols-2 md:grid-cols-3`;
      case 4:
        return `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
    }
  }

  return (
    <div
      className={`grid gap-x-2 gap-y-6 mx-4 ${gridSettings(
        globalSettingsData.numberOfCols
      )}`}
      // className={`grid gap-x-2 gap-y-6 mx-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
      ref={target}
    >
      {/* <>
        <Column colNumber={1} closeAllFolders={closeAllFoldersData} />
        <Column colNumber={2} closeAllFolders={closeAllFoldersData} />
        <Column colNumber={3} closeAllFolders={closeAllFoldersData} />
        <Column colNumber={4} closeAllFolders={closeAllFoldersData} />
      </> */}

      {renderColumns(globalSettingsData.numberOfCols)}
    </div>
  );
}

export default Grid;
