import React from "react";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Bookmark from "./Bookmark";
import Column from "./Column";
import {
  bookmarksDataState,
  linksDataState,
  deletedBookmarkState,
} from "../state/bookmarksAndLinks";

import { createBookmarkFolder } from "../utils/objCreators";

import { produce } from "immer";

import { columnsColorsState, resetColorsState } from "../state/colorsState";

import { globalSettingsState } from "../state/defaultSettings";
import Column_Img from "./Column_Img";


import useSize from '@react-hook/size'

interface Props {}

function Grid({}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [linksData, setLinksData] = linksDataState.use();
  const [resetColorsData, setResetColorsData] = resetColorsState.use();
  const [deletedBookmark, setDeletedBookmark] = deletedBookmarkState.use();

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const target = React.useRef(null)
  const [width, height] = useSize(target)

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
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-4"
    
    ref={target}
    >
      {globalSettingsData.picBackground ? (
        <>
          <Column_Img
            colNumber={1}
            // @ts-ignore: Unreachable code error
            ref={col_1_height}
          />
          <Column_Img
            colNumber={2}
            // @ts-ignore: Unreachable code error
            ref={col_2_height}
          />
          <Column_Img
            colNumber={3}
            // @ts-ignore: Unreachable code error
            ref={col_3_height}
          />
          <Column_Img
            colNumber={4}
            // @ts-ignore: Unreachable code error
            ref={col_4_height}
          />
        </>
      ) : (
        <>
          <Column colNumber={1} />
          <Column colNumber={2} />
          <Column colNumber={3} />
          <Column colNumber={4} />
        </>
      )}

      {/* <div className={`bg-${columnsColorsData.column_1}`}>
        {bookmarksData
          .filter((el) => el.column === 1)
          // lower priority, higher in the column
          .sort((a, b) => a.priority - b.priority)
          .map((el, i) => {
            return (
              <Bookmark
                bookmarkID={el.id}
                bookmarkTitle={el.title}
                bookmarkColor={el.color}
                bookmarkType={el.type}
                // noteInput={el.noteInput}
                // rssLink={el.rssLink}
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
                bookmarkID={el.id}
                bookmarkTitle={el.title}
                bookmarkColor={el.color}
                bookmarkType={el.type}
                // noteInput={el.noteInput}
                // rssLink={el.rssLink}
                key={i}
              />
            );
          })}
      </div>
      <div className={`hidden sm:block bg-${columnsColorsData.column_3}`}>
        3
      </div>
      <div className={`hidden sm:block bg-${columnsColorsData.column_4}`}>
        4
      </div> */}
      <p>grid height: {height}</p>
    </div>
  );
}

export default Grid;
