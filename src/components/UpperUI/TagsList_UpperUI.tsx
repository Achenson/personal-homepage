import React, {useState} from "react";

import { bookmarksDataState } from "../../state/bookmarksAndLinks";

interface Props {
  setTagsInputStr: React.Dispatch<React.SetStateAction<string>>
}

function TagsList_UpperUI({setTagsInputStr}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  let bookmarkFolders = bookmarksData.filter((obj) => obj.type === "folder");


  const initialTags = makeInitialTags();

  const [visibleTags, setVisibleTags] = useState(makeInitialTags());



  function makeInitialTags(): string[] {
    let tags: string[] = [];

    bookmarkFolders.forEach((obj) => {
      tags.push(obj.title);
    });

    return tags;
  }

  return (
    <div
      className="absolute z-50 bg-white -mt-2"
      style={{ width: "271px", marginLeft: "42px" }}
    >
      {visibleTags.map((el) => {
        return (
          <p className="cursor-pointer hover:bg-blueGray-200 pl-px" onClick={
            () => {

            }
          }>{el}</p>
        );
      })}
    </div>
  );
}

export default TagsList_UpperUI;
