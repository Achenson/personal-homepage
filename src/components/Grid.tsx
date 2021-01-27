import React from "react";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Bookmark from "./Bookmark";

import {
  bookmarksDataState,
  linksDataState,
  deletedBookmarkState,
} from "../state/bookmarksAndLinks";

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

  const target = React.useRef(null);
  const [width, height] = useSize(target);

  // const [{addedProps}, drop] = useDrop({

  // })

  useEffect(() => {
    if (resetColorsData) {
      // bookmarksData.forEach((obj, i) => {});

      setBookmarksData((previous) =>
        produce(previous, (updated) => {
          updated.forEach((obj, i) => {
            obj.color = null;
          });

          // updated.push({
          //   ...createBookmarkFolder(el, 1, 1),
          // });
        })
      );

      setResetColorsData(false);
    }
  }, [resetColorsData, setBookmarksData, setResetColorsData]);

  useEffect(() => {
    let linksDataTags: string[] = [];
    let bookmarksDataTitles: string[] = [];

    linksData.forEach((obj) => {
      obj.tags.forEach((el) => {
        if (linksDataTags.indexOf(el) === -1) {
          linksDataTags.push(el);
        }
      });
    });

    bookmarksData.forEach((obj) => {
      bookmarksDataTitles.push(obj.title);
    });

    // adding a bookmark(folder) if previously non-existing tag was added to a link / if new bookmark is being added
    linksDataTags.forEach((el) => {
      // no adding bookmark if it was just set up for deletion
      if (bookmarksDataTitles.indexOf(el) === -1 && deletedBookmark !== el) {
        setBookmarksData((previous) =>
          produce(previous, (updated) => {
            updated.push({
              ...createBookmarkFolder(el, 1, 0),
            });
          })
        );
      }
    });

    // deleting a bookmark if there is no tags with the same name in links
    bookmarksData.forEach((obj, i) => {
      if (linksDataTags.indexOf(obj.title) === -1 && obj.type === "folder") {
        setBookmarksData((previous) =>
          produce(previous, (updated) => {
            updated.splice(i, 1);
          })
        );
      }
    });
  }, [bookmarksData, setBookmarksData, linksData, deletedBookmark]);

  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();

  return (
    <div
      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 mx-4"
      ref={target}
    >

      
        <>
          <Column colNumber={1} />
          <Column colNumber={2} />
          <Column colNumber={3} />
          <Column colNumber={4} />
        </>
     
      {/* <p>grid height: {height}</p> */}
    </div>
  );
}

export default Grid;
