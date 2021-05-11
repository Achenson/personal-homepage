import React from "react";

import { tabsDataState } from "../../state/tabsAndBookmarks";
import { SingleTabData, TabVisAction } from "../../utils/interfaces";
import { globalSettingsState } from "../../state/defaultSettings";

interface Props {
  //  noteInput: string | null;
  // setEditTabVis: React.Dispatch<React.SetStateAction<boolean>>;
  visDispatch: React.Dispatch<TabVisAction>;
  currentTab: SingleTabData;
}

function NoteInput({ visDispatch, currentTab }: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  // let currentTab = tabsData.filter((obj) => obj.id === tabID);

  return (
    <div
      className={`${
        globalSettingsData.picBackground
          ? "bg-gray-100 bg-opacity-20 border-b border-gray-800 border-opacity-10"
          : "bg-amber-100 border border-black border-opacity-10 border-t-0"
      } p-2 `}
    >
      <div
        className="p-2 rounded-md overflow-hidden border border-black border-opacity-10"
        style={{ backgroundColor: "rgb(247, 243, 132)" }}
        onClick={() => {
          // setEditTabVis(true);
          visDispatch({ type: "EDIT_TOGGLE" });
        }}
      >
        <p className="whitespace-pre-wrap">{currentTab.noteInput}</p>
      </div>
    </div>
  );
}

export default NoteInput;
