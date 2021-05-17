import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import SingleRssNews from "./SingleRssNews";

import { tabsDataState } from "../../state/tabsAndBookmarks";
import { rssSettingsState } from "../../state/defaultSettings";

import { SingleTabData } from "../../utils/interfaces";

import { ReactComponent as ArrowLeft } from "../../svgs/arrowLeft.svg";
import { ReactComponent as ArrowRight } from "../../svgs/arrowRight.svg";

import { globalSettingsState } from "../../state/defaultSettings";

let Parser = require("rss-parser");
let parser = new Parser();
//   {
//   requestOptions: {
//     rejectUnauthorized: false
//   }
// }

interface Props {
  tabID: string | number;
  currentTab: SingleTabData;
}

function ReactQuery({ currentTab, tabID }: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();
  const [rssSettingsData, setRssSettingsData] = rssSettingsState.use();
  // let currentTab = tabsData.filter((obj) => obj.id === tabID);

  const [itemsPerPage, setItemsPerPage] = useState(() => calcItemsPerPage());

  const [descriptionVis, setDescriptionVis] = useState(() =>
    calcDescriptionVis()
  );
  const [dateVis, setDateVis] = useState(() => calcDateVis());

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  function calcItemsPerPage() {
    // if currentBookmars itemsPerPage is set, return it, otherwise
    // return defaul option for RSS setting

    if (typeof currentTab.itemsPerPage === "number") {
      return currentTab.itemsPerPage;
    }

    return rssSettingsData.itemsPerPage;
  }

  function calcDescriptionVis() {
    if (typeof currentTab.itemsPerPage === "boolean") {
      return currentTab.description;
    }

    return rssSettingsData.description;
  }

  function calcDateVis() {
    if (typeof currentTab.itemsPerPage === "boolean") {
      return currentTab.date;
    }

    return rssSettingsData.date;
  }

  useEffect(() => {
    let tabToUpdate = tabsData.find((obj) => obj.id === tabID);
    if (tabToUpdate) {
      let tabIndex = tabsData.indexOf(tabToUpdate as SingleTabData);

      if (
        tabsData[tabIndex].itemsPerPage !== itemsPerPage &&
        typeof tabsData[tabIndex].itemsPerPage === "number"
      ) {
        setItemsPerPage(tabsData[tabIndex].itemsPerPage as number);
      }

      if (
        tabsData[tabIndex].description !== descriptionVis &&
        typeof tabsData[tabIndex].description === "boolean"
      ) {
        setDescriptionVis(tabsData[tabIndex].description as boolean);
      }

      if (
        tabsData[tabIndex].date !== dateVis &&
        typeof tabsData[tabIndex].date === "boolean"
      ) {
        setDateVis(tabsData[tabIndex].date as boolean);
      }
    }
  }, [tabsData, tabID, dateVis, descriptionVis, itemsPerPage]);

  const [pageNumber, setPageNumber] = useState(0);

  const { data, status } = useQuery(`${tabID}`, fetchFeed, {
    // staleTime: 2000,
    // cacheTime: 10,
    onSuccess: () => console.log("data fetched with no problems"),
  });
  console.log(data);

  async function fetchFeed() {
    // let currentTab = tabsData.filter((obj) => obj.id === tabID);
    const response = await parser.parseURL(currentTab.rssLink);

    return response;
  }

  function mapData() {
    let arrOfObj = [];

    for (let i = 0 + pageNumber * 10; i < itemsPerPage + pageNumber * 10; i++) {
      if (data.items[i]) {
        arrOfObj.push(data.items[i]);
      }
    }

    return arrOfObj.map((el, i) => (
      <SingleRssNews
        title={el.title}
        description={el.contentSnippet}
        descriptionVis={descriptionVis}
        dateVis={dateVis}
        link={el.link}
        key={i}
        pubDate={el.pubDate}
      />
    ));
  }

  return (
    <div className={``}>
      <div
        className={`flex bg-gray-50 justify-end border-r border-l
    ${
      globalSettingsData.picBackground ? "" : "border-black border-opacity-10"
    }`}
      >
        <ArrowLeft
          className={`h-8 ${
            pageNumber === 0
              ? `text-gray-400`
              : `cursor-pointer text-black hover:bg-gray-200`
          }`}
          onClick={() => {
            if (pageNumber > 0) {
              setPageNumber(pageNumber - 1);
            }
          }}
        />
        <ArrowRight
          className={`h-8 ${
            pageNumber === 4
              ? `text-gray-400`
              : `cursor-pointer text-black hover:bg-gray-200`
          }`}
          onClick={() => {
            if (pageNumber < 4) {
              setPageNumber(pageNumber + 1);
            }
          }}
        />
      </div>
      <div
        className={`text-center
    ${
      globalSettingsData.picBackground
        ? "bg-white bg-opacity-90 border-r border-l"
        : "border-r border-l border-black border-opacity-10"
    }`}
      >
        {status === "loading" && <div>Loading data...</div>}

        {status === "error" && <div>Error fetching data</div>}

        </div>
        
        {status === "success" && <div
      
        >{mapData()}</div>}
    </div>
  );
}

export default ReactQuery;
