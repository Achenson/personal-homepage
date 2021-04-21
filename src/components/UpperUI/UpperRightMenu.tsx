import React from "react";

import { ReactComponent as AddFolderSVG } from "../../svgs/addFolder.svg";
import { ReactComponent as FolderSVG } from "../../svgs/folder.svg";

import { ReactComponent as BookmarkSVG } from "../../svgs/bookmarkAlt.svg";
// import { ReactComponent as AddNote } from "../../svgs/addNote.svg";
import { ReactComponent as AddNote } from "../../svgs/text-document-add.svg";
import { ReactComponent as NoteSVG } from "../../svgs/note_UXwing.svg";
import { ReactComponent as SettingsSVG } from "../../svgs/settingsAlt.svg";
import { ReactComponent as UserSVG } from "../../svgs/user.svg";
import { ReactComponent as ColorSVG } from "../../svgs/beaker.svg";
import { ReactComponent as AddRssSVG } from "../../svgs/rss.svg";
import { ReactComponent as RssSVG } from "../../svgs/rss_UXwing.svg";
import { ReactComponent as PhotographSVG } from "../../svgs/photograph.svg";

import { uiColorState } from "../../state/colorsState";

import {UpperVisAction} from "../../utils/interfaces"

import { closeAllTabsState, tabOpenedState } from "../../state/defaultSettings";

interface Props {
  
  setTabType: React.Dispatch<
    React.SetStateAction<"folder" | "note" | "rss">
  >;
  upperVisDispatch: React.Dispatch<UpperVisAction>
}

function UpperRightMenu({
  setTabType,
  upperVisDispatch
}: Props): JSX.Element {
  const [uiColorData, setUiColorData] = uiColorState.use();
  // const [closeAllTabsData, setCloseAllTabsData] =closeAllTabsState.use();
  const [tabOpenedData, setTabOpenedData] = tabOpenedState.use();

  return (
    // <div className=" h-10 w-56 absolute right-0 bottom-0 mb-2 flex justify-between items-center">
    <div className="h-7 w-28 xs:w-56  flex justify-between items-center bg-white bg-opacity-80 rounded-md border border-gray-700 "
    style={{marginBottom: "2px"}}
    >
      <div className="flex w-28 justify-around">
        {/* <AddLinkSVG */}
        <BookmarkSVG
          className={`h-7 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
          onClick={() => {
            
            // setNewBookmarkVis((b) => !b);
            upperVisDispatch({type: "NEW_BOOKMARK_TOGGLE"})
          }}
        />

        {/* <AddFolderSVG */}
        <FolderSVG
          className={`h-7 cursor-pointer transition-colors duration-75 hover:text-${uiColorData} mr-1`}
          onClick={() => {
            
            // setNewTabVis((b) => !b);
            upperVisDispatch({type: "NEW_TAB_TOGGLE"})
            setTabType("folder");
          }}
        />
        {/* <AddNote */}
        <NoteSVG
          className={`h-6 cursor-pointer fill-current transition-colors duration-75 text-black hover:text-${uiColorData}`}
          style={{marginTop: "2px"}}
          onClick={() => {
            // setNewTabVis((b) => !b);
           
            upperVisDispatch({type: "NEW_TAB_TOGGLE"})
            setTabType("note");
          }}
        />

        {/* <AddRssSVG className={`h-6 cursor-pointer hover:text-${uiColorData}`} */}
        <AddRssSVG
          className={`h-7 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
          onClick={() => {
            // setNewTabVis((b) => !b);
            
            upperVisDispatch({type: "NEW_TAB_TOGGLE"})
            setTabType("rss");
          }}
        />
      </div>

      <div className="hidden xs:flex w-24 justify-around items-center">
        <PhotographSVG
          className={`h-6 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
          onClick={() => {
            // setBackgroundSettingsVis((b) => !b);
         
            upperVisDispatch({type: "BACKGROUND_SETTINGS_TOGGLE"})
          }}
        />
        <ColorSVG
          className={`h-6 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
          onClick={() => {
           
            upperVisDispatch({type: "COLORS_SETTINGS_TOGGLE"})
            // setColorsVis((b) => !b);
          }}
        />
        <SettingsSVG
          className={`h-6 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
          onClick={() => {

            // setTabOpenedData(null)

        // setCloseAllTabsData(true);
            upperVisDispatch({type: "SETTINGS_TOGGLE"})
          }}
        />
        <UserSVG className="h-6" style={{marginLeft: "-3px"}} />
      </div>



      
    </div>
  );
}

export default UpperRightMenu;
