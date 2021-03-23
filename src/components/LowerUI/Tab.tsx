import React, { useEffect, useState, useReducer } from "react";

import { tabsDataState } from "../../state/tabsAndBookmarks";
import { bookmarksDataState } from "../../state/tabsAndBookmarks";
import { deletedTabState } from "../../state/tabsAndBookmarks";
import {
  noteColorState,
  folderColorState,
  rssColorState,
  tabBeingDraggedColor_State,
} from "../../state/colorsState";

import {
  closeAllTabsState,
  // tabColorOpenedState,
  // tabEditOpenedState,
  tabOpenedState,
  globalSettingsState,
} from "../../state/defaultSettings";

import { ReactComponent as ColorSmallSVG } from "../../svgs/beakerSmall.svg";
import { ReactComponent as PencilSmallSVG } from "../../svgs/pencilSmall.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { ReactComponent as CrossArrowsSVG } from "../../svgs/cross-arrows.svg";
import { ReactComponent as PlusSVG } from "../../svgs/plus.svg";
import SingleBookmark from "./SingleBookmark";
import ColorsToChoose from "../Colors/ColorsToChoose_Tab";

// import EditLink from "./EditBookmark";
import Bookmark_newAndEdit from "../Shared/Bookmark_newAndEdit";
import EditTab from "./EditTab";
import NoteInput from "./NoteInput";
import RSS_reactQuery from "./RSS_reactQuery";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/itemsDnd";

import { TabVisAction, SingleTabData } from "../../utils/interfaces";

