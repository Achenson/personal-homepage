import React, { Fragment } from "react";

import { useState, useEffect } from "react";
import { ItemTypes } from "../utils/itemsDnd";

import { bookmarksDataState } from "../state/bookmarksAndLinks";


import {
  columnsColorsState,
  resetColorsState,
  columnsColorsImg_State,
} from "../state/colorsState";
import {globalSettingsState } from "../state/defaultSettings";

import Bookmark from "./Bookmark";

import { useDrop } from "react-dnd";
import { produce } from "immer";
import GapAfterBookmark from "./GapAfterBookmark";

interface Props {
  colNumber: number;
  // ref: React.MutableRefObject<number>
  closeAllFolders: boolean;
}

const Column = React.forwardRef(({ colNumber, closeAllFolders }: Props, ref) => {
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
    if (!globalColumnSetting) {
      // switch (colNumber) {
      //   case 1:
      //     return columnsColorsData.column_1;
      //   case 2:
      //     return columnsColorsData.column_2;
      //   case 3:
      //     return columnsColorsData.column_3;
      //   case 4:
      //     return columnsColorsData.column_4;
      // }
      return "";
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

  function calcColumnColor_picBackground(
    colNumber: number,
    globalColumnSetting: boolean
  ) {
    if (globalColumnSetting) {
      return "";
    }

    switch (colNumber) {
      case 1:
        return "bg-" + columnsColorsData.column_1;
      case 2:
        return "bg-" + columnsColorsData.column_2;
      case 3:
        return "bg-" + columnsColorsData.column_3;
      case 4:
        return "bg-" + columnsColorsData.column_4;
    }
  }

  //   return <div className={`bg-${columnsColorsData.column_1}`}>

  return (
    <div
      className={`
       ${calcColumnColor_picBackground(
        colNumber,
        globalSettingsData.picBackground
      )}`}
      style={{
        backgroundColor: calcColumnColor(
          colNumber,
          globalSettingsData.picBackground
        ),
      }}
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
            <div key={i} className="">
              <Bookmark
                bookmarkID={el.id}
                bookmarkTitle={el.title}
                bookmarkColor={el.color}
                bookmarkType={el.type}
                colNumber={el.column}
                closeAllFolders={closeAllFolders}
                // noteInput={el.noteInput}
                // rssLink={el.rssLink}
              />
              <GapAfterBookmark colNumber={colNumber} bookmarkID={el.id} picBackground={globalSettingsData.picBackground} />
            </div>
          );
        })}
      {bookmarksData.filter((el) => el.column === colNumber).length === 0 ? (
        <GapAfterBookmark colNumber={colNumber} bookmarkID={null} picBackground={globalSettingsData.picBackground} />
      ) : null}
    </div>
  );
});

export default Column;
