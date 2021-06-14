import React, { useState } from "react";
// import NewBookmark_UpperUI from './NewBookmark_UpperUI';

import UpperRightMenu from "./UpperRightMenu";
import UpperLeftMenu from "./UpperLeftMenu";

import { UpperVisAction, InitUpperVisState } from "../../utils/interfaces";
import Message_UpperUI from "./Message_UpperUI";

interface Props {
  // setTabType: React.Dispatch<React.SetStateAction<"folder" | "note" | "rss">>;
  // upperVisDispatch: React.Dispatch<UpperVisAction>;
  // upperVisState: InitUpperVisState;
}

function UpperUI({
  // setTabType,
  // upperVisDispatch,
  // upperVisState,
}: Props): JSX.Element {
  // const [newLinkVis, setNewLinkVis] = useState<boolean>(false);

  return (
    <div className="h-36 relative mx-2 xs:mx-4 flex justify-between items-end">


      {/* <UpperLeftMenu
        upperVisDispatch={upperVisDispatch}
        upperVisState={upperVisState}
      />

      <UpperRightMenu
        upperVisDispatch={upperVisDispatch}
        setTabType={setTabType}
        upperVisState={upperVisState}
      /> */}

      {/* {upperVisState.messagePopup && (
        <Message_UpperUI upperVisDispatch={upperVisDispatch}
        upperVisState={upperVisState}
        />
      )} */}

      
    </div>
  );
}

export default UpperUI;
