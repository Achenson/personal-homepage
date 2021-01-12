import React, { useEffect } from "react";
import { useState } from "react";
import { produce } from "immer";

import { bookmarksDataState } from "../state/bookmarksAndLinks";
import { linksDataState } from "../state/bookmarksAndLinks";
import { deletedBookmarkState } from "../state/bookmarksAndLinks";
import {
  noteColorState,
  folderColorState,
  rssColorState,
  columnsColorsState,
} from "../state/colorsState";

import { ReactComponent as ColorSmallSVG } from "../svgs/beakerSmall.svg";
import { ReactComponent as PencilSmallSVG } from "../svgs/pencilSmall.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { ReactComponent as CrossArrowsSVG } from "../svgs/cross-arrows.svg";
import { ReactComponent as PlusSVG } from "../svgs/plus.svg";
import SingleLink from "./SingleLink";
import ColorsToChoose from "./Colors/ColorsToChoose";
import EditLink from "./EditLink";
import NewLink from "./NewLink";
import EditBookmarkTitle from "./EditBookmarkTitle";
import NoteInput from "./NoteInput";
import RSS from "./RSS";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/itemsDnd";

interface SingleLinkData {
  title: string;
  URL: string;
  tags: string[];
}

interface Props {
  bookmarkID: string | number;
  bookmarkTitle: string;
  bookmarkColor: string | null;
  bookmarkType: "folder" | "note" | "rss";
  // noteInput: string | null;
  // rssLink: string | null;
}

