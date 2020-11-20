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
import NoteInput from "./NoteInput";


interface SingleLinkData {
  title: string;
  URL: string;
  tags: string[];
}

interface Props {
  bookmarkTitle: string;
  bookmarkColor: string;
  bookmarkType: "folder" | "note";
  noteInput: string | null
}

function Bookmark({ bookmarkTitle, bookmarkColor, bookmarkType, noteInput }: Props): JSX.Element {
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
  // for Note only
  const [noteInputVisibility, setNoteInputVisibility] = useState<boolean>(
    false
  );

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
            if(bookmarkType === "folder") {

              setSingleLinkVisibility((b) => !b);
            }

            if(bookmarkType === "note") {

              setNoteInputVisibility((b) => !b);
            }

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
          {bookmarkType === "folder" ?      <PlusSVG
            className="h-8 hover:text-black cursor-pointer "
            style={{ marginTop: "-6px" }}
            onClick={() => {
              setNewLinkVis((b) => !b);
            }}
          /> : null}
     

          <ColorSmallSVG
            className={`h-5 mr-2 hover:text-black cursor-pointer ${bookmarkType === "note" ? "ml-2": ""}`}
            onClick={() => {
              setColorsVisibility((b) => !b);
            }}
          />

          <PencilSmallSVG
            className="h-5 -ml-px hover:text-black cursor-pointer "
            onClick={() => {
              setEditBookmarkVis((b) => !b);
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

      {newLinkVis ? (
        <NewLink setNewLinkVis={setNewLinkVis} bookmarkTitle={bookmarkTitle} />
      ) : null}

      {editBookmarkVis ? (
        <EditBookmarkTitle
          bookmarkTitle={bookmarkTitle}
          bookmarkType={bookmarkType}
          setEditBookmarkVis={setEditBookmarkVis}
          noteInput={noteInput}
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

        {
          noteInputVisibility ? <NoteInput noteInput={noteInput}/> : null
        }


    </div>
  );
}

export default Bookmark;
