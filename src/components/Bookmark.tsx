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
import EditLink from "./EditLink";

interface SingleLinkData {
  title: string;
  URL: string;
  tags: string[];
}

interface Props {
  bookmarkTitle: string;
  bookmarkColor: string;
  linksData: SingleLinkData[];
}

function Bookmark({bookmarkTitle, bookmarkColor, linksData}: Props): JSX.Element {
  const [iconsVisibility, setIconsVisibility] = useState<boolean>(false);
  const [colorsVisibility, setColorsVisibility] = useState<boolean>(false);
  const [singleLinkVisibility, setSingleLinkVisibility] = useState<boolean>(
    false
  );
  const [editLinkVis, setEditLinkVis] = useState<boolean>(false);
  const [editSingleLinkData, setSingleLinkData] = useState<SingleLinkData>({
    title: "",
    URL: "",
    tags: []
  })


  return (
    <div className="relative mb-6">
      <div
        className={`pl-0 h-8 px-2 pt-px ${bookmarkColor} border border-gray-500 shadow-sm flex justify-between`}
        onMouseEnter={() => {
          setIconsVisibility(true);
        }}
        onMouseLeave={() => {
          setIconsVisibility(false);
        }}
      >
        <div
          className="pl-1 cursor-pointer w-full"
          onClick={() => {
            setSingleLinkVisibility((b) => !b);
          }}
        >
          {bookmarkTitle}
        </div>

        <div
          className={`pt-1 flex ${
            iconsVisibility ? "visible" : "invisible"
          } fill-current text-gray-700 `}
        >
          <CrossArrowsSVG
            className="h-6 ml-2 cursor-move hover:text-black hover:invisible"
            style={{ marginTop: "-2px" }}
          />
          <PencilSmallSVG className="h-5 ml-2 hover:text-black cursor-pointer " />

          <ColorSmallSVG
            className="h-5 ml-2 hover:text-black cursor-pointer "
            onClick={() => {
              setColorsVisibility((b) => !b);
            }}
          />
          <TrashSmallSVG className="h-5 ml-2 hover:text-black cursor-pointer " />
        </div>
      </div>

      {colorsVisibility ? (
        <ColorsToChoose setIconsVisibility={setIconsVisibility} />
      ) : null}

      {editLinkVis ? <EditLink setEditLinkVis={setEditLinkVis} editSingleLinkData={editSingleLinkData} /> : null}

      {singleLinkVisibility ? (
        <div>

          {
          linksData
          .filter( el => el.tags.indexOf(`${bookmarkTitle}`) > -1 )
          .map( (el, i) => {
           return <SingleLink setEditLinkVis={setEditLinkVis} singleLinkData={el} setSingleLinkData={setSingleLinkData} key={i} />
          })

          }

          {/* <SingleLink setEditLinkVis={setEditLinkVis} /> */}
          
        </div>
      ) : null}
    </div>
  );
}

export default Bookmark;
