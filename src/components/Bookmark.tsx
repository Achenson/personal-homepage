import React, { useEffect } from "react";
import { useState } from "react";

import { ReactComponent as PaintSVG } from "../svgs/paint-roller.svg";
import { ReactComponent as ColorSVG } from "../svgs/beaker.svg";
import { ReactComponent as ColorSmallSVG } from "../svgs/beakerSmall.svg";
import { ReactComponent as PencilSVG } from "../svgs/pencil.svg";
import { ReactComponent as PencilSmallSVG } from "../svgs/pencilSmall.svg";
import { ReactComponent as TrashSVG } from "../svgs/trash.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { ReactComponent as HandSVG } from "../svgs/hand.svg";
import { ReactComponent as HandSmallSVG } from "../svgs/handSmall.svg";
import { ReactComponent as CrossArrowsSVG } from "../svgs/cross-arrows.svg";
import SingleLink from "./SingleLink";
import ColorsToChoose from "./ColorsToChoose";

interface Props {}

function Bookmark({}: Props): JSX.Element {
  const [iconsVisibility, setIconsVisibility] = useState<boolean>(false);
  const [colorsVisibility, setColorsVisibility] = useState<boolean>(false);
  const [singleLinkVisibility, setSingleLinkVisibility] = useState<boolean>(
    false
  );

  return (
    <div className="relative">
      <div
        className="h-8 px-2 pt-px bg-teal-500 border border-gray-500 shadow-sm flex justify-between cursor-pointer"
        onMouseEnter={() => {
          setIconsVisibility(true);
        }}
        onMouseLeave={() => {
          setIconsVisibility(false);
        }}
        onClick={() => {
          setSingleLinkVisibility(b => !b)
        }}
      >
        <div>Bookmark</div>

        <div
          className={`pt-1 flex ${
            iconsVisibility ? "visible" : "invisible"
          } fill-current text-gray-700 `}
        >
          <CrossArrowsSVG
            className="h-6 ml-2 cursor-move hover:text-black"
            style={{ marginTop: "-2px" }}
          />
          <PencilSmallSVG className="h-5 ml-2 hover:text-black" />

          <ColorSmallSVG
            className="h-5 ml-2 hover:text-black"
            onClick={() => {
              setColorsVisibility((b) => !b);
            }}
          />
          <TrashSmallSVG className="h-5 ml-2 hover:text-black bg-" />
        </div>
      </div>

      {colorsVisibility ? (
        <ColorsToChoose setIconsVisibility={setIconsVisibility} />
      ) : null}

      {singleLinkVisibility ? (
        <div>
          <SingleLink />
          <SingleLink />
        </div>
      ) : null}
    </div>
  );
}

export default Bookmark;
