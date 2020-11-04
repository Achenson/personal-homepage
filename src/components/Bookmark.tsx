import React from "react";


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

interface Props {}

function Bookmark({}: Props): JSX.Element {
  return (
    <div>
         <div className="h-8 px-2 pt-px bg-teal-600 border border-gray-500 shadow-sm flex justify-between cursor-pointer">
      <div>Bookmark</div>
      <div className="pt-1 flex opacity-0 hover:opacity-100">
        <CrossArrowsSVG className="h-6 ml-2 cursor-move" style={{marginTop: "-2px"}}/>
        <PencilSmallSVG className="h-5 ml-2"/>
        <ColorSmallSVG className="h-5 ml-2" />
        <TrashSmallSVG className="h-5 ml-2"/>
      </div>
    </div>

    <SingleLink/>
    <SingleLink/>
    </div>

 
  );
}

export default Bookmark;
