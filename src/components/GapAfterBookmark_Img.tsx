import React from 'react'

import { useDrop } from "react-dnd";
import { produce } from "immer";

import { ItemTypes } from "../utils/itemsDnd";

import { bookmarksDataState } from "../state/bookmarksAndLinks";

interface Props {
    singleColumnColor: string | undefined;
    colNumber: number;
    bookmarkID: number | string;
}

function GapAfterBookmark_Img({singleColumnColor, colNumber, bookmarkID}: Props): JSX.Element{

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

            // bookmark before the gap the the bookmark is dragged into

            let draggedIntoIndex: number = 0

            bookmarksData.forEach((obj, i) => {
                if (obj.id === bookmarkID) {
                  draggedIntoIndex = i;
                }
              });

              let draggedIntoPriority = updated[draggedIntoIndex].priority; 

            updated[bookmarkIndex].priority = draggedIntoPriority+ 1; 

            for (let i = draggedIntoPriority+2; i< updated.length; i++) {
                updated[i].priority =+ 1;
            }
            

           
          })
        );
      }

    return (
        <div className={`h-6 ${isOver ? "opacity-0" : ""}`}
        style={{backgroundColor: singleColumnColor }}
        ref={drop}
        >
        </div>
    )
}

export default GapAfterBookmark_Img;