import React from "react";

import { useState, useEffect } from "react";
import { ItemTypes } from "../utils/itemsDnd";

import { bookmarksDataState } from "../state/bookmarksAndLinks";
import { columnsColorsState, resetColorsState, columnsColorsImg_State } from "../state/colorsState";
import { globalSettingsState } from "../state/defaultSettings";

import Bookmark from "./Bookmark";

import { useDrop } from "react-dnd";
import { produce } from "immer";

interface Props {
  colNumber: number;
}

function Column({ colNumber }: Props): JSX.Element {
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();
  const [columnsColorsImg_Data, setColumnsColorsImg_Data] = columnsColorsImg_State.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  const [{ isOver }, drop] = useDrop({
    //    required property
    accept: ItemTypes.BOOKMARK,
    // @ts-ignore: Unreachable code error
    drop: (item, monitor) => dragBookmark(item.bookmarkID),
    // drop: (item, monitor) => console.log(item.bookmarkID),

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

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

    if(!globalSettingsState) {
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
      className={`bg-${calcColumnColor(colNumber, globalSettingsData.picBackground)} ${
        colNumber !== 1 ? "hidden sm:block" : ""
      }  ${isOver ? "opacity-50" : ""}`}
      ref={drop}
    >
      {bookmarksData
        .filter((el) => el.column === colNumber)
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
  );
}

export default Column;
