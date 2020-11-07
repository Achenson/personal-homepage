import React from "react";
import { bookmarksDataState } from "../state/bookmarksAndLinks";
import { produce } from "immer";

interface Props {
  color: string;
  bookmarkTitle: string;
}

function SingleColor({ color, bookmarkTitle }: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  return (
    <div
      className={`h-4 w-8 bg-${color} cursor-pointer border border-black hover:border-gray-500`}
      onClick={() => {
        setBookmarksData((previous) =>
          produce(previous, (updated) => {
            updated[0].color = `bg-${color}`;
          })
        );
      }}
    ></div>
  );
}

export default SingleColor;
