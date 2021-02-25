import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import SingleRssNews from "./SingleRssNews";

import { tabsDataState } from "../state/tabsAndLinks";
import { rssSettingsState } from "../state/defaultSettings";

import { ReactComponent as ArrowLeft } from "../svgs/arrowLeft.svg";
import { ReactComponent as ArrowRight } from "../svgs/arrowRight.svg";

let Parser = require("rss-parser");
let parser = new Parser();

interface Props {
  tabID: string | number;
}

function ReactQuery({ tabID }: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();
  const [rssSettingsData, setRssSettingsData] = rssSettingsState.use();
  let currentTab = tabsData.filter((obj) => obj.id === tabID);

  const [itemsPerPage, setItemsPerPage] = useState(calcItemsPerPage());

  const [descriptionVis, setDescriptionVis] = useState(calcDescriptionVis());
  const [dateVis, setDateVis] = useState(calcDateVis());

  
  function calcItemsPerPage() {
    // if currentBookmars itemsPerPage is set, return it, otherwise
    // return defaul option for RSS setting
    
    if (typeof currentTab[0].itemsPerPage === "number") {
      return currentTab[0].itemsPerPage;
    }

    return rssSettingsData.itemsPerPage;
  }

  function calcDescriptionVis() {
    if (typeof currentTab[0].itemsPerPage === "boolean") {
      return currentTab[0].description;
    }

    return rssSettingsData.description;
  }

  function calcDateVis() {
    if (typeof currentTab[0].itemsPerPage === "boolean") {
      return currentTab[0].date;
    }

    return rssSettingsData.date;
  }

  // const [itemsPerPage, setItemsPerPage] = useState(() => {
  //   if (typeof currentTab[0].itemsPerPage === "number") {
  //     return currentTab[0].itemsPerPage;
  //   }
  //   return rssSettingsData.itemsPerPage;
  // });

  useEffect(() => {
    let tabIndex: number = 0;

    tabsData.forEach((obj, i) => {
      if (obj.id === tabID) {
        tabIndex = i;
      }
    });

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
      tabsData[tabIndex].date!== dateVis &&
      typeof tabsData[tabIndex].date === "boolean"
    ) {
      setDateVis(tabsData[tabIndex].date as boolean);
    }

  }, [tabsData, tabID, dateVis, descriptionVis, itemsPerPage]);

  const [pageNumber, setPageNumber] = useState(0);

  const { data, status } = useQuery("feed", fetchFeed, {
    // staleTime: 2000,
    // cacheTime: 10,
    onSuccess: () => console.log("data fetched with no problems"),
  });
  console.log(data);

  async function fetchFeed() {
    let currentTab = tabsData.filter((obj) => obj.id === tabID);
    const response = await parser.parseURL(currentTab[0].rssLink);

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
    <div>
      <div className="flex bg-gray-50 justify-end ">
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

      {status === "loading" && <div>Loading data</div>}

      {status === "error" && <div>Error fetching data</div>}

      {status === "success" && <div>{mapData()}</div>}
    </div>
  );
}

export default ReactQuery;
