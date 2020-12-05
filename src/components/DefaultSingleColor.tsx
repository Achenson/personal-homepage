import React from "react";
import { folderColorState } from "../state/colorsState";
import { noteColorState } from "../state/colorsState";
import { columnsColorsState } from "../state/colorsState";

import { produce } from "immer";

interface Props {
  color: string;
  // bookmarkTitle: string;
  defaultColorsFor:
  | "folders"
  | "notes"
  | "column_1"
  | "column_2"
  | "column_3"
  | "column_4"
  | "unselected";
  
}

function SingleColor({ color, defaultColorsFor }: Props): JSX.Element {
  // const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  // let bookmarkIndex: number;

  // bookmarksData.forEach( (obj, i) => {
  //   if (obj.title === bookmarkTitle) {
  //     bookmarkIndex = i
  //   }
  // })

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();

  return (
    <div
      className={`h-4 w-8 bg-${color} cursor-pointer border border-black hover:border-gray-500`}
      onClick={() => {



        
        if (defaultColorsFor === "folders") {
          setFolderColorData(color);
        }

        if (defaultColorsFor === "notes") {
          setNoteColorData(color);
        }

        if (defaultColorsFor === "column_1"
        || "column_2"
        || "column_3"
        || "column_4") {
          setColumnsColorsData((previous) =>
            produce(previous, (updated) => {
              updated.column1 = color;
              updated.column2 = color;
              updated.column3 = color;
              updated.column4 = color;
            })
          );
        }

        // setBookmarksData((previous) =>
        //   produce(previous, (updated) => {
        //     updated[bookmarkIndex].color = `bg-${color}`;
        //   })
        // );
      }}
    ></div>
  );
}

export default SingleColor;
