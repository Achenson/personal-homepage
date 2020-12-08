import React from "react";
import { useState, useEffect } from "react";
import Bookmark from "./Bookmark";
import {
  bookmarksDataState,
  linksDataState,
  deletedBookmarkState,
} from "../state/bookmarksAndLinks";
import { produce } from "immer";

import { columnsColorsState } from "../state/colorsState";

interface Props {}

function Grid({}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [linksData, setLinksData] = linksDataState.use();
  const [deletedBookmark, setDeletedBookmark] = deletedBookmarkState.use();

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
              title: el,
              color: null,
              column: 1,
              priority: 1,
              type: "folder",
              noteInput: null,
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
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-4">
      <div className={`bg-${columnsColorsData.column_1}`}>
        {bookmarksData
          .filter((el) => el.column === 1)
          .sort((a, b) => a.priority - b.priority)
          .map((el, i) => {
            return (
              <Bookmark
                bookmarkTitle={el.title}
                bookmarkColor={el.color}
                bookmarkType={el.type}
                noteInput={el.noteInput}
                key={i}
              />
            );
          })}
      </div>
      <div className={`hidden sm:block bg-${columnsColorsData.column_2}`}>
        {bookmarksData
          .filter((el) => el.column === 2)
          .sort((a, b) => a.priority - b.priority)
          .map((el, i) => {
            return (
              <Bookmark
                bookmarkTitle={el.title}
                bookmarkColor={el.color}
                bookmarkType={el.type}
                noteInput={el.noteInput}
                key={i}
              />
            );
          })}
      </div>
      <div className={`hidden sm:block bg-${columnsColorsData.column_3}`}>3</div>
      <div className={`hidden sm:block bg-${columnsColorsData.column_4}`}>4</div>
    </div>
  );
}

export default Grid;
