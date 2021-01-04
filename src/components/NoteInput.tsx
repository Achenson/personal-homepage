import React from "react";

import { bookmarksDataState } from "../state/bookmarksAndLinks";

interface Props {
  //  noteInput: string | null;
  bookmarkID: string | number;
  setEditBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function NoteInput({ bookmarkID, setEditBookmarkVis }: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  let currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkID);

  return (
    <div className="bg-gray-100 p-2">
      <div
        className="bg-yellow-300 p-2 rounded-md"
        onClick={() => {
          setEditBookmarkVis(true);
        }}
      >
        {currentBookmark[0].noteInput}
      </div>
    </div>
  );
}

export default NoteInput;
