import React, { useState } from "react";
// import NewBookmark_UpperUI from './NewBookmark_UpperUI';

import UpperRightMenu from "./UpperRightMenu";
import UpperLeftMenu from "./UpperLeftMenu";

import { UpperVisAction } from "../../utils/interfaces";

interface Props {
  // setNewBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  // setNewTabVis: React.Dispatch<React.SetStateAction<boolean>>;
  // setBackgroundSettingsVis: React.Dispatch<React.SetStateAction<boolean>>;
  // setSettingsVis: React.Dispatch<React.SetStateAction<boolean>>;
  // setColorsVis: React.Dispatch<React.SetStateAction<boolean>>;
  setTabType: React.Dispatch<React.SetStateAction<"folder" | "note" | "rss">>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
}

function UpperUI({ setTabType, upperVisDispatch }: Props): JSX.Element {
  // const [newLinkVis, setNewLinkVis] = useState<boolean>(false);

  return (
    <div className="h-36 relative mx-4 flex justify-between items-end">
      <UpperLeftMenu />
      <UpperRightMenu
        // setSettingsVis={setSettingsVis}
        // setNewBookmarkVis={setNewBookmarkVis}
        // setNewTabVis={setNewTabVis}
        // setBackgroundSettingsVis={setBackgroundSettingsVis}
        // setColorsVis={setColorsVis}
        upperVisDispatch={upperVisDispatch}
        setTabType={setTabType}
      />
    </div>
  );
}

export default UpperUI;
