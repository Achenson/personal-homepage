import React from 'react'

import { bookmarksDataState } from "../state/bookmarksAndLinks";


interface Props {
  // noteInput: string | null;
  bookmarkID: string | number;
}

function NoteInput({bookmarkID}: Props): JSX.Element{

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  let currentBookmark = bookmarksData.filter( obj => obj.id === bookmarkID);



    return (
        <div className="bg-gray-100 p-2">
          <div className="bg-yellow-300 p-2 rounded-md">
          {currentBookmark[0].noteInput}

          </div>
        </div>
    )
}

export default NoteInput;