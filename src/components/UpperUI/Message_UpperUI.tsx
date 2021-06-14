import React, { useEffect, useState } from "react";

import { UpperVisAction, InitUpperVisState } from "../../utils/interfaces";
import { backgroundColorState } from "../../state/colorsState";
import { globalSettingsState } from "../../state/defaultSettings";
import { backgroundColors } from "../../utils/colors_background";

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

  const [backgroundColorData, setBackgroundColorData] =
    backgroundColorState.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  useEffect(() => {
    if (fadeInEnd) {
      setClose(true);
    }
  }, [fadeInEnd, setClose]);

  // instant animation change when message changes:
  //  setting state to initial
  useEffect(() => {
    if (upperVisState.messagePopup) {
      setClose(false);
      setFadeInEnd(false);
    }
  }, [upperVisState.messagePopup, setClose, setFadeInEnd]);

  function backgroundColor(): string {
    if (globalSettingsData.picBackground) {
      return "white";
    }

    if (backgroundColorData === backgroundColors[0][0]) {
      return "blueGray-50";
    }

    if (backgroundColorData === backgroundColors[0][1]) {
      return "blueGray-100";
    }

    return "white";
  }

  return (
    <div
      className={`absolute flex justify-center items-center right-0 h-16 w-28 xs:w-40 -top-32 text-center bg-${backgroundColor()} bg-opacity-80 rounded-md `}
      style={{ animation: `${close ? "fadeOut" : "fadeIn"} 2s` }}
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
