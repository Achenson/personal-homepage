import React, { useEffect, useState, useReducer } from "react";

import { tabsDataState } from "../state/tabsAndBookmarks";
import { bookmarksDataState } from "../state/tabsAndBookmarks";
import { deletedTabState } from "../state/tabsAndBookmarks";
import {
  noteColorState,
  folderColorState,
  rssColorState,
  columnsColorsState,
  tabBeingDraggedColor_State,
} from "../state/colorsState";

import {
  closeAllTabsState,
  tabColorOpenedState,
  tabEditOpenedState,
  globalSettingsState,
} from "../state/defaultSettings";

import { ReactComponent as ColorSmallSVG } from "../svgs/beakerSmall.svg";
import { ReactComponent as PencilSmallSVG } from "../svgs/pencilSmall.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { ReactComponent as CrossArrowsSVG } from "../svgs/cross-arrows.svg";
import { ReactComponent as PlusSVG } from "../svgs/plus.svg";
import SingleBookmark from "./SingleBookmark";
import ColorsToChoose from "./Colors/ColorsToChoose";

// import EditLink from "./EditBookmark";
import Bookmark_newAndEdit from "./Bookmark_newAndEdit";
import EditTabTitle from "./EditTabTitle";
import NoteInput from "./NoteInput";
import RSS_reactQuery from "./RSS_reactQuery";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/itemsDnd";

interface SingleBookmarkData {
  title: string;
  URL: string;
  tags: string[];
}

interface Action {
  type: string;
  payload?: string | number;
}

interface Props {
  tabID: string | number;
  tabTitle: string;
  tabColor: string | null;
  tabType: "folder" | "note" | "rss";
  colNumber: number;
  // noteInput: string | null;
  // rssLink: string | null;
  closeAllTabs: boolean;
}

interface VisState {
  newBookmarkVis: boolean;
  editTabVis: boolean;
  colorsVisibility: boolean;
  singleBookmarkVisibility: boolean;
  editBookmarkVis: boolean;
  rssVisibility: boolean;
  noteInputVisibility: boolean;
}

const initVisState = {
  newBookmarkVis: false,
  editTabVis: false,
  colorsVisibility: false,

  singleBookmarkVisibility: false,
  editBookmarkVis: false,

  rssVisibility: false,
  noteInputVisibility: false,

  // resetToFalse() {
  //   for (let key in this) {
  //     // @ts-ignore: Unreachable code error
  //   this[key] = false;
  //   }
  // }
};



function Tab({
  tabID,
  tabTitle,
  tabColor,
  tabType,
  colNumber,
  closeAllTabs,
}: // noteInput,
// rssLink
Props): JSX.Element {
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  const [deletedTab, setDeletedTab] = deletedTabState.use();
  const [tabsData, setTabsData] = tabsDataState.use();

  const [tabColorOpenedData, setTabColorOpenedData] = tabColorOpenedState.use();
  const [tabEditOpenedData, setTabEditOpenedData] = tabEditOpenedState.use();

  function visReducer(state: VisState, action: Action) {
    let stateAllInitial: VisState = { ...initVisState };
    // stateAllInitial.resetToFalse();
  
    switch (action.type) {
      case "COLORS_TOGGLE":
        if (state.colorsVisibility) {
          setTabColorOpenedData(null);
        }
        if (!state.colorsVisibility) {
          setTabColorOpenedData(action.payload as (string | null));
        }
        return { ...stateAllInitial, colorsVisibility: !state.colorsVisibility };
      case "COLORS_CLOSE":
        // setTabColorOpenedData(null);
        return { ...stateAllInitial, colorsVisibility: false };
      case "EDIT_TOGGLE":
        if (state.editTabVis) {
          setTabEditOpenedData(null);
        }
        if (!state.editTabVis) {
          setTabEditOpenedData(action.payload as (string | null));
        }
        return { ...stateAllInitial, editTabVis: !state.editTabVis };
      // case "EDIT_OPEN":
      //   return { ...stateAllInitial, editTabVis: true };
      case "EDIT_CLOSE":
        // setTabEditOpenedData(null);
        return { ...stateAllInitial, editTabVis: false };
      default:
        return state;
    }
  }

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  const [iconsVisibility, setIconsVisibility] = useState<boolean>(false);

  // const [colorsVisibility, setColorsVisibility] = useState<boolean>(false);
  // const [editTabVis, setEditTabVis] = useState<boolean>(false);

  const [visState, visDispatch] = useReducer(visReducer, initVisState);

  const [editBookmarkVis, setEditBookmarkVis] = useState<boolean>(false);
  const [newBookmarkVis, setNewBookmarkVis] = useState<boolean>(false);
  // const [editTabVis, setEditTabVis] = useState<boolean>(false);

  useEffect(() => {
    if (tabColorOpenedData !== tabID) {
      // setColorsVisibility(false);
      visDispatch({ type: "COLORS_CLOSE" });
      // visDispatch({ type: "EDIT_CLOSE" });
    }

    console.log("color " + tabColorOpenedData);
  }, [tabColorOpenedData, tabID]);

  useEffect(() => {
    if (tabEditOpenedData !== tabID) {
      // setColorsVisibility(false);
      visDispatch({ type: "EDIT_CLOSE" });
      // visDispatch({ type: "COLORS_CLOSE" });
    }

    console.log("edit " + tabEditOpenedData);
  }, [tabEditOpenedData, tabID]);

  const [bookmarkId, setBookmarkId] = useState<number | string>();

  const [crossVis, setCrossVis] = useState<boolean>(true);

  // 0 to not show typescript errors
  let tabIndex: number = 0;

  let currentTab = tabsData.filter((obj) => obj.id === tabID);

  // for conditional shadow rendering
  let tabColumn: number;

  tabsData.forEach((obj, i) => {
    if (obj.id === tabID) {
      tabIndex = i;
      tabColumn = obj.column;
    }
  });

  // tab content
  const [
    singleBookmarkVisibility,
    setSingleBookmarkVisibility,
  ] = useState<boolean>(
    tabsData[tabIndex].opened
    // false
  );
  // rss content
  const [rssVisibility, setRssVisibility] = useState<boolean>(
    tabsData[tabIndex].opened
    // false
  );

  // for Note only / note content
  const [noteInputVisibility, setNoteInputVisibility] = useState<boolean>(
    tabsData[tabIndex].opened
    // false
  );

  const [closeAllTabssData, setCloseAllTabsData] = closeAllTabsState.use();

  useEffect(() => {
    if (closeAllTabs) {
      setSingleBookmarkVisibility(false);
      setRssVisibility(false);
      setNoteInputVisibility(false);
    }
  }, [closeAllTabs]);

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [rssColorData, setRssColorData] = rssColorState.use();
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();

  let finalTabColor: string = "";

  if (tabColor) {
    finalTabColor = tabColor;
  } else {
    if (tabType === "folder") {
      finalTabColor = folderColorData;
    }

    if (tabType === "note") {
      finalTabColor = noteColorData;
    }

    if (tabType === "rss") {
      finalTabColor = rssColorData;
    }
  }

  // we get two things:
  //  1.) object containing all props - we will get that from collection functions
  // the collecting functions will turn monitor events into props
  // 2.) A ref - the result of this useDrag hook is going to be attached to that specific DOM element
  // isDragging - props coming from collecting function
  const [{ isDragging }, drag] = useDrag({
    // the result that will come from out useDrag hook
    item: {
      // type is required
      type: ItemTypes.BOOKMARK,
      tabID: tabID,
      colNumber: colNumber,
      tabColor: finalTabColor,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [
    tabBeingDraggedColor_Data,
    setTabBeingDraggedColor_Data,
  ] = tabBeingDraggedColor_State.use();

  useEffect(() => {
    if (isDragging) {
      setTabBeingDraggedColor_Data({ tabColor: finalTabColor });
    }
  }, [isDragging, finalTabColor, setTabBeingDraggedColor_Data]);

  function textOrIconColor(finalTabColor: string, textOrIcon: "text" | "icon") {
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

    if (colorsForLightText.indexOf(finalTabColor) > -1) {
      // return textOrIcon === "text" ? "text-gray-200" : "text-gray-300";
      return textOrIcon === "text" ? "text-gray-100" : "text-gray-200";
      // return textOrIcon === "text" ? "text-gray-300" : "text-gray-400";
    }

    if (colorsForDarkText.indexOf(finalTabColor) > -1) {
      return textOrIcon === "text" ? "text-gray-900" : "text-gray-700";
    }

    // "default" behaviour
    let regexForColors = /[6789]/;

    if (regexForColors.test(finalTabColor)) {
      // return textOrIcon === "text" ? "text-gray-300" : "text-gray-400";
      return textOrIcon === "text" ? "text-gray-100" : "text-gray-200";
    }

    return textOrIcon === "text" ? "text-gray-900" : "text-gray-700";
  }

  function hoverText(finalTabColor: string) {
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

    if (colorsForLightHoverAlt.indexOf(finalTabColor) > -1) {
      return "text-yellow-400";
    }

    if (colorsForLightHover.indexOf(finalTabColor) > -1) {
      return "text-orange-500";
    }

    return "text-black";
  }

  return (
    <div
      className={`relative ${
        globalSettingsData.hideNonDeletable && !currentTab[0].deletable
          ? "hidden"
          : ""
      }`}
      ref={drag}
    >
      <div
        className={`pl-0 h-8 px-2 pt-px bg-${
          // tabColor ? tabColor : finalTabColor
          finalTabColor
        } ${textOrIconColor(
          finalTabColor,
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
            setTabColorOpenedData(null);
            setTabEditOpenedData(null);

            if (tabType === "folder") {
              setSingleBookmarkVisibility((b) => !b);
            }

            if (tabType === "note") {
              setNoteInputVisibility((b) => !b);
            }

            if (tabType === "rss") {
              setRssVisibility((b) => !b);
            }
          }}
        >
          <p className="">
            {" "}
            {tabTitle} {tabsData[tabIndex].priority}{" "}
            {tabsData[tabIndex].deletable.toString()}
          </p>
        </div>

        <div
          className={`pt-1 flex ${
            iconsVisibility ? "visible" : "invisible"
          } fill-current ${textOrIconColor(finalTabColor, "icon")} `}
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

          {tabType === "folder" ? (
            <PlusSVG
              className={`h-8 hover:${hoverText(finalTabColor)} cursor-pointer`}
              style={{ marginTop: "-6px" }}
              onClick={() => {
                setNewBookmarkVis((b) => !b);
                // visDispatch({type: "NEW_BOOKMARK_TOGGLE"})

                if (visState.editTabVis) {
                  // setEditTabVis(false)
                  visDispatch({ type: "EDIT_CLOSE" });
                }

                if (visState.colorsVisibility) {
                  // setColorsVisibility(false)
                  visDispatch({ type: "COLORS_CLOSE" });
                }

                setTabEditOpenedData(null);
                setTabColorOpenedData(null);
              }}
            />
          ) : null}

          <ColorSmallSVG
            className={`h-5 mr-2 hover:${hoverText(
              finalTabColor
            )} cursor-pointer ${
              tabType === "note" || tabType === "rss" ? "ml-2" : ""
            }`}
            onClick={() => {
              // setColorsVisibility((b) => !b);

              visDispatch({ type: "COLORS_TOGGLE", payload: tabID });

              // if (visState.colorsVisibility) {
              //   setTabColorOpenedData(null);
              //   return;
              // }

              // if (!visState.colorsVisibility) {
              //   setTabColorOpenedData(tabID);
              //   return;
              // }


            }}
          />

          <PencilSmallSVG
            className={`h-5 -ml-px hover:${hoverText(
              finalTabColor
            )} cursor-pointer`}
            onClick={() => {
              // setEditTabVis((b) => !b);
              visDispatch({ type: "EDIT_TOGGLE", payload: tabID });

              // if (visState.editTabVis) {
              //   setTabEditOpenedData(null);
              //   return;
              // }

              // if (!visState.editTabVis) {
              //   setTabEditOpenedData(tabID);
              //   return;
              // }


            }}

            // }}
          />
        </div>
      </div>

      {visState.colorsVisibility ? (
        <ColorsToChoose
          setIconsVisibility={setIconsVisibility}
          tabTitle={tabTitle}
        />
      ) : null}

      {editBookmarkVis ? (
        // <EditLink
        //   setEditLinkVis={setEditLinkVis}
        //   // editSingleLinkData={editSingleBookmarkData}
        //   bookmarkId={bookmarkId}
        // />

        <Bookmark_newAndEdit
          setBookmarkVis={setEditBookmarkVis}
          bookmarkComponentType={"edit"}
          bookmarkId={bookmarkId}
        />
      ) : null}

      {newBookmarkVis ? (
        // <NewLink setNewLinkVis={setNewBookmarkVis} tabTitle={tabTitle} />

        <Bookmark_newAndEdit
          setBookmarkVis={setNewBookmarkVis}
          bookmarkComponentType={"new_lowerUI"}
        />
      ) : null}

      {visState.editTabVis ? (
        <EditTabTitle
          tabID={tabID}
          tabType={tabType}
          // setEditTabVis={setEditTabVis}
          visDispatch={visDispatch}
          // noteInput={noteInput}
        />
      ) : null}

      {singleBookmarkVisibility && tabType === "folder" ? (
        <div>
          {bookmarksData
            .filter((el) => el.tags.indexOf(tabID) > -1)
            .map((el, i) => {
              return (
                <SingleBookmark
                  setEditBookmarkVis={setEditBookmarkVis}
                  singleBookmarkData={el}
                  // setEditSingleLinkData={setEditSingleBookmarkData}
                  setBookmarkId={setBookmarkId}
                  key={i}
                  tabID={tabID}
                />
              );
            })}

          {/* <SingleLink setEditLinkVis={setEditBookmarkVis} /> */}
        </div>
      ) : null}

      {noteInputVisibility && tabType === "note" ? (
        <NoteInput
          //  noteInput={noteInput}
          tabID={tabID}
          // setEditTabVis={setEditTabVis}
          visDispatch={visDispatch}
        />
      ) : null}

      {rssVisibility && tabType === "rss" ? (
        // <RSS
        //   // rssLink={rssLink}
        //   tabID={tabID}
        //   tabIndex={tabIndex}
        // />
        <RSS_reactQuery tabID={tabID} />
      ) : null}
    </div>
  );
}

export default Tab;
