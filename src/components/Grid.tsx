import React from "react";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Tab from "./Tab";

import {
  tabsDataState,
  linksDataState,
  deletedTabState,
  linksAllTagsState,
} from "../state/tabsAndLinks";

import { closeAllTabsState } from "../state/defaultSettings";

import { createFolderTab } from "../utils/objCreators";

import { produce } from "immer";

import { columnsColorsState, resetColorsState } from "../state/colorsState";

import { globalSettingsState } from "../state/defaultSettings";
import Column from "./Column";

import useSize from "@react-hook/size";

interface Props {}

function Grid({}: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();
  const [linksData, setLinksData] = linksDataState.use();
  const [linksAllTagsData, setLinksAllTagsData] = linksAllTagsState.use();
  const [resetColorsData, setResetColorsData] = resetColorsState.use();
  const [deletedTab, setDeletedTab] = deletedTabState.use();

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const [closeAllTabs, setCloseAllTabs] = useState(false);
  const [
    closeAllTabsData,
    setCloseAllTabsData,
  ] = closeAllTabsState.use();

  const target = React.useRef(null);
  const [width, height] = useSize(target);

  // const [{addedProps}, drop] = useDrop({

  // })

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
    // let linksDataTagsData: (string | number)[] = [];
    // let tabsDataIds: (string | number)[] = [];

    // linksData.forEach((obj) => {
    //   obj.tags.forEach((el) => {
    //     if (linksDataTags.indexOf(el) === -1) {
    //       linksDataTags.push(el);
    //     }
    //   });
    // });

    // tabsData.forEach((obj) => {
    //   tabsDataIds.push(obj.id);
    // });

    // let linksDataTagsIds: (string | number)[] = [];

    // linksDataTags.forEach((id) => {
    //   let filteredTab = tabsData.filter((obj) => obj.id === id)[0];
    //   linksDataTagsIds.push(filteredTab.id);
    // });

    // // adding a tab(folder) if previously non-existing tag was added to a link / if new tab is being added
    // linksDataTagsIds.forEach((el) => {
    //   // no adding tab if it was just set up for deletion

    //   if (tabsDataIds.indexOf(el) === -1 && deletedTab !== el) {
    //     setTabsData((previous) =>
    //       produce(previous, (updated) => {
    //         updated.push({
    //           ...createFolderTab(tabsData.filter(obj => obj.id === el)[0].title, 1, 0),
    //         });
    //       })
    //     );
    //   }
    // });

    console.log(linksAllTagsData);

    // deleting a tab if there is no tags with the same name in links

    tabsData.forEach((obj, i) => {
      if (linksAllTagsData.indexOf(obj.id) === -1 && obj.type === "folder") {
        console.log("cut");

        setTabsData((previous) =>
          produce(previous, (updated) => {
            updated.splice(i, 1);
          })
        );
      }
    });
  }, [tabsData, setTabsData, linksAllTagsData]);

  function renderColumns(numberOfCols: 1 | 2 | 3 | 4) {
    switch (numberOfCols) {
      case 1:
        return <Column colNumber={1} closeAllTabs={closeAllTabsData} />;
      case 2:
        return (
          <>
            <Column colNumber={1} closeAllTabs={closeAllTabsData} />
            <Column colNumber={2} closeAllTabs={closeAllTabsData} />
          </>
        );
      case 3:
        return (
          <>
            <Column colNumber={1} closeAllTabs={closeAllTabsData} />
            <Column colNumber={2} closeAllTabs={closeAllTabsData} />
            <Column colNumber={3} closeAllTabs={closeAllTabsData} />
          </>
        );
      case 4:
        return (
          <>
            <Column colNumber={1} closeAllTabs={closeAllTabsData} />
            <Column colNumber={2} closeAllTabs={closeAllTabsData} />
            <Column colNumber={3} closeAllTabs={closeAllTabsData} />
            <Column colNumber={4} closeAllTabs={closeAllTabsData} />
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
      ref={target}
    >
    

      {renderColumns(globalSettingsData.numberOfCols)}
    </div>
  );
}

export default Grid;