interface SingleBookmarkData {
  title: string;
  URL: string;
  tags: string[];
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
  editTabVis: boolean;
  colorsVis: boolean;
  tabContentVis: boolean;
  newBookmarkVis: boolean;
  editBookmarkVis: boolean;
}

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
  const [tabsData, setTabsData] = tabsDataState.use();

  let currentTab = tabsData.find((obj) => obj.id === tabID);

  // 0s to not show typescript errors
  let tabIndex: number = 0;

  if (currentTab) {
    tabIndex = tabsData.indexOf(currentTab);
  }

  const initVisState: VisState = {
    // newBookmarkVis: false,
    editTabVis: false,
    colorsVis: false,
    tabContentVis: tabsData[tabIndex].opened,
    newBookmarkVis: false,
    editBookmarkVis: false,
  };

  const [tabOpenedData, setTabOpenedData] = tabOpenedState.use();

  function visReducer(state: VisState, action: TabVisAction) {
    switch (action.type) {
      case "COLORS_SETTINGS_TOGGLE":
        if (!state.colorsVis) {
          setTabOpenedData(tabID);
        }

        return {
          ...state,
          editTabVis: false,
          newBookmarkVis: false,
          editBookmarkVis: false,
          colorsVis: !state.colorsVis,
        };
      case "COLORS_CLOSE":
        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          newBookmarkVis: false,
          editBookmarkVis: false,
        };
      case "EDIT_TOGGLE":
        if (!state.editTabVis) {
          setTabOpenedData(tabID);
        }

        return {
          ...state,
          colorsVis: false,
          newBookmarkVis: false,
          editBookmarkVis: false,
          editTabVis: !state.editTabVis,
        };

      case "EDIT_CLOSE":
        return {
          ...state,
          editTabVis: false,
          colorsVis: false,
          newBookmarkVis: false,
          editBookmarkVis: false,
        };
      case "TAB_CONTENT_TOGGLE":
        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          newBookmarkVis: false,
          editBookmarkVis: false,
          tabContentVis: !state.tabContentVis,
        };
      case "TAB_CONTENT_CLOSE":
        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          newBookmarkVis: false,
          tabContentVis: false,
          editBookmarkVis: false,
        };
      // similar to tab_content_close, but tabContentVis is not touched (for useEffect)
      case "TAB_EDITABLES_CLOSE":
        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          newBookmarkVis: false,
          // tabContentVis: false,
          editBookmarkVis: false,
        };
      case "NEW_BOOKMARK_TOOGLE":
        if (!state.newBookmarkVis) {
          // setTabEditOpenedData(tabID);
          setTabOpenedData(tabID);
        }

        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          editBookmarkVis: false,
          newBookmarkVis: !state.newBookmarkVis,
        };
      case "EDIT_BOOKMARK_TOOGLE":
        if (!state.editBookmarkVis) {
          // setTabEditOpenedData(tabID);
          setTabOpenedData(tabID);
        }

        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          newBookmarkVis: false,
          editBookmarkVis: !state.editBookmarkVis,
        };
      default:
        return state;
    }
  }

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  const [iconsVis, setIconsVis] = useState<boolean>(false);

  const [visState, visDispatch] = useReducer(visReducer, initVisState);

  useEffect(() => {
    if (tabOpenedData !== tabID) {
      visDispatch({ type: "TAB_EDITABLES_CLOSE" });
    }
  }, [tabOpenedData, tabID]);

  const [bookmarkId, setBookmarkId] = useState<number | string>();

  const [crossVis, setCrossVis] = useState<boolean>(true);

  useEffect(() => {
    if (closeAllTabs) {
      visDispatch({ type: "TAB_EDITABLES_CLOSE" });
    }
  }, [closeAllTabs]);

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [rssColorData, setRssColorData] = rssColorState.use();

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

  const colorsForLightText: string[] = [
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
  const colorsForDarkText: string[] = ["yellow-600"];

  // "default" behaviour
  const regexForColors = /[6789]/;

  function textOrIconColor(finalTabColor: string, textOrIcon: "text" | "icon") {
    // exceptions

    if (colorsForLightText.indexOf(finalTabColor) > -1) {
      // return textOrIcon === "text" ? "text-gray-200" : "text-gray-300";
      return textOrIcon === "text" ? "text-gray-100" : "text-gray-200";
      // return textOrIcon === "text" ? "text-gray-300" : "text-gray-400";
    }

    if (colorsForDarkText.indexOf(finalTabColor) > -1) {
      return textOrIcon === "text" ? "text-gray-900" : "text-gray-700";
    }

    if (regexForColors.test(finalTabColor)) {
      // return textOrIcon === "text" ? "text-gray-300" : "text-gray-400";
      return textOrIcon === "text" ? "text-gray-100" : "text-gray-200";
    }

    return textOrIcon === "text" ? "text-gray-900" : "text-gray-700";
  }

  function hoverText(finalTabColor: string) {
    if (colorsForLightText.indexOf(finalTabColor) > -1) {
      return "text-gray-100";
    }

    if (colorsForDarkText.indexOf(finalTabColor) > -1) {
      return "text-black";
    }

    if (regexForColors.test(finalTabColor)) {
      return "text-gray-100";
    }

    return "text-black";
  }

  return (
    <div
      className={`relative ${
        globalSettingsData.hideNonDeletable &&
        (!(currentTab as SingleTabData).deletable as boolean)
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
          setIconsVis(true);
        }}
        onMouseLeave={() => {
          setIconsVis(false);
        }}
      >
        <div
          className="pl-1 w-full cursor-pointer"
          onClick={() => {
            // setTabColorOpenedData(null);
            // setTabEditOpenedData(null);

            visDispatch({ type: "TAB_CONTENT_TOGGLE" });
          }}
        >
          <p className="">
            {" "}
            {tabTitle}
             {/* {tabsData[tabIndex].priority}{" "} */}
            {/* {tabsData[tabIndex].deletable.toString()} */}
          </p>
        </div>

        <div
          className={`pt-1 flex ${
            iconsVis ? "visible" : "invisible"
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
            {crossVis && (
              <CrossArrowsSVG
                // className="h-6  hover:text-black hover:invisible"
                className="h-6"
                style={{ marginTop: "-2px" }}
              />
            )}
          </div>

          {tabType === "folder" && (
            <PlusSVG
              className={`h-8 hover:${hoverText(finalTabColor)} cursor-pointer`}
              style={{ marginTop: "-6px" }}
              onClick={() => {
          

                visDispatch({ type: "NEW_BOOKMARK_TOOGLE" });
              }}
            />
          )}

          <ColorSmallSVG
            className={`h-5 mr-2 hover:${hoverText(
              finalTabColor
            )} cursor-pointer `}
            // ${
            //   tabType === "note" || tabType === "rss" ? "ml-1" : ""
            // }
            // `}
            style={{marginLeft: `${tabType === "note" || tabType === "rss" ? "7px" : ""}`}}
            onClick={() => {
              visDispatch({ type: "COLORS_SETTINGS_TOGGLE" });
            }}
          />

          <PencilSmallSVG
            className={`h-5 -ml-px hover:${hoverText(
              finalTabColor
            )} cursor-pointer`}
            onClick={() => {
              visDispatch({ type: "EDIT_TOGGLE" });
            }}

            // }}
          />
        </div>
      </div>

      {visState.colorsVis && (
        <ColorsToChoose setIconsVis={setIconsVis} tabID={tabID} />
      )}

      {visState.editBookmarkVis && (
        <Bookmark_newAndEdit
          // setBookmarkVis={setEditBookmarkVis}
          bookmarkComponentType={"edit"}
          bookmarkId={bookmarkId}
          visDispatch={visDispatch}
        />
      )}

      {visState.newBookmarkVis && (
        // <NewLink setNewLinkVis={setNewBookmarkVis} tabTitle={tabTitle} />

        <Bookmark_newAndEdit
          // setBookmarkVis={setNewBookmarkVis}
          bookmarkComponentType={"new_lowerUI"}
          visDispatch={visDispatch}
          colNumber={colNumber}
        />
      )}

      {visState.editTabVis && (
        <EditTab
          tabID={tabID}
          tabType={tabType}
          // setEditTabVis={setEditTabVis}
          visDispatch={visDispatch}
          // noteInput={noteInput}
        />
      )}

      {visState.tabContentVis && tabType === "folder" && (
        <div>
          {bookmarksData
            .filter((el) => el.tags.indexOf(tabID) > -1)
            .map((el, i) => {
              return (
                <SingleBookmark
                  // setEditBookmarkVis={setEditBookmarkVis}
                  visDispatch={visDispatch}
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
      )}

      {visState.tabContentVis && tabType === "note" && (
        <NoteInput
          //  noteInput={noteInput}
          tabID={tabID}
          // setEditTabVis={setEditTabVis}
          visDispatch={visDispatch}
        />
      )}

      {visState.tabContentVis && tabType === "rss" && (
        <RSS_reactQuery tabID={tabID} />
      )}
    </div>
  );
}

export default Tab;
