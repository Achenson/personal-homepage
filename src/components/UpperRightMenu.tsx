import React from "react";

import { ReactComponent as AddFolderSVG } from "../svgs/addFolder.svg";
import { ReactComponent as AddLinkSVG } from "../svgs/addLink.svg";
import { ReactComponent as SettingsSVG } from "../svgs/settingsAlt.svg";
import { ReactComponent as UserSVG } from "../svgs/user.svg";

interface Props {
  setNewLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpperRightMenu({setNewLinkVis}: Props): JSX.Element {
  return (
    <div className=" h-10 w-40 absolute right-0 bottom-0 mb-2 flex justify-around items-center">
      <AddFolderSVG className="h-6" />
      <AddLinkSVG className="h-6 cursor-pointer hover:text-teal-500" onClick={() => {
        setNewLinkVis( b => !b)
      }} />
      <SettingsSVG className="h-6"/>
      <UserSVG className="h-6"/>
    </div>
  );
}

export default UpperRightMenu;
