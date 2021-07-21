import React, { useEffect, useState, useReducer, useCallback } from "react";

import { useBookmarks } from "../../state/useBookmarks";

// import Rect, { useRect } from "@reach/rect";

import { produce } from "immer";

// import { tabsDataState } from "../../state/tabsAndBookmarks";
import shallow from "zustand/shallow";
import { useGlobalSettings } from "../../state/defaultSettingsHooks";

import { useTabs } from "../../state/useTabs";
import { useTabBeingDraggedColor, useDefaultColors } from "../../state/colorHooks";

// import { bookmarksDataState } from "../../state/tabsAndBookmarks";
// import { deletedTabState } from "../../state/tabsAndBookmarks";
// import {
//   noteColorState,
//   folderColorState,
//   rssColorState,
//   // tabBeingDraggedColor_State,
// } from "../../state/colorsState";

import { useUpperUiContext } from "../../utils/upperUiContext";

// import {
//   // closeAllTabsState,
//   // tabColorOpenedState,
//   // tabEditOpenedState,
//   // tabOpenedState,
//   globalSettingsState,
//   // focusedTabState,
// } from "../../state/defaultSettings";

import { ReactComponent as ColorSmallSVG } from "../../svgs/beakerSmall.svg";
import { ReactComponent as PencilSmallSVG } from "../../svgs/pencilSmall.svg";
import { ReactComponent as DotsSVG } from "../../svgs/dots.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { ReactComponent as CrossArrowsSVG } from "../../svgs/cross-arrows.svg";
import { ReactComponent as PlusSVG } from "../../svgs/plus.svg";
import SingleBookmark from "./SingleBookmark";
import ColorsToChoose_Tab from "../Colors/ColorsToChoose_Tab";

// import EditLink from "./EditBookmark";
import Bookmark_newAndEdit from "../Shared/Bookmark_newAndEdit";
import EditTab_main from "./EditTab_main";
import NoteInput from "./NoteInput";
import RSS_reactQuery from "./RSS_reactQuery";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/itemsDnd";

import { TabContext } from "../../utils/tabContext";

import {
  TabVisAction,
  SingleTabData,
  UpperVisAction,
  TabVisState,
  UpperVisState,
} from "../../utils/interfaces";
import { current } from "immer";

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
  // upperVisDispatch: React.Dispatch<UpperVisAction>;
  // upperVisState: UpperVisState;
  tabOpened: boolean;
  tabOpenedByDefault: boolean;
  tabIsDeletable: boolean;
  // noteInput: string | null;
  // rssLink: string | null;
  // closeAllTabs: boolean;
}

// interface VisState {
//   editTabVis: boolean;
//   colorsVis: boolean;
//   // tabContentVis: boolean;
//   newBookmarkVis: boolean;
//   editBookmarkVis: null | string | number;
//   touchScreenModeOn: boolean;
// }

function Tab({
  tabID,
  tabTitle,
  tabColor,
  tabType,
  colNumber,
  // upperVisDispatch,
  // upperVisState,
  tabOpened,
  tabOpenedByDefault,
  tabIsDeletable,
}: // being passed as a prop from closeAllTabsData, get if from the state instead?
// closeAllTabs,
// noteInput,
// rssLink
Props): JSX.Element {
  // const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const globalSettings = useGlobalSettings(state => state, shallow)

  const setTabBeingDraggedColor = useTabBeingDraggedColor(state => state.setTabBeingDraggedColor)

  const defaultColors = useDefaultColors(state => state, shallow);

  // const [focusedTabData, setFocusedTabData] = focusedTabState.use();

  // const [tabsData, setTabsData] = tabsDataState.use();

  // const [closeAllTabsData, setCloseAllTabsData] = closeAllTabsState.use();

  // const [state, setstate] = useState(initialState)

  // needed for immediate tab content opening/closing after locking/unlocking
  const [tabOpened_local, setTabOpened_local] = useState(tabOpened);

  const bookmarks = useBookmarks((state) => state.bookmarks);

  const tabs = useTabs((store) => store.tabs);
  const closeAllTabsState = useTabs((store) => store.closeAllTabsState);
  const tabOpenedState = useTabs((store) => store.tabOpenedState);
  const focusedTabState = useTabs(store => store.focusedTabState)
  const setFocusedTabState = useTabs(store => store.setFocusedTabState)
  const setTabOpenedState = useTabs((store) => store.setTabOpenedState);

  const defaultTabContent = useTabs((store) => store.defaultTabContent);
  const toggleTab = useTabs((store) => store.toggleTab);

  const upperUiContext = useUpperUiContext();

  useEffect(() => {
    setTabOpened_local(tabOpened);
  }, [tabOpened]);

  // const reachRef = React.useRef();
  // const rect = useRect(reachRef);

  /* 
  {
  "x": 16,
  "y": 336,
  "width": 543,
  "height": 32,
  "top": 336,
  "right": 559,
  "bottom": 368,
  "left": 16
}
  
  */

  // useEffect(() => {

  //   if(tabID === "ALL_TAGS") {
  //     console.log(JSON.stringify(rect, null, 2));

  //   }

  // })

  // const [touchScreenMode, setTouchScreenMode] = useState(false);

  let currentTab = tabs.find((obj) => obj.id === tabID);

  // 0s to not show typescript errors
  // let tabIndex: number = 0;
  //   tabIndex = tabsData.indexOf(currentTab);

  const initVisState: TabVisState = {
    // newBookmarkVis: false,
    editTabVis: false,
    colorsVis: false,
    // tabContentVis: currentTab?.opened ?? false,
    newBookmarkVis: false,
    editBookmarkVis: null,
    touchScreenModeOn: false,
    // tabContentVis: false
  };

  //  if tabOpenedData is not equall to tabID, editables (eg. tabEdit) will not render & useEffect will close all editables
  // after clicking current Tab or its editables, tabOpenedData will be set to current tab's tabID
  // const [tabOpenedData, setTabOpenedData] = tabOpenedState.use();

  function tabVisReducer(
    state: TabVisState,
    action: TabVisAction
  ): TabVisState {
    switch (action.type) {
      case "COLORS_SETTINGS_TOGGLE":
        if (!state.colorsVis) {
          setTabOpenedState(tabID);
        }

        return {
          ...state,
          editTabVis: false,
          newBookmarkVis: false,
          editBookmarkVis: null,
          colorsVis: !state.colorsVis,
        };
      case "COLORS_CLOSE":
        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          newBookmarkVis: false,
          editBookmarkVis: null,
        };
      case "EDIT_TOGGLE":
        if (!state.editTabVis) {
          setTabOpenedState(tabID);
        }

        return {
          ...state,
          colorsVis: false,
          newBookmarkVis: false,
          editBookmarkVis: null,
          editTabVis: !state.editTabVis,
        };

      case "EDIT_CLOSE":
        return {
          ...state,
          editTabVis: false,
          colorsVis: false,
          newBookmarkVis: false,
          editBookmarkVis: null,
        };
      case "TAB_CONTENT_TOGGLE":
    
        setTabOpenedState(tabID);

        // setTabsData((previous) =>
        //   produce(previous, (updated) => {
        //     let tabToUpdate = updated.find((obj) => obj.id === tabID);

        //     if (tabToUpdate) {
        //       let tabIndex = updated.indexOf(tabToUpdate);
        //       updated[tabIndex].opened = !tabOpened;
        //     }
        //   })
        // );

        toggleTab(tabID, tabOpened);

        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          newBookmarkVis: false,
          editBookmarkVis: null,
          // tabContentVis: !state.tabContentVis,
        };
      case "TAB_CONTENT_DEFAULT":
        // setTabsData((previous) =>
        //   produce(previous, (updated) => {
        //     let tabToUpdate = updated.find((obj) => obj.id === tabID);

        //     if (tabToUpdate) {
        //       let tabIndex = updated.indexOf(tabToUpdate);
        //       updated[tabIndex].opened = tabOpenedByDefault;
        //     }
        //   })
        // );

        defaultTabContent(tabID, tabOpenedByDefault);

        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          newBookmarkVis: false,

          // tabContentVis: currentTab.opened,
          editBookmarkVis: null,
          touchScreenModeOn: false,
        };
      case "TAB_CONTENT_OPEN_AFTER_LOCKING":
        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          newBookmarkVis: false,
          // tabContentVis: true,
          editBookmarkVis: null,
        };

      // similar to tab_content_close, but tabContentVis is not touched (for useEffect)
      case "TAB_EDITABLES_CLOSE":
        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          newBookmarkVis: false,
          // tabContentVis: false,
          editBookmarkVis: null,
          touchScreenModeOn: false,
        };
      case "NEW_BOOKMARK_TOOGLE":
        if (!state.newBookmarkVis) {
          // setTabEditOpenedData(tabID);
          setTabOpenedState(tabID);
        }

        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          editBookmarkVis: null,
          newBookmarkVis: !state.newBookmarkVis,
        };
      case "EDIT_BOOKMARK_OPEN":
        if (!state.editBookmarkVis) {
          // setTabEditOpenedData(tabID);
          setTabOpenedState(tabID);
        }

        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          newBookmarkVis: false,
          editBookmarkVis: action.payload,
        };

      case "EDIT_BOOKMARK_CLOSE":
        return {
          ...state,
          colorsVis: false,
          editTabVis: false,
          newBookmarkVis: false,
          editBookmarkVis: null,
        };

      case "TOUCH_SCREEN_MODE_ON":
        if (!state.touchScreenModeOn) {
          setTabOpenedState(tabID);
        }

        return {
          ...state,
          touchScreenModeOn: true,
        };

      default:
        return state;
    }
  }
  // const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  const [iconsVis, setIconsVis] = useState<boolean>(false);

  useEffect(() => {
    if (focusedTabState === tabID) {
      setIconsVis(true);
      console.log("test");
    } else {
      setIconsVis(false);
    }
  }, [focusedTabState, tabID]);

  const [tabVisState, tabVisDispatch] = useReducer(tabVisReducer, initVisState);

  let tabContextValue = { tabVisState, tabVisDispatch };

  // const TabContext = React.createContext(tabContextValue);

  // const TabStateContext = React.createContext(tabVisState);
  // const TabDispatchContext = React.createContext(tabVisDispatch);

  useEffect(() => {
    if (tabOpenedState !== tabID) {
      tabVisDispatch({ type: "TAB_EDITABLES_CLOSE" });
    }
  }, [tabOpenedState, tabID]);

  const [bookmarkId, setBookmarkId] = useState<number | string>();

  const [crossVis, setCrossVis] = useState<boolean>(true);

  useEffect(() => {
    if (closeAllTabsState) {
      // tabVisDispatch({ type: "TAB_EDITABLES_CLOSE" });
      tabVisDispatch({ type: "TAB_CONTENT_DEFAULT" });
    }
  }, [closeAllTabsState]);

  // const [folderColorData, setFolderColorData] = folderColorState.use();
  // const [noteColorData, setNoteColorData] = noteColorState.use();
  // const [rssColorData, setRssColorData] = rssColorState.use();

  let finalTabColor: string = "";

  if (tabColor) {
    finalTabColor = tabColor;
  } else {
    if (tabType === "folder") {
      finalTabColor = defaultColors.folderColor;
    }

    if (tabType === "note") {
      finalTabColor = defaultColors.noteColor;
    }

    if (tabType === "rss") {
      finalTabColor = defaultColors.rssColor;
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

  // const [tabBeingDraggedColor_Data, setTabBeingDraggedColor_Data] =
  //   tabBeingDraggedColor_State.use();

  useEffect(() => {
    if (isDragging) {
      setTabBeingDraggedColor(finalTabColor);
      tabVisDispatch({ type: "TAB_EDITABLES_CLOSE" });
      setTabOpenedState(null);
    }
  }, [
    isDragging,
    finalTabColor,
    setTabBeingDraggedColor,
    setTabOpenedState,
  ]);

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

  const [mouseOverTab, setMouseOverTab] = useState(false);

  useEffect(() => {
    let iconsTimeout: ReturnType<typeof setTimeout>;

    if (mouseOverTab) {
      iconsTimeout = setTimeout(() => {
        setIconsVis(true);
      }, 50);
    }

    if (!mouseOverTab) {
      setIconsVis(false);
      // if (iconsTimeout) {
      //   clearTimeout(iconsTimeout);
      // }
    }
    return () => {
      clearTimeout(iconsTimeout);
    };
  }, [mouseOverTab]);

  useEffect(() => {
    if (!upperUiContext.upperVisState.tabEditablesOpenable) {
      tabVisDispatch({ type: "TAB_EDITABLES_CLOSE" });
      upperUiContext.upperVisDispatch({
        type: "TAB_EDITABLES_OPENABLE_DEFAULT",
      });
    }
  }, [
    upperUiContext
  ]);

  function textOrIconColor(finalTabColor: string, textOrIcon: "text" | "icon") {
    // exceptions
    if (colorsForLightText.indexOf(finalTabColor) > -1) {
      return textOrIcon === "text" ? "text-gray-100" : "text-gray-200";
    }

    if (colorsForDarkText.indexOf(finalTabColor) > -1) {
      return textOrIcon === "text" ? "text-gray-900" : "text-gray-700";
    }

    if (regexForColors.test(finalTabColor)) {
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
    <TabContext.Provider value={tabContextValue}>
      <div
        className={`relative ${
          globalSettings.hideNonDeletable &&
          // (!(currentTab as SingleTabData).deletable as boolean)
          !tabIsDeletable
            ? "hidden"
            : ""
        }`}

        // ref={reachRef}
      >
        <div
          ref={drag}
          className={`pl-0 h-8 pr-1 bg-${
            // tabColor ? tabColor : finalTabColor
            finalTabColor
          } ${textOrIconColor(
            finalTabColor,
            "text"
          )} border border-t-0 border-r-0 border-l-0 border-gray-700 border-opacity-25 flex justify-between`}
          style={{
            boxShadow: "0px -1px inset rgba(0, 0, 0, 0.05)",
            paddingTop: "2px",
          }}
          onTouchStart={() => {
            setTimeout(() => {
              tabVisDispatch({ type: "TOUCH_SCREEN_MODE_ON" });
              // setTouchScreenMode(true);
            }, 200);
          }}
          // old style

          // )} border border-t-0 border-r-0 border-l-0 border-gray-400 flex justify-between`}
          // style={{boxShadow: "0px -1px inset rgba(0, 0, 0, 0.3)"}}

          onMouseEnter={() => {
            setMouseOverTab(true);
          }}
          onMouseLeave={() => {
            // setIconsVis(false);
            setMouseOverTab(false);
          }}
        >
          <div
            className="pl-1 w-full h-7 truncate cursor-pointer"
            onClick={() => {
              tabVisDispatch({ type: "TAB_CONTENT_TOGGLE" });
              upperUiContext.upperVisDispatch({ type: "CLOSE_ALL" });
            }}
          >
            <button
              className={`mt-px flex focus:outline-none focus-visible:ring-1 ring-${textOrIconColor(
                finalTabColor,
                "text"
              ).slice(5)} ring-opacity-40`}
              style={{ height: "23px" }}
              // disabled={areButtonsDisabled()}
              onFocus={() => {
                setFocusedTabState(tabID);
              }}
              aria-label={"Tab open/close"}
            >
              <p
                className={`truncate ${
                  tabID === "ALL_TAGS" ? "tracking-wider" : ""
                }`}
              >
                {tabTitle}
              </p>
            </button>
          </div>

          <div
            className={`pt-1 flex ${
              iconsVis || tabVisState.touchScreenModeOn
                ? "visible"
                : "invisible"
            } fill-current ${textOrIconColor(finalTabColor, "icon")} `}
          >
            <div
              className={`w-6 -mt-1 pt-1 cursor-move `}
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
              <button
                className={`h-8 focus:outline-none focus-visible:ring-2 ring-${textOrIconColor(
                  finalTabColor,
                  "text"
                ).slice(5)} ring-opacity-40 ring-inset   `}
                style={{ marginTop: "-6px" }}
                onClick={() => {
                  tabVisDispatch({ type: "NEW_BOOKMARK_TOOGLE" });
                  upperUiContext.upperVisDispatch({ type: "CLOSE_ALL" });
                }}
                aria-label={"Add new bookmark"}
                // disabled={areButtonsDisabled()}
              >
                <PlusSVG
                  className={`h-full transition-colors duration-75 hover:${hoverText(
                    finalTabColor
                  )} cursor-pointer`}
                />
              </button>
            )}

            <button
              className={`h-5 w-5 mr-2 focus:outline-none focus-visible:ring-2 ring-${textOrIconColor(
                finalTabColor,
                "text"
              ).slice(5)} ring-opacity-40`}
              style={{
                marginLeft: `${
                  tabType === "note" || tabType === "rss" ? "7px" : ""
                }`,
              }}
              onClick={() => {
                tabVisDispatch({ type: "COLORS_SETTINGS_TOGGLE" });
                upperUiContext.upperVisDispatch({ type: "CLOSE_ALL" });
              }}
              aria-label={"Tab color menu"}
            >
              <ColorSmallSVG
                className={`h-full w-full transition-colors duration-75 hover:${hoverText(
                  finalTabColor
                )} cursor-pointer `}
                // ${
                //   tabType === "note" || tabType === "rss" ? "ml-1" : ""
                // }
                // `}
              />
            </button>

            <button
              className={`h-5 focus:outline-none focus-visible:ring-2 ring-${textOrIconColor(
                finalTabColor,
                "text"
              ).slice(5)} ring-opacity-40 `}
              onClick={() => {
                tabVisDispatch({ type: "EDIT_TOGGLE" });
                upperUiContext.upperVisDispatch({ type: "CLOSE_ALL" });
              }}
              // disabled={areButtonsDisabled()}
              aria-label={"Edit tab"}
            >
              <PencilSmallSVG
                className={`h-full -ml-px transition-colors duration-75 hover:${hoverText(
                  finalTabColor
                )} cursor-pointer`}
                // }}
              />
            </button>
          </div>
        </div>

        {tabVisState.colorsVis &&
          tabOpenedState === tabID &&
          upperUiContext.upperVisState.tabEditablesOpenable && (
            <ColorsToChoose_Tab
              setIconsVis={setIconsVis}
              tabID={tabID}
              tabColor={tabColor}
              tabType={tabType}
              // tabVisDispatch={tabVisDispatch}
              // top={rect?.top as number}
              // left={rect?.left as number}
              // tabWidth={rect?.width as number}
            />
          )}

        {/* {tabVisState.editBookmarkVis &&
        tabOpenedData === tabID &&
        upperVisState.tabEditablesOpenable && (
          <Bookmark_newAndEdit
            // setBookmarkVis={setEditBookmarkVis}
            bookmarkComponentType={"edit"}
            bookmarkId={bookmarkId}
            tabVisDispatch={tabVisDispatch}
            colNumber={colNumber}
            top={rect?.top as number}
            left={rect?.left as number}
            tabWidth={rect?.width as number}
          />
        )} */}

        {tabVisState.newBookmarkVis &&
          tabOpenedState === tabID &&
          upperUiContext.upperVisState.tabEditablesOpenable && (
            // <NewLink setNewLinkVis={setNewBookmarkVis} tabTitle={tabTitle} />

            <Bookmark_newAndEdit
              // setBookmarkVis={setNewBookmarkVis}
              bookmarkComponentType={"new_lowerUI"}
              // tabVisDispatch={tabVisDispatch}
              colNumber={colNumber}
              tabTitle={tabTitle as string}
              // top={rect?.top as number}
              // left={rect?.left as number}
              // tabWidth={rect?.width as number}
            />
          )}

        {tabVisState.editTabVis &&
          tabOpenedState === tabID &&
          upperUiContext.upperVisState.tabEditablesOpenable && (
            <EditTab_main
              tabID={tabID}
              tabType={tabType}
              // setEditTabVis={setEditTabVis}
              // tabVisDispatch={tabVisDispatch}
              currentTab={currentTab as SingleTabData}
              // noteInput={noteInput}
              // top={rect?.top as number}
              // left={rect?.left as number}
              // tabWidth={rect?.width as number}
              setTabOpened_local={setTabOpened_local}
            />
          )}

        {tabOpened_local && tabType === "folder" && (
          <div>
            {bookmarks
              // {bookmarksData
              .filter((el) => el.tags.indexOf(tabID) > -1)
              .map((el, i) => {
                return (
                  <SingleBookmark
                    // setEditBookmarkVis={setEditBookmarkVis}
                    // upperVisState={upperVisState}
                    // tabVisState={tabVisState}
                    // tabVisDispatch={tabVisDispatch}
                    // upperVisDispatch={upperVisDispatch}
                    singleBookmarkData={el}
                    // setEditSingleLinkData={setEditSingleBookmarkData}
                    bookmarkId={el.id as string | number}
                    colNumber={colNumber}
                    setBookmarkId={setBookmarkId}
                    key={i}
                    tabID={tabID}
                  />
                );
              })}

            {/* <SingleLink setEditLinkVis={setEditBookmarkVis} /> */}
          </div>
        )}

        {tabOpened_local && tabType === "note" && (
          <NoteInput
            //  noteInput={noteInput}
            currentTab={currentTab as SingleTabData}
            // setEditTabVis={setEditTabVis}
            // tabVisDispatch={tabVisDispatch}
            // upperVisState={upperVisState}
          />
        )}

        {tabOpened_local && tabType === "rss" && (
          <RSS_reactQuery
            tabID={tabID}
            currentTab={currentTab as SingleTabData}
            // upperVisState={upperVisState}
          />
        )}
      </div>
    </TabContext.Provider>
  );
}

export default Tab;
