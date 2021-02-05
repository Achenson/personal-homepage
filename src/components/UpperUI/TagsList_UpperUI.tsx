import React from 'react';

import { bookmarksDataState } from "../../state/bookmarksAndLinks";

interface Props {

}


function TagsList_UpperUI({}: Props): JSX.Element{
  
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  let bookmarkFolders = bookmarksData.filter( obj => obj.type === "folder")

  let tags: string[] = [];

  bookmarkFolders.forEach( obj => {
    tags.push(obj.title)
  })



    return (
        <div className="absolute z-50 bg-white -mt-2" style={{width: "271px", marginLeft: "42px"}}>
          {tags.map(el => {
            return (
              <p className="cursor-pointer hover:bg-blueGray-200 pl-px">
                {el}
              </p>
            )
          })}
        </div>
    )
};

export default TagsList_UpperUI;