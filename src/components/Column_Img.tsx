import React, { Fragment } from "react";

import { useState, useEffect } from "react";
import { ItemTypes } from "../utils/itemsDnd";

import { bookmarksDataState } from "../state/bookmarksAndLinks";
import {
  columnsColorsState,
  resetColorsState,
  columnsColorsImg_State,
} from "../state/colorsState";
import { globalSettingsState } from "../state/defaultSettings";

import Bookmark from "./Bookmark";

import { useDrop } from "react-dnd";
import { produce } from "immer";
import GapAfterBookmark_Img from "./GapAfterBookmark_Img";

interface Props {
  colNumber: number;
  // ref: React.MutableRefObject<number>
}

const Column_Img = React.forwardRef( ({colNumber}: Props, ref ) => {
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();
  const [
    columnsColorsImg_Data,
    setColumnsColorsImg_Data,
  ] = columnsColorsImg_State.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  function dragBookmark(itemID: number | string) {
    setBookmarksData((previous) =>
      produce(previous, (updated) => {
        let bookmarkIndex: number = 0;

        bookmarksData.forEach((obj, i) => {
          if (obj.id === itemID) {
            bookmarkIndex = i;
          }
        });
        // let currentBookmark = bookmarksData.filter( obj => obj.id === itemID )

        updated[bookmarkIndex].column = colNumber;
        //  updated[currentBookmark]
      })
    );
  }

  function calcColumnColor(colNumber: number, globalColumnSetting: boolean) {
    if (!globalSettingsState) {
      switch (colNumber) {
        case 1:
          return columnsColorsData.column_1;
        case 2:
          return columnsColorsData.column_2;
        case 3:
          return columnsColorsData.column_3;
        case 4:
          return columnsColorsData.column_4;
      }
    }

    switch (colNumber) {
      case 1:
        return columnsColorsImg_Data.column_1;
      case 2:
        return columnsColorsImg_Data.column_2;
      case 3:
        return columnsColorsImg_Data.column_3;
      case 4:
        return columnsColorsImg_Data.column_4;
    }
  }

  //   return <div className={`bg-${columnsColorsData.column_1}`}>
  return (
    <div
    className={`${colNumber !== 1 ? "hidden sm:block" : ""}  `}
    // ref={drop}
    // ref={target}

    // style={{
    //   backgroundColor: calcColumnColor(
    //     colNumber,
    //     globalSettingsData.picBackground
    //   ),
    // }}
    >
      {bookmarksData
        .filter((el) => el.column === colNumber)
        // lower priority, higher in the column
        .sort((a, b) => a.priority - b.priority)
        .map((el, i) => {
          return (
            <Fragment key={i}>
              <Bookmark
                bookmarkID={el.id}
                bookmarkTitle={el.title}
                bookmarkColor={el.color}
                bookmarkType={el.type}
                colNumber={el.column}
                // noteInput={el.noteInput}
                // rssLink={el.rssLink}
              />
              <GapAfterBookmark_Img
                singleColumnColor={calcColumnColor(
                  colNumber,
                  globalSettingsData.picBackground
                )}
                colNumber={colNumber}
                bookmarkID={el.id}
              />
            </Fragment>
          );
        })}
    </div>
  );
})

export default Column_Img;
