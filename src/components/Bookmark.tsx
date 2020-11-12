import React, { useEffect } from "react";
import { useState } from "react";
import { produce } from "immer";

import { bookmarksDataState } from "../state/bookmarksAndLinks";
import { linksDataState } from "../state/bookmarksAndLinks";
import { deletedBookmarkState } from "../state/bookmarksAndLinks";

import { ReactComponent as ColorSmallSVG } from "../svgs/beakerSmall.svg";
import { ReactComponent as PencilSmallSVG } from "../svgs/pencilSmall.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { ReactComponent as CrossArrowsSVG } from "../svgs/cross-arrows.svg";
import { ReactComponent as PlusSVG } from "../svgs/plus.svg";
import SingleLink from "./SingleLink";
import ColorsToChoose from "./ColorsToChoose";
import EditLink from "./EditLink";
import NewLink from "./NewLink";
import EditBookmarkTitle from "./EditBookmarkTitle";

interface SingleLinkData {
  title: string;
  URL: string;
  tags: string[];
}

interface Props {
  bookmarkTitle: string;
  bookmarkColor: string;
}

function Bookmark({ bookmarkTitle, bookmarkColor }: Props): JSX.Element {
  const [deletedBookmark, setDeletedBookmark] = deletedBookmarkState.use();
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [linksData, setLinksData] = linksDataState.use();

  const [iconsVisibility, setIconsVisibility] = useState<boolean>(false);
  const [colorsVisibility, setColorsVisibility] = useState<boolean>(false);
  const [singleLinkVisibility, setSingleLinkVisibility] = useState<boolean>(
    false
  );
  const [editLinkVis, setEditLinkVis] = useState<boolean>(false);
  const [newLinkVis, setNewLinkVis] = useState<boolean>(false);
  const [editBookmarkVis, setEditBookmarkVis] = useState<boolean>(false);

  const [editSingleLinkData, setEditSingleLinkData] = useState<SingleLinkData>({
    title: "",
    URL: "",
    tags: [],
  });

  let bookmarkIndex: number;

  bookmarksData.forEach((obj, i) => {
    if (obj.title === bookmarkTitle) {
      bookmarkIndex = i;
    }
  });

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
          <PlusSVG
            className="h-8  hover:text-black cursor-pointer "
            style={{ marginTop: "-6px" }}
            onClick={() => {
              setNewLinkVis((b) => !b);
            }}
          />

          <PencilSmallSVG
            className="h-5  hover:text-black cursor-pointer "
            onClick={() => {
              setEditBookmarkVis((b) => !b);
            }}
          />

          <ColorSmallSVG
            className="h-5 ml-2 hover:text-black cursor-pointer "
            onClick={() => {
              setColorsVisibility((b) => !b);
            }}
          />
          <TrashSmallSVG
            className="h-5 ml-2 hover:text-black cursor-pointer "
            onClick={() => {
              setDeletedBookmark(bookmarkTitle);

              setBookmarksData((previous) =>
                produce(previous, (updated) => {
                  updated.splice(bookmarkIndex, 1);
                })
              );
              // removing deleted bookmark(tag) for links
              linksData.forEach((obj, i) => {
                if (obj.tags.indexOf(bookmarkTitle) > -1) {
                  setLinksData((previous) =>
                    produce(previous, (updated) => {
                      updated[i].tags.splice(
                        obj.tags.indexOf(bookmarkTitle),
                        1
                      );
                    })
                  );
                }
              });
            }}
          />
        </div>
      </div>

      {colorsVisibility ? (
        <ColorsToChoose
          setIconsVisibility={setIconsVisibility}
          bookmarkTitle={bookmarkTitle}
        />
      ) : null}

      {editLinkVis ? (
        <EditLink
          setEditLinkVis={setEditLinkVis}
          editSingleLinkData={editSingleLinkData}
        />
      ) : null}

      {newLinkVis ? <NewLink setNewLinkVis={setNewLinkVis} bookmarkTitle={bookmarkTitle} /> : null}

      {editBookmarkVis ? (
        <EditBookmarkTitle
          bookmarkTitle={bookmarkTitle}
          setEditBookmarkVis={setEditBookmarkVis}
        />
      ) : null}

      {singleLinkVisibility ? (
        <div>
          {linksData
            .filter((el) => el.tags.indexOf(`${bookmarkTitle}`) > -1)
            .map((el, i) => {
              return (
                <SingleLink
                  setEditLinkVis={setEditLinkVis}
                  singleLinkData={el}
                  setEditSingleLinkData={setEditSingleLinkData}
                  key={i}
                />
              );
            })}

          {/* <SingleLink setEditLinkVis={setEditLinkVis} /> */}
        </div>
      ) : null}
    </div>
  );
}

export default Bookmark;
