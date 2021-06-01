import React, { useEffect, useState } from "react";

import { UpperVisAction } from "../../utils/interfaces";
import "../../utils/fade.css";

interface Props {
  upperVisDispatch: React.Dispatch<UpperVisAction>;
}

function Message_UpperUI({ upperVisDispatch }: Props): JSX.Element {
  const [close, setClose] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setClose(true);
      // upperVisDispatch({ type: "MESSAGE_CLOSE" });
    }, 2000);
  }, [setClose]);

  return (
    <div
      className="absolute flex justify-center items-center right-0 h-16 w-48 bg-white bg-opacity-80 rounded-md border border-gray-700"
      style={{ top: "12px", animation: `${close ? "fadeOut" : "fadeIn"} 1s` }}
      onAnimationEnd={() => {
        if (close) {
          upperVisDispatch({ type: "MESSAGE_CLOSE" });
        }
      }}
    >
      <p className="">Login successful</p>
      {/* <p>Logout successful</p> */}
    </div>
  );
}

export default Message_UpperUI;
