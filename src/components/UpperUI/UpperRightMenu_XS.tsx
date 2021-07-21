import React from "react";

import { ReactComponent as FolderSVG } from "../../svgs/folder.svg";
import { ReactComponent as PlusSquareSVG } from "../../svgs/plus-square-line_uxwing.svg";
import { ReactComponent as BookmarkSVG } from "../../svgs/bookmarkAlt.svg";
import { ReactComponent as NoteSVG } from "../../svgs/note_UXwing.svg";
import { ReactComponent as SettingsSVG } from "../../svgs/settingsAlt.svg";
import { ReactComponent as CogSVG } from "../../svgs/cog.svg";
import { ReactComponent as UserSVG } from "../../svgs/user.svg";
import { ReactComponent as LogoutSVG } from "../../svgs/logout.svg";
import { ReactComponent as ColorSVG } from "../../svgs/beaker.svg";
import { ReactComponent as AddRssSVG } from "../../svgs/rss.svg";
import { ReactComponent as PhotographSVG } from "../../svgs/photograph.svg";


import shallow from "zustand/shallow";
import { useGlobalSettings } from "../../state/defaultSettingsHooks";
import { useDefaultColors } from "../../state/colorHooks";

// import { uiColorState } from "../../state/colorsState";

import {useLoggedInState} from "../../state/useLoggedInState"

import { UpperVisAction, UpperVisState } from "../../utils/interfaces";



// import { globalSettingsState } from "../../state/defaultSettings";
import { useUpperUiContext } from "../../utils/upperUiContext";

