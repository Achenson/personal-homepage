import React from "react";
import { bookmarksDataState } from "../state/bookmarksAndLinks";
import { produce } from "immer";

interface Props {
  color: string;
  // bookmarkTitle: string;
  defaultColorsFor: "folders" | "notes" | "columns";
}

function SingleColor({ color, defaultColorsFor }: Props): JSX.Element {

  // const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  // let bookmarkIndex: number;

  // bookmarksData.forEach( (obj, i) => {
  //   if (obj.title === bookmarkTitle) {
  //     bookmarkIndex = i
  //   }
  // })

  return (
    <div
      className={`h-4 w-8 bg-${color} cursor-pointer border border-black hover:border-gray-500`}
      onClick={() => {
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
