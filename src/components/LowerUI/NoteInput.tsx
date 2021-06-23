import React, { useEffect, useState } from "react";

import { tabsDataState } from "../../state/tabsAndBookmarks";
import { SingleTabData, TabVisAction, UpperVisState } from "../../utils/interfaces";
import { globalSettingsState } from "../../state/defaultSettings";


interface Props {
  //  noteInput: string | null;
  // setEditTabVis: React.Dispatch<React.SetStateAction<boolean>>;
  visDispatch: React.Dispatch<TabVisAction>;
  currentTab: SingleTabData;
  upperVisState: UpperVisState;
}

function NoteInput({ visDispatch, currentTab, upperVisState }: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  // let currentTab = tabsData.filter((obj) => obj.id === tabID);
  const [focusOnNote, setFocusOnNote] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // !!!! without this everything will be recalculated from start - lag
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  function handleKeyDown(event: KeyboardEvent) {
    if (
      (event.code === "Enter" || event.code === "NumpadEnter") &&
      focusOnNote
    ) {
      visDispatch({ type: "EDIT_TOGGLE" });
    }
  }



  return (
    <div
      className={`${
        globalSettingsData.picBackground
          ? "bg-gray-100 bg-opacity-20 border-b border-gray-800 border-opacity-10"
          : "bg-amber-100 border border-black border-opacity-10 border-t-0"
      } p-2 `}
    >
      <div
        className={`p-2 rounded-md overflow-hidden border border-black border-opacity-10
        focus:outline-none focus:ring-2 focus:ring-${globalSettingsData.picBackground ? "gray-50" : "gray-300"} focus:border-opacity-0`}
        style={{ backgroundColor: "rgb(247, 243, 132)" }}
        onClick={() => {
          // setEditTabVis(true);
          visDispatch({ type: "EDIT_TOGGLE" });
        }}
        // tabIndex={areButtonsDisabled() ? undefined : 0}
        tabIndex={0}
        onFocus={() => setFocusOnNote(true)}
        onBlur={() => setFocusOnNote(false)}
      >
        <p className="whitespace-pre-wrap">{currentTab.noteInput}</p>
      </div>
    </div>
  );
}

export default NoteInput;
