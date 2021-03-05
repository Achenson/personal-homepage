import React from "react";

import { tabsDataState } from "../state/tabsAndBookmarks";

interface Props {
  //  noteInput: string | null;
  tabID: string | number;
  // setEditTabVis: React.Dispatch<React.SetStateAction<boolean>>;
  visDispatch: React.Dispatch<Action>;
}

interface Action {
  type: string;
  payload?: string | number
}

function NoteInput({ tabID, visDispatch }: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();

  let currentTab = tabsData.filter((obj) => obj.id === tabID);

  return (
    <div className="bg-gray-100 p-2">
      <div
        className="bg-yellow-300 p-2 rounded-md"
        style={{whiteSpace: "pre-wrap"}}
        onClick={() => {
          // setEditTabVis(true);
          visDispatch({type: "EDIT_OPEN"})
        }}
      >
       <p  style={{whiteSpace: "-moz-pre-wrap"}}>{currentTab[0].noteInput}</p> 
      </div>
    </div>
  );
}

export default NoteInput;
