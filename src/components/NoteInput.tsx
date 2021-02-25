import React from "react";

import { tabsDataState } from "../state/tabsAndLinks";

interface Props {
  //  noteInput: string | null;
  tabID: string | number;
  setEditTabVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function NoteInput({ tabID, setEditTabVis }: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();

  let currentTab = tabsData.filter((obj) => obj.id === tabID);

  return (
    <div className="bg-gray-100 p-2">
      <div
        className="bg-yellow-300 p-2 rounded-md"
        onClick={() => {
          setEditTabVis(true);
        }}
      >
        {currentTab[0].noteInput}
      </div>
    </div>
  );
}

export default NoteInput;
