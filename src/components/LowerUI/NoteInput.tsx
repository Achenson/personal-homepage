import React, { useEffect, useState } from "react";

// import { tabsDataState } from "../../state/tabsAndBookmarks";


import {
  SingleTabData,
  TabVisAction,
  UpperVisState,
} from "../../utils/interfaces";
// import { globalSettingsState } from "../../state/defaultSettings";

import shallow from "zustand/shallow";
import { useGlobalSettings } from "../../state/defaultSettingsHooks";
import {useTabContext} from "../../utils/tabContext"

interface Props {
  //  noteInput: string | null;
  // setEditTabVis: React.Dispatch<React.SetStateAction<boolean>>;
  // tabVisDispatch: React.Dispatch<TabVisAction>;
  currentTab: SingleTabData;
  // upperVisState: UpperVisState;
}

function NoteInput({
  // tabVisDispatch,
  currentTab,
  // upperVisState,
}: Props): JSX.Element {
  // const [tabsData, setTabsData] = tabsDataState.use();
  // const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const globalSettings = useGlobalSettings(state => state, shallow)
  const tabContext = useTabContext()

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
      // tabVisDispatch({ type: "EDIT_TOGGLE" });
      tabContext.tabVisDispatch({type: "EDIT_TOGGLE"})
    }
  }

  return (
    <div
      className={`${
        globalSettings.picBackground
          ? "bg-gray-100 bg-opacity-20 border-b border-gray-800 border-opacity-10"
          : "bg-amber-100 border border-black border-opacity-10 border-t-0"
      } p-2 `}
    >
      <div
        className={`p-2 rounded-md overflow-hidden border border-black border-opacity-10
        focus:outline-none focus-visible:ring-2 ring-${
          globalSettings.picBackground ? "gray-50" : "gray-300"
        } focus:border-opacity-0`}
        style={{ backgroundColor: "rgb(247, 243, 132)" }}
        onClick={() => {
          // setEditTabVis(true);
          // tabVisDispatch({ type: "EDIT_TOGGLE" });
          tabContext.tabVisDispatch({type: "EDIT_TOGGLE"});
        }}
        // tabIndex={areButtonsDisabled() ? undefined : 0}
        tabIndex={0}
        onFocus={() => setFocusOnNote(true)}
        onBlur={() => setFocusOnNote(false)}
      >
        <p className="whitespace-pre-wrap">{currentTab?.noteInput}</p>
      </div>
    </div>
  );
}

export default NoteInput;