interface Props {
  setTabType: React.Dispatch<React.SetStateAction<"folder" | "note" | "rss">>;
  // upperVisDispatch: React.Dispatch<UpperVisAction>;
  // upperVisState: UpperVisState;
  // loggedInData: boolean;
  // setLoggedInData: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpperRightMenu({
  // upperVisDispatch,
  // upperVisState,
  setTabType,
  // loggedInData,
  // setLoggedInData,
}: Props): JSX.Element {

  const globalSettings = useGlobalSettings(state => state, shallow)

  // const [uiColorData, setUiColorData] = uiColorState.use();
  const uiColor = useDefaultColors(state => state.uiColor)

  // const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();


  const loggedInState = useLoggedInState(state => state.loggedInState)
  const setLoggedInState = useLoggedInState(state => state.setLoggedInState)

  const colLimit = globalSettings.limitColGrowth;

  const upperUiContext = useUpperUiContext();

  return (
    <>
      {upperUiContext.upperVisState.addTagVis_xs && (
        <div
          className={`flex ${
            colLimit ? "sm:hidden" : "xs:hidden"
          } justify-around`}
        >
          <button
            className="h-7 w-7 focus-2-inset-veryDark"
            style={{ marginLeft: "0px" }}
            onClick={() => {
              // setNewTabVis((b) => !b);
              upperUiContext.upperVisDispatch({ type: "NEW_TAB_TOGGLE" });
              setTabType("folder");
            }}
            tabIndex={7}
            // disabled={areButtonsDisabled()}
            aria-label={"New folder"}
          >
            <FolderSVG
              className={`h-7 w-7 cursor-pointer transition-colors duration-75 hover:text-${uiColor}`}
            />
          </button>

          {/* <AddNote */}
          <button
            className="h-6 w-6 focus-2-veryDark"
            style={{ marginTop: "2px", marginLeft: "0px" }}
            onClick={() => {
              // setNewTabVis((b) => !b);

              upperUiContext.upperVisDispatch({ type: "NEW_TAB_TOGGLE" });
              setTabType("note");
            }}
            tabIndex={8}
            // disabled={areButtonsDisabled()}
            aria-label={"New note"}
          >
            <NoteSVG
              className={`h-6 w-6 cursor-pointer fill-current transition-colors duration-75 text-black hover:text-${uiColor}`}
            />
          </button>

          {/* <AddRssSVG className={`h-6 cursor-pointer hover:text-${uiColorData}`} */}

          <button
            className="h-7 w-7 focus-2-inset-veryDark"
            style={{ marginRight: "-2px" }}
            onClick={() => {
              // setNewTabVis((b) => !b);
              upperUiContext.upperVisDispatch({ type: "NEW_TAB_TOGGLE" });
              setTabType("rss");
            }}
            tabIndex={9}
            // disabled={areButtonsDisabled()}
            aria-label={"New rss"}
          >
            <AddRssSVG
              className={`h-7 w-7 cursor-pointer transition-colors duration-75 hover:text-${uiColor}`}
            />
          </button>

          <UserSVG
            className={`invisible h-6 self-center cursor-pointer transition-colors duration-75 hover:text-${uiColor}`}
          />
        </div>
      )}

      <div
        className={`flex ${
          colLimit ? "sm:hidden" : "xs:hidden"
        } justify-around`}
        style={{ marginTop: "-1px" }}
      >
        {/* <AddLinkSVG */}

        <button
          className="h-7 w-7 focus-2-inset-veryDark"
          onClick={() => {
            // setNewBookmarkVis((b) => !b);
            upperUiContext.upperVisDispatch({ type: "NEW_BOOKMARK_TOGGLE" });
          }}
          tabIndex={10}
          // disabled={areButtonsDisabled()}
          aria-label={"New bookmark"}
        >
          <BookmarkSVG
            className={`h-7 w-7 cursor-pointer transition-colors duration-75 hover:text-${uiColor}`}
          />
        </button>

        {/* <AddFolderSVG */}

        <button
          className="h-6 w-5 self-center focus-2-veryDark"
          style={{ width: "22px" }}
          onClick={() => {
            upperUiContext.upperVisDispatch({ type: "ADD_TAG_XS_TOGGLE" });
          }}
          tabIndex={11}
          // disabled={areButtonsDisabled()}
          aria-label={"New tab menu"}
        >
          <PlusSquareSVG
            className={`h-5 w-5 cursor-pointer transition-colors duration-75 fill-current hover:text-${uiColor} ml-px`}
          />
        </button>

        {/* <AddNote */}
        <button
          className="h-6 w-6 ml-0.5 focus-2-veryDark"
          style={{ marginTop: "2px" }}
          onClick={() => {
            upperUiContext.upperVisDispatch({ type: "SETTINGS_TOGGLE" });
          }}
          tabIndex={12}
          // disabled={areButtonsDisabled()}
          aria-label={"Settings"}
        >
          <CogSVG
            className={`h-full w-full cursor-pointer transition-colors duration-75  hover:text-${uiColor}`}
          />
        </button>

        {/* <AddRssSVG className={`h-6 cursor-pointer hover:text-${uiColorData}`} */}
        {/* <UserSVG
          className={`h-6 self-center cursor-pointer transition-colors duration-75 hover:text-${uiColorData} -ml-1`}
          onClick={() => {
            upperVisDispatch({ type: "PROFILE_TOGGLE" });
          }}
/> */}
        <div className="self-center" style={{ width: "24px", height: "24px" }}>
          {loggedInState ? (
            <button
              className="h-6 w-5 focus-2-veryDark"
              style={{ width: "22px" }}
              onClick={() => {
                // upperVisDispatch({ type: "PROFILE_TOGGLE" });
                setLoggedInState(false);
                upperUiContext.upperVisDispatch({
                  type: "MESSAGE_OPEN_LOGOUT",
                });
              }}
              tabIndex={13}
              // disabled={areButtonsDisabled()}
              aria-label={"Logout"}
            >
              <LogoutSVG
                className={`h-6 w-6 cursor-pointer transition-colors duration-75 hover:text-${uiColor}`}
                style={{ marginLeft: "-1px" }}
              />
            </button>
          ) : (
            <button
              className="h-6 w-5 focus-2-veryDark"
              style={{ width: "18px" }}
              onClick={() => {
                upperUiContext.upperVisDispatch({ type: "PROFILE_TOGGLE" });
                // setLoggedInData(true);
              }}
              tabIndex={13}
              // disabled={areButtonsDisabled()}
              aria-label={"Login/register"}
            >
              <UserSVG
                // -ml-1
                className={`h-6 w-6 cursor-pointer transition-colors duration-75 hover:text-${uiColor}`}
                style={{ marginLeft: "-3px", marginBottom: "0px" }}
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default UpperRightMenu;
