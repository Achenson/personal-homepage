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

import { uiColorState } from "../../state/colorsState";

import { UpperVisAction, UpperVisState } from "../../utils/interfaces";

import { globalSettingsState } from "../../state/defaultSettings";

interface Props {
  setTabType: React.Dispatch<React.SetStateAction<"folder" | "note" | "rss">>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  upperVisState: UpperVisState;
  loggedInData: boolean;
  setLoggedInData: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpperRightMenu({
  upperVisDispatch,
  upperVisState,
  setTabType,
  loggedInData,
  setLoggedInData,
}: Props): JSX.Element {
  const [uiColorData, setUiColorData] = uiColorState.use();

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  const colLimit = globalSettingsData.limitColGrowth;



  function areButtonsDisabled(): boolean {
    if (
      upperVisState.backgroundSettingsVis ||
      upperVisState.colorsSettingsVis ||
      upperVisState.settingsVis ||
      upperVisState.profileVis ||
      upperVisState.newBookmarkVis ||
      upperVisState.newTabVis
    ) {
      return true;
    }

    return false;
  }

  return (
    <>
      {upperVisState.addTagVis_xs && (
        <div
          className={`flex ${
            colLimit ? "sm:hidden" : "xs:hidden"
          } justify-around`}
        >
          <button
            className="h-7 w-7 focus:outline-none focus:ring-2 focus:ring-blueGray-400 ring-inset"
            style={{ marginLeft: "0px" }}
            onClick={() => {
              // setNewTabVis((b) => !b);
              upperVisDispatch({ type: "NEW_TAB_TOGGLE" });
              setTabType("folder");
            }}
            disabled={areButtonsDisabled()}
          >
            <FolderSVG
              className={`h-7 w-7 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
            />
          </button>

          {/* <AddNote */}
          <button
            className="h-6 w-6 focus:outline-none focus:ring-2 focus:ring-blueGray-400"
            style={{ marginTop: "2px", marginLeft: "0px" }}
            onClick={() => {
              // setNewTabVis((b) => !b);

              upperVisDispatch({ type: "NEW_TAB_TOGGLE" });
              setTabType("note");
            }}
            disabled={areButtonsDisabled()}
          >
            <NoteSVG
              className={`h-6 w-6 cursor-pointer fill-current transition-colors duration-75 text-black hover:text-${uiColorData}`}
            />
          </button>

          {/* <AddRssSVG className={`h-6 cursor-pointer hover:text-${uiColorData}`} */}

          <button
            className="h-7 w-7 focus:outline-none focus:ring-2 focus:ring-blueGray-400 ring-inset"
            style={{ marginRight: "-2px" }}
            onClick={() => {
              // setNewTabVis((b) => !b);
              upperVisDispatch({ type: "NEW_TAB_TOGGLE" });
              setTabType("rss");
            }}
            disabled={areButtonsDisabled()}
          >
            <AddRssSVG
              className={`h-7 w-7 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
            />
          </button>

          <UserSVG
            className={`invisible h-6 self-center cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
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
          className="h-7 w-7 focus:outline-none focus:ring-2 focus:ring-blueGray-400 ring-inset"
          onClick={() => {
            // setNewBookmarkVis((b) => !b);
            upperVisDispatch({ type: "NEW_BOOKMARK_TOGGLE" });
          }}
          disabled={areButtonsDisabled()}
        >
          <BookmarkSVG
            className={`h-7 w-7 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
          />
        </button>

        {/* <AddFolderSVG */}

        <button
          className="h-6 w-5 self-center focus:outline-none focus:ring-2 focus:ring-blueGray-400"
          style={{ width: "22px" }}
          onClick={() => {
            upperVisDispatch({ type: "ADD_TAG_XS_TOGGLE" });
          }}
          disabled={areButtonsDisabled()}
        >
          <PlusSquareSVG
            className={`h-5 w-5 cursor-pointer transition-colors duration-75 fill-current hover:text-${uiColorData} ml-px`}
          />
        </button>

        {/* <AddNote */}
        <button
          className="h-6 w-6 ml-0.5 focus:outline-none focus:ring-2 focus:ring-blueGray-400"
          style={{ marginTop: "2px" }}
          onClick={() => {
            upperVisDispatch({ type: "SETTINGS_TOGGLE" });
          }}
          disabled={areButtonsDisabled()}
        >
          <CogSVG
            className={`h-full w-full cursor-pointer transition-colors duration-75  hover:text-${uiColorData}`}
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
          {loggedInData ? (
            <button
              className="h-6 w-5 focus:outline-none focus:ring-2 focus:ring-blueGray-400"
              style={{ width: "22px" }}
              onClick={() => {
                // upperVisDispatch({ type: "PROFILE_TOGGLE" });
                setLoggedInData(false);
                upperVisDispatch({ type: "MESSAGE_OPEN_LOGOUT" });
              }}
              disabled={areButtonsDisabled()}
            >
              <LogoutSVG
                className={`h-6 w-6 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
                style={{ marginLeft: "-1px" }}
              />
            </button>
          ) : (
            <button
              className="h-6 w-5 focus:outline-none focus:ring-2 focus:ring-blueGray-400"
              style={{ width: "18px" }}
              onClick={() => {
                upperVisDispatch({ type: "PROFILE_TOGGLE" });
                // setLoggedInData(true);
              }}
              disabled={areButtonsDisabled()}
            >
              <UserSVG
                // -ml-1
                className={`h-6 w-6 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
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
