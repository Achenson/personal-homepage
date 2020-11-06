import React from "react";

import { ReactComponent as PencilSmallSVG } from "../svgs/pencilSmall.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { ReactComponent as PhotographSVG } from "../svgs/photograph.svg";

interface SingleLinkData {
  title: string;
  URL: string;
  tags: string[];
}

interface Props {
  setEditLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
  singleLinkData: SingleLinkData;
  setSingleLinkData: React.Dispatch<React.SetStateAction<SingleLinkData>>
}

function SingleLink({ setEditLinkVis, singleLinkData, setSingleLinkData }: Props): JSX.Element {


// let linkURL = new URL(singleLinkData.URL)

  return (
    <div className="flex justify-between bg-gray-100 h-10 py-2 border-b">
      <div className="flex">
        <PhotographSVG className="h-6 mr-px" />
        <div>

          <a href={singleLinkData.URL} target="_blank" rel="noopener noreferrer">{singleLinkData.title}</a>
          {/* <a href="https://en.wikipedia.org/wiki/Deadly_Rooms_of_Death" target="_blank" rel="noopener noreferrer">{singleLinkData.title}</a> */}
        </div>
      </div>
      <div
        className="flex fill-current text-gray-500"
        style={{ marginTop: "2px" }}
      >
        <PencilSmallSVG
          className="h-5 ml-1 hover:text-black cursor-pointer"
          onClick={() => {
            setEditLinkVis((b) => !b);
            setSingleLinkData({
              title: singleLinkData.title,
              URL: singleLinkData.URL,
              tags: [...singleLinkData.tags]
            })
          }}
        />
        <TrashSmallSVG className="h-5 ml-1 hover:text-black cursor-pointer" />
      </div>
    </div>
  );
}

export default SingleLink;
