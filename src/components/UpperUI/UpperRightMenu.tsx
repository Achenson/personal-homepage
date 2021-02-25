import React from "react";

import { ReactComponent as AddFolderSVG } from "../../svgs/addFolder.svg";
import { ReactComponent as FolderSVG } from "../../svgs/folder.svg";
import { ReactComponent as Folder2SVG } from "../../svgs/folder_flaticon.svg";
import { ReactComponent as Folder3SVG } from "../../svgs/folder-open_flaticon.svg";
import { ReactComponent as FolderForTabsSVG } from "../../svgs/folder-bookmark_UXwing.svg";
import { ReactComponent as AddLinkSVG } from "../../svgs/addLink.svg";
import { ReactComponent as LinkSVG } from "../../svgs/link.svg";
import { ReactComponent as Link2SVG } from "../../svgs/link_UXwing.svg";
import { ReactComponent as TabSVG } from "../../svgs/bookmark.svg";
import { ReactComponent as Tab2SVG } from "../../svgs/bookmark-saved_UXwing.svg";
import { ReactComponent as Tab3SVG } from "../../svgs/bookmark_flaticon.svg";
import { ReactComponent as Tab4SVG } from "../../svgs/bookmark-fancy_flaticon.svg";
import { ReactComponent as TabAltSVG } from "../../svgs/bookmarkAlt.svg";
// import { ReactComponent as AddNote } from "../../svgs/addNote.svg";
import { ReactComponent as AddNote } from "../../svgs/text-document-add.svg";
import { ReactComponent as Note } from "../../svgs/note_UXwing.svg";
import { ReactComponent as SettingsSVG } from "../../svgs/settingsAlt.svg";
import { ReactComponent as UserSVG } from "../../svgs/user.svg";
import { ReactComponent as ColorSVG } from "../../svgs/beaker.svg";
import { ReactComponent as AddRssSVG } from "../../svgs/rss.svg";
import { ReactComponent as RssSVG } from "../../svgs/rss_UXwing.svg";
import { ReactComponent as PhotographSVG } from "../../svgs/photograph.svg";

import { uiColorState } from "../../state/colorsState";

interface Props {
  setNewLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
  setNewTabVis: React.Dispatch<React.SetStateAction<boolean>>;
  setBackgroundSettingsVis: React.Dispatch<React.SetStateAction<boolean>>;
  setSettingsVis: React.Dispatch<React.SetStateAction<boolean>>;
  setColorsVis: React.Dispatch<React.SetStateAction<boolean>>;
  setTabType: React.Dispatch<
    React.SetStateAction<"folder" | "note" | "rss">
  >;
}

function UpperRightMenu({
  setNewLinkVis,
  setNewTabVis,
  setBackgroundSettingsVis,
  setSettingsVis,
  setColorsVis,
  setTabType,
}: Props): JSX.Element {
  const [uiColorData, setUiColorData] = uiColorState.use();

  return (
    // <div className=" h-10 w-56 absolute right-0 bottom-0 mb-2 flex justify-between items-center">
    <div className="h-8 w-56 flex justify-between items-center bg-white bg-opacity-80 rounded-md">
      <div className="flex w-28 justify-around">
        {/* <AddLinkSVG */}
        <TabAltSVG
          className={`h-7 cursor-pointer hover:text-${uiColorData}`}
          onClick={() => {
            setNewLinkVis((b) => !b);
          }}
        />

        {/* <AddFolderSVG */}
        <FolderSVG
          className={`h-7 cursor-pointer hover:text-${uiColorData} mr-1`}
          onClick={() => {
            setNewTabVis((b) => !b);
            setTabType("folder");
          }}
        />
        {/* <AddNote */}
        <Note
          className={`h-6 cursor-pointer fill-current text-black hover:text-${uiColorData}`}
          onClick={() => {
            setNewTabVis((b) => !b);
            setTabType("note");
          }}
        />

        {/* <AddRssSVG className={`h-6 cursor-pointer hover:text-${uiColorData}`} */}
        <AddRssSVG
          className={`h-7 cursor-pointer hover:text-${uiColorData}`}
          onClick={() => {
            setNewTabVis((b) => !b);
            setTabType("rss");
          }}
        />
      </div>

      <div className="flex w-24 justify-around">
        <PhotographSVG
          className={`h-6 cursor-pointer hover:text-${uiColorData}`}
          onClick={() => {
            setBackgroundSettingsVis((b) => !b);
          }}
        />
        <ColorSVG
          className={`h-6 cursor-pointer hover:text-${uiColorData}`}
          onClick={() => {
            setColorsVis((b) => !b);
          }}
        />
        <SettingsSVG
          className={`h-6 cursor-pointer hover:text-${uiColorData}`}
          onClick={() => {
            setSettingsVis((b) => !b);
          }}
        />
        <UserSVG className="h-6" />
      </div>
    </div>
  );
}

export default UpperRightMenu;
