import React from "react";

import { useState, useEffect } from "react";

import { bookmarksDataState } from "../state/bookmarksAndLinks";
import { columnsColorsState, resetColorsState } from "../state/colorsState";

import Bookmark from "./Bookmark";

import { useDrop } from "react-dnd";

interface Props {
  colNumber: number;
}

function Column({ colNumber }: Props): JSX.Element {
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  function calcColumnColor(colNumber: number) {
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

  //   return <div className={`bg-${columnsColorsData.column_1}`}>
  return (
    <div
      className={`bg-${calcColumnColor(colNumber)} ${
        colNumber !== 1 ? "hidden sm:block" : ""
      }`}
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
