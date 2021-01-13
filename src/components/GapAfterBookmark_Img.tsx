import React from "react";

import { useDrop } from "react-dnd";
import { produce } from "immer";

import { ItemTypes } from "../utils/itemsDnd";

import { bookmarksDataState } from "../state/bookmarksAndLinks";

interface Props {
  singleColumnColor: string | undefined;
  colNumber: number;
  bookmarkID: number | string;
}

function GapAfterBookmark_Img({
  singleColumnColor,
  colNumber,
  bookmarkID,
}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  const [{ isOver }, drop] = useDrop({
    //    required property
    accept: ItemTypes.BOOKMARK,
    // @ts-ignore: Unreachable code error
    drop: (item, monitor) => dragBookmark(item.bookmarkID, item.colNumber),
    // drop: (item, monitor) => console.log(item.bookmarkID),

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  function dragBookmark(itemID: number | string, itemColNumber: number) {

    setBookmarksData((previous) =>
      produce(previous, (updated) => {
        let bookmarkIndex: number = 0;

        bookmarksData.forEach((obj, i) => {
          if (obj.id === itemID) {
            bookmarkIndex = i;
          }
        });

        // changing item column number
        updated[bookmarkIndex].column = colNumber;

        //index of bookmark before the gap the bookmark is dragged into
        let draggedIntoIndex: number = 0;

        bookmarksData.forEach((obj, i) => {
          if (obj.id === bookmarkID) {
            draggedIntoIndex = i;
          }
        });

        let draggedIntoPriority = bookmarksData[draggedIntoIndex].priority;

        bookmarksData.forEach((obj, i) => {
          let currentBookmarkIndex: number = i;

          // setting item priority to 1 higher than the bookmark placed right before the gap
          if (obj.id === itemID) {
            updated[currentBookmarkIndex].priority = draggedIntoPriority + 1;
          }

          // incrementing by 1 priorities of Bookmarks positioned after the place where the item is being dragged to
          if (obj.column === colNumber && obj.id !== itemID) {
            if (obj.priority > draggedIntoPriority) {
              updated[currentBookmarkIndex].priority += 1;
            }
          }
        });

        // reseting priority numbers in column that was item origin

        if (itemColNumber !== colNumber) {
          bookmarksData
            .filter((obj, i) => obj.column === itemColNumber)
            .filter((obj, i) => obj.id !== itemID)
            .sort((a, b) => a.priority - b.priority)
            .forEach((obj, i) => {
              let currentBookmarkIndex: number = 0;

              bookmarksData.forEach((obj2, j) => {
                if (obj2.id === obj.id) {
                  currentBookmarkIndex = j;
                }
              });

              updated[currentBookmarkIndex].priority = i;
            });
        }
      })
    );
  }

  

  return (
    <div
      className={`h-6 ${isOver ? "opacity-0" : ""}`}
      style={{ backgroundColor: singleColumnColor }}
      ref={drop}
    ></div>
  );
}

export default GapAfterBookmark_Img;
