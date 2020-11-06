import React from "react";

import { ReactComponent as PencilSmallSVG } from "../svgs/pencilSmall.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { ReactComponent as PhotographSVG } from "../svgs/photograph.svg";

interface Props {
  setEditLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
  singleLinkData: {
    title: string;
    URL: string;
    tags: string[];
}
}

function SingleLink({ setEditLinkVis, singleLinkData }: Props): JSX.Element {
  return (
    <div className="flex justify-between bg-gray-100 h-10 py-2 border-b">
      <div className="flex">
        <PhotographSVG className="h-6 mr-px" />
  <div className="cursor-pointer">{singleLinkData.title}</div>
      </div>
      <div
        className="flex fill-current text-gray-500"
        style={{ marginTop: "2px" }}
      >
        <PencilSmallSVG
          className="h-5 ml-1 hover:text-black cursor-pointer"
          onClick={() => {
            setEditLinkVis((b) => !b);
          }}
        />
        <TrashSmallSVG className="h-5 ml-1 hover:text-black cursor-pointer" />
      </div>
    </div>
  );
}

export default SingleLink;