function Bookmark({
  bookmarkID,
  bookmarkTitle,
  bookmarkColor,
  bookmarkType,
}: // noteInput,
// rssLink
Props): JSX.Element {
  const [deletedBookmark, setDeletedBookmark] = deletedBookmarkState.use();
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  const [linksData, setLinksData] = linksDataState.use();

  const [iconsVisibility, setIconsVisibility] = useState<boolean>(false);
  const [colorsVisibility, setColorsVisibility] = useState<boolean>(false);
  const [singleLinkVisibility, setSingleLinkVisibility] = useState<boolean>(
    false
  );
  const [rssVisibility, setRssVisibility] = useState<boolean>(false);
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

  const [crossVis, setCrossVis] = useState<boolean>(true);
  // we get two things:
  //  1.) object containing all props - we will get that from collection functions
  // the collecting functions will turn monitor events into props
  // 2.) A ref - the result of this useDrag hook is going to be attached to that specific DOM element
  // isDragging - props coming from collecting function
  const[{isDragging}, drag] = useDrag(
    {
      // the result that will come from out useDrag hook
      item: {
        // type is required
        type: ItemTypes.BOOKMARK,
        bookmarkID: bookmarkID
      },
      collect: monitor => ({
        isDragging: !!monitor.isDragging()
      })
    }
  )


  // 0 to not show typescript errors
  let bookmarkIndex: number = 0;

  // for conditional shadow rendering
  let bookmarkColumn: number;

  bookmarksData.forEach((obj, i) => {
    if (obj.title === bookmarkTitle) {
      bookmarkIndex = i;
      bookmarkColumn = obj.column;
    }
  });

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [rssColorData, setRssColorData] = rssColorState.use();
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();

  let finalBookmarkColor: string = "";

  if (bookmarkColor) {
    finalBookmarkColor = bookmarkColor;
  } else {
    if (bookmarkType === "folder") {
      finalBookmarkColor = folderColorData;
    }

    if (bookmarkType === "note") {
      finalBookmarkColor = noteColorData;
    }

    if (bookmarkType === "rss") {
      finalBookmarkColor = rssColorData;
    }
  }

  function textOrIconColor(
    finalBookmarkColor: string,
    textOrIcon: "text" | "icon"
  ) {
    // exceptions
    let colorsForLightText: string[] = [
      // "orange-500",
      // "teal-500",
      "blueGray-500",
      "gray-500",
      "black",
      "green-505",
      // "warmGray-404",
      "blue-500",

      "red-500",
      "violet-500",
      "purple-500",
    ];
    let colorsForDarkText: string[] = ["yellow-600"];

    if (colorsForLightText.indexOf(finalBookmarkColor) > -1) {
      // return textOrIcon === "text" ? "text-gray-200" : "text-gray-300";
      return textOrIcon === "text" ? "text-gray-100" : "text-gray-200";
      // return textOrIcon === "text" ? "text-gray-300" : "text-gray-400";
    }

    if (colorsForDarkText.indexOf(finalBookmarkColor) > -1) {
      return textOrIcon === "text" ? "text-gray-900" : "text-gray-700";
    }

    // "default" behaviour
    let regexForColors = /[6789]/;

    if (regexForColors.test(finalBookmarkColor)) {
      // return textOrIcon === "text" ? "text-gray-300" : "text-gray-400";
      return textOrIcon === "text" ? "text-gray-100" : "text-gray-200";
    }

    return textOrIcon === "text" ? "text-gray-900" : "text-gray-700";
  }

  function hoverText(finalBookmarkColor: string) {
    let colorsForLightHover: string[] = [
      "bg-black",
      "bg-gray-700",
      "bg-green-800",
      "bg-teal-800",
      "bg-blue-800",
      "bg-indigo-800",
      "bg-purple-800",
      "bg-indigo-700",
      "bg-indigo-600",
      "bg-blue-700",
      "bg-teal-700",
      "bg-green-700",
    ];

    let colorsForLightHoverAlt: string[] = [
      "bg-pink-800",
      "bg-purple-700",
      "bg-orange-800",
      "bg-red-800",
    ];

    if (colorsForLightHoverAlt.indexOf(finalBookmarkColor) > -1) {
      return "text-yellow-400";
    }

    if (colorsForLightHover.indexOf(finalBookmarkColor) > -1) {
      return "text-orange-500";
    }

    return "text-black";
  }

  return (
    <div className="relative" ref={drag}>
      <div
        className={`pl-0 h-8 px-2 pt-px bg-${
          // bookmarkColor ? bookmarkColor : finalBookmarkColor
          finalBookmarkColor
        } ${textOrIconColor(
          finalBookmarkColor,
          "text"
        )} border border-t-0 border-r-0 border-l-0 border-gray-700 border-opacity-25 flex justify-between`}
        style={{ boxShadow: "0px -1px inset rgba(0, 0, 0, 0.05)" }}
        // old style

        // )} border border-t-0 border-r-0 border-l-0 border-gray-400 flex justify-between`}
        // style={{boxShadow: "0px -1px inset rgba(0, 0, 0, 0.3)"}}

        onMouseEnter={() => {
          setIconsVisibility(true);
        }}
        onMouseLeave={() => {
          setIconsVisibility(false);
        }}
      >
        <div
          className="pl-1 w-full cursor-pointer"
          onClick={() => {
            if (bookmarkType === "folder") {
              setSingleLinkVisibility((b) => !b);
            }

            if (bookmarkType === "note") {
              setNoteInputVisibility((b) => !b);
            }

            if (bookmarkType === "rss") {
              setRssVisibility((b) => !b);
            }
          }}
        >
          <p className=""> {bookmarkTitle} {bookmarksData[bookmarkIndex].priority}</p>
        </div>

        <div
          className={`pt-1 flex ${
            iconsVisibility ? "visible" : "invisible"
          } fill-current ${textOrIconColor(finalBookmarkColor, "icon")} `}
        >
          <div
            className="w-6 -mt-1 pt-1 cursor-move"
            style={{ height: "29px" }}
            onMouseEnter={() => {
              setCrossVis(false);
            }}
            onMouseLeave={() => {
              setCrossVis(true);
            }}
          >
            {crossVis ? (
              <CrossArrowsSVG
                // className="h-6  hover:text-black hover:invisible"
                className="h-6"
                style={{ marginTop: "-2px" }}
                
              />
            ) : null}
          </div>

          {bookmarkType === "folder" ? (
            <PlusSVG
              className={`h-8 hover:${hoverText(
                finalBookmarkColor
              )} cursor-pointer`}
              style={{ marginTop: "-6px" }}
              onClick={() => {
                setNewLinkVis((b) => !b);
              }}
            />
          ) : null}

          <ColorSmallSVG
            className={`h-5 mr-2 hover:${hoverText(
              finalBookmarkColor
            )} cursor-pointer ${bookmarkType === "note" ? "ml-2" : ""}`}
            onClick={() => {
              setColorsVisibility((b) => !b);
            }}
          />

          <PencilSmallSVG
            className={`h-5 -ml-px hover:${hoverText(
              finalBookmarkColor
            )} cursor-pointer`}
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
          bookmarkID={bookmarkID}
          bookmarkType={bookmarkType}
          setEditBookmarkVis={setEditBookmarkVis}
          // noteInput={noteInput}
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

      {noteInputVisibility ? (
        <NoteInput
          //  noteInput={noteInput}
          bookmarkID={bookmarkID}
          setEditBookmarkVis={setEditBookmarkVis}
        />
      ) : null}

      {rssVisibility ? (
        <RSS
          // rssLink={rssLink}
          bookmarkID={bookmarkID}
          bookmarkIndex={bookmarkIndex}
        />
      ) : null}
    </div>
  );
}

export default Bookmark;
