import React from "react";
import { useState, useEffect } from "react";
import { produce } from "immer";

import {
  tabsDataState,
  bookmarksAllTagsState,
} from "../../state/tabsAndBookmarks";

import { closeAllTabsState } from "../../state/defaultSettings";


import { resetColorsState } from "../../state/colorsState";

import { globalSettingsState } from "../../state/defaultSettings";

import { UpperVisAction } from "../../utils/interfaces";

import Column from "./Column";

interface Props {
  upperVisDispatch: React.Dispatch<UpperVisAction>;
}

function Grid({upperVisDispatch}: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();
  const [
    bookmarksAllTagsData,
    setBookmarksAllTagsData,
  ] = bookmarksAllTagsState.use();
  const [resetColorsData, setResetColorsData] = resetColorsState.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const [closeAllTabsData, setCloseAllTabsData] = closeAllTabsState.use();

  useEffect(() => {
    if (closeAllTabsData) {
      setCloseAllTabsData(false);
    }
  }, [closeAllTabsData, setCloseAllTabsData]);

  useEffect(() => {
    if (resetColorsData) {
      // tabsData.forEach((obj, i) => {});

      setTabsData((previous) =>
        produce(previous, (updated) => {
          updated.forEach((obj, i) => {
            obj.color = null;
          });
        })
      );

      setResetColorsData(false);
    }
  }, [resetColorsData, setTabsData, setResetColorsData]);

  useEffect(() => {
    // console.log(bookmarksAllTagsData);

    // deleting an empty folderTab
    // deleting a tab if there is no tags with the same name in bookmarks

    tabsData.forEach((obj, i) => {
      if (
        bookmarksAllTagsData.indexOf(obj.id) === -1 &&
        obj.type === "folder"
      ) {
        console.log("cut");

        setTabsData((previous) =>
          produce(previous, (updated) => {
            updated.splice(i, 1);
          })
        );
      }
    });
  }, [tabsData, setTabsData, bookmarksAllTagsData]);

  function renderColumns(numberOfCols: 1 | 2 | 3 | 4) {
    switch (numberOfCols) {
      case 1:
        return <Column colNumber={1} upperVisDispatch={upperVisDispatch} />;
      case 2:
        return (
          <>
            <Column colNumber={1} upperVisDispatch={upperVisDispatch} />
            <Column colNumber={2}  upperVisDispatch={upperVisDispatch}/>
          </>
        );
      case 3:
        return (
          <>
            <Column colNumber={1} upperVisDispatch={upperVisDispatch} />
            <Column colNumber={2}  upperVisDispatch={upperVisDispatch}/>
            <Column colNumber={3} upperVisDispatch={upperVisDispatch}/>
          </>
        );
      case 4:
        return (
          <>
            <Column colNumber={1} upperVisDispatch={upperVisDispatch} />
            <Column colNumber={2} upperVisDispatch={upperVisDispatch}/>
            <Column colNumber={3} upperVisDispatch={upperVisDispatch}/>
            <Column colNumber={4} upperVisDispatch={upperVisDispatch}/>
          </>
        );
    }
  }

  function gridSettings(numberOfCols: 1 | 2 | 3 | 4) {
    switch (numberOfCols) {
      case 1:
        return ``;
      case 2:
        return `sm:grid-cols-2`;
      case 3:
        return `sm:grid-cols-2 md:grid-cols-3`;
      case 4:
        return `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
    }
  }

  return (
    <div
      className={`grid gap-x-2 gap-y-6 mx-4 ${gridSettings(
        globalSettingsData.numberOfCols
      )}`}
      // className={`grid gap-x-2 gap-y-6 mx-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
    >
      {renderColumns(globalSettingsData.numberOfCols)}
    </div>
  );
}

export default Grid;
