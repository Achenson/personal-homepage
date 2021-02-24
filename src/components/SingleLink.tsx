import React from "react";
import { produce } from "immer";
import { linksDataState } from "../state/bookmarksAndLinks";

import { ReactComponent as PencilSmallSVG } from "../svgs/pencilSmall.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { ReactComponent as PhotographSVG } from "../svgs/photograph.svg";

import { linksAllTagsState } from "../state/bookmarksAndLinks";

import { SingleLinkData } from "../utils/interfaces";

// interface SingleLinkData {
//   id: number | string;
//   title: string;
//   URL: string;
//   tags: string[];
// }

interface Props {
  setEditLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
  singleLinkData: SingleLinkData;

  setLinkId: React.Dispatch<React.SetStateAction<string | number | undefined>>;
  bookmarkID: string | number;
  // setEditSingleLinkData: React.Dispatch<React.SetStateAction<SingleLinkData>>;
}

function SingleLink({
  setEditLinkVis,
  singleLinkData,
  // setEditSingleLinkData,
  setLinkId,
  bookmarkID,
}: Props): JSX.Element {
  const [linksData, setLinksData] = linksDataState.use();
  const [linksAllTagsData, setLinksAllTagsData] = linksAllTagsState.use();

  // let linkURL = new URL(singleLinkData.URL)

  let bookmarkIndex: number = 0;

  linksData.forEach((obj, i) => {
    if (obj.id === singleLinkData.id) {
      bookmarkIndex = i;
    }
  });

  let currentBookmarkTitle = linksData[bookmarkIndex].title;

  return (
    <div className="flex justify-between bg-gray-100 h-10 py-2 border-b">
      <div className="flex">
        <PhotographSVG className="h-6 mr-px" />
        <div>
          <a
            href={singleLinkData.URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {singleLinkData.title}
          </a>
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

            setLinkId(singleLinkData.id);
          }}
        />
        <TrashSmallSVG
          className="h-5 ml-1 hover:text-black cursor-pointer"
          onClick={() => {
            // for deleting empty folder

            let tagsIdsToDelete: (string | number)[] = [];

            singleLinkData.tags.forEach((el) => {
              let filteredLinks = linksData.filter(
                (obj) => obj.id !== singleLinkData.id
              );

              let isElPresent: boolean = false;

              filteredLinks.forEach((obj) => {
                if (obj.tags.indexOf(el) > -1) {
                  isElPresent = true;
                  return;
                }
              });

              if (!isElPresent && el !== "ALL_TAGS") {
                tagsIdsToDelete.push(el);
              }
            });

            let linksAllTagsData_new: (string | number)[] = [];

            linksAllTagsData.forEach((el) => {
              if (tagsIdsToDelete.indexOf(el) === -1) {
                linksAllTagsData_new.push(el);
              }
            });

            setLinksAllTagsData([...linksAllTagsData_new]);


            setLinksData((previous) =>
              produce(previous, (updated) => {
                updated.splice(bookmarkIndex, 1);
              })
            );
          }}
        />
      </div>
    </div>
  );
}

export default SingleLink;
