import React, { useEffect, useState } from "react";

import { UpperVisAction, InitUpperVisState } from "../../utils/interfaces";
import "../../utils/fade.css";

interface Props {
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  upperVisState: InitUpperVisState;
}

function Message_UpperUI({
  upperVisDispatch,
  upperVisState,
}: Props): JSX.Element {
  const [close, setClose] = useState(false);
  const [fadeInEnd, setFadeInEnd] = useState(false);

  useEffect(() => {
    if (fadeInEnd) {
      setClose(true);
    }
  }, [fadeInEnd, setClose]);

  return (
    <div
      className="absolute flex justify-center items-center right-0 h-16 w-48 bg-white bg-opacity-80 rounded-md border border-gray-700"
      style={{ top: "12px", animation: `${close ? "fadeOut" : "fadeIn"} 2s` }}
      onAnimationEnd={() => {
        // runs after fadeIn
        if (!close) {
          setFadeInEnd(true);
        }
        // runs after fadeOut
        if (close) {
          upperVisDispatch({ type: "MESSAGE_CLOSE" });
        }
      }}
    >
      <p className="">{upperVisState.messagePopup}</p>
      {/* <p>Logout successful</p> */}
    </div>
  );
}

export default Message_UpperUI;
