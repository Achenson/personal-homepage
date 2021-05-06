import React, { useState } from "react";

import UpperRightMenu_XS from "./UpperRightMenu_XS";

import { ReactComponent as AddFolderSVG } from "../../svgs/addFolder.svg";
import { ReactComponent as FolderSVG } from "../../svgs/folder.svg";

import { ReactComponent as PlusSmSVG } from "../../svgs/plus-sm.svg";
import { ReactComponent as PlusSVG } from "../../svgs/plus.svg";
import { ReactComponent as PlusSquareSVG } from "../../svgs/plus-square-line_uxwing.svg";
import { ReactComponent as PlusCircleSVG } from "../../svgs/plus-circle.svg";
import { ReactComponent as PlusCircleZondSVG } from "../../svgs/add-outline_zond.svg";
import { ReactComponent as BookmarkSVG } from "../../svgs/bookmarkAlt.svg";
// import { ReactComponent as AddNote } from "../../svgs/addNote.svg";
import { ReactComponent as AddNote } from "../../svgs/text-document-add.svg";
import { ReactComponent as NoteSVG } from "../../svgs/note_UXwing.svg";
import { ReactComponent as SettingsSVG } from "../../svgs/settingsAlt.svg";
import { ReactComponent as CogSVG } from "../../svgs/cog.svg";
import { ReactComponent as UserSVG } from "../../svgs/user.svg";
import { ReactComponent as LogoutSVG } from "../../svgs/logout.svg";
import { ReactComponent as ColorSVG } from "../../svgs/beaker.svg";
import { ReactComponent as AddRssSVG } from "../../svgs/rss.svg";
import { ReactComponent as RssSVG } from "../../svgs/rss_UXwing.svg";
import { ReactComponent as PhotographSVG } from "../../svgs/photograph.svg";

import { uiColorState } from "../../state/colorsState";

import { UpperVisAction, InitUpperVisState } from "../../utils/interfaces";

import { closeAllTabsState, tabOpenedState } from "../../state/defaultSettings";

interface Props {
  setTabType: React.Dispatch<React.SetStateAction<"folder" | "note" | "rss">>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  upperVisState: InitUpperVisState;
}

function UpperRightMenu({
  setTabType,
  upperVisDispatch,
  upperVisState,
}: Props): JSX.Element {
  const [uiColorData, setUiColorData] = uiColorState.use();
  // const [closeAllTabsData, setCloseAllTabsData] =closeAllTabsState.use();
  const [tabOpenedData, setTabOpenedData] = tabOpenedState.use();

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    // <div className=" h-10 w-56 absolute right-0 bottom-0 mb-2 flex justify-between items-center">
    <div
      className={`${
        upperVisState.addTagVis_xs || upperVisState.settingsVis_xs
          ? "h-14"
          : "h-7"
      } xs:h-7 w-28 xs:w-56  block xs:flex justify-between items-center bg-white bg-opacity-80 rounded-md border border-gray-700 `}
      style={{ marginBottom: "2px" }}
    >
      <div className="hidden xs:flex w-28 justify-around">
        {/* <AddLinkSVG */}
        <BookmarkSVG
          className={`h-7 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
          onClick={() => {
            // setNewBookmarkVis((b) => !b);
            upperVisDispatch({ type: "NEW_BOOKMARK_TOGGLE" });
          }}
        />

        {/* <AddFolderSVG */}
        <FolderSVG
          className={`h-7 cursor-pointer transition-colors duration-75 hover:text-${uiColorData} mr-1`}
          onClick={() => {
            // setNewTabVis((b) => !b);
            upperVisDispatch({ type: "NEW_TAB_TOGGLE" });
            setTabType("folder");
          }}
        />
        {/* <AddNote */}
        <NoteSVG
          className={`h-6 cursor-pointer fill-current transition-colors duration-75 text-black hover:text-${uiColorData}`}
          style={{ marginTop: "2px" }}
          onClick={() => {
            // setNewTabVis((b) => !b);

            upperVisDispatch({ type: "NEW_TAB_TOGGLE" });
            setTabType("note");
          }}
        />

        {/* <AddRssSVG className={`h-6 cursor-pointer hover:text-${uiColorData}`} */}
        <AddRssSVG
          className={`h-7 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
          onClick={() => {
            // setNewTabVis((b) => !b);

            upperVisDispatch({ type: "NEW_TAB_TOGGLE" });
            setTabType("rss");
          }}
        />
      </div>

      {/* XS============================== */}

      <UpperRightMenu_XS
        setTabType={setTabType}
        upperVisDispatch={upperVisDispatch}
        upperVisState={upperVisState}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      {/* xs ============================^ */}

      <div className="hidden xs:flex w-24 justify-around items-center">
        <PhotographSVG
          className={`h-6 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
          onClick={() => {
            // setBackgroundSettingsVis((b) => !b);

            upperVisDispatch({ type: "BACKGROUND_SETTINGS_TOGGLE" });
          }}
        />
        <ColorSVG
          className={`h-6 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
          onClick={() => {
            upperVisDispatch({ type: "COLORS_SETTINGS_TOGGLE" });
            // setColorsVis((b) => !b);
          }}
        />
        <SettingsSVG
          className={`h-6 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
          onClick={() => {
            // setTabOpenedData(null)

            // setCloseAllTabsData(true);
            upperVisDispatch({ type: "SETTINGS_TOGGLE" });
          }}
        />
        {loggedIn ? (
          <LogoutSVG
            className={`h-6 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
            style={{ marginLeft: "0px" }}
            onClick={() => {
              // upperVisDispatch({ type: "PROFILE_TOGGLE" });
              setLoggedIn(false);
            }}
          />
        ) : (
          <UserSVG
            className={`h-6 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
            // style={{ marginLeft: "-3px" }}
            onClick={() => {
              upperVisDispatch({ type: "PROFILE_TOGGLE" });
              setLoggedIn(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default UpperRightMenu;
