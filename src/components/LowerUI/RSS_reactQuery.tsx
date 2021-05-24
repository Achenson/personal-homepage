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

  // const [itemsPerPage, setItemsPerPage] = useState(calcItemsPerPage());

  // const [descriptionVis, setDescriptionVis] = useState(calcDescriptionVis());
  // const [dateVis, setDateVis] = useState(calcDateVis());





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
    if (typeof currentTab.description === "boolean") {
      return currentTab.description;
    }

    return rssSettingsData.description;
  }

  function calcDateVis() {
    if (typeof currentTab.date === "boolean") {
      return currentTab.date;
    }

    return rssSettingsData.date;
  }

  // useEffect(() => {
  //   let tabToUpdate = tabsData.find((obj) => obj.id === tabID);
  //   if (tabToUpdate) {
  //     let tabIndex = tabsData.indexOf(tabToUpdate as SingleTabData);

  //     if (
  //       tabsData[tabIndex].itemsPerPage !== itemsPerPage &&
  //       typeof tabsData[tabIndex].itemsPerPage === "number"
  //     ) {
  //       setItemsPerPage(tabsData[tabIndex].itemsPerPage as number);
  //     }

  //     if (
  //       tabsData[tabIndex].description !== descriptionVis &&
  //       typeof tabsData[tabIndex].description === "boolean"
  //     ) {
  //       setDescriptionVis(tabsData[tabIndex].description as boolean);
  //     }

  //     if (
  //       tabsData[tabIndex].date !== dateVis &&
  //       typeof tabsData[tabIndex].date === "boolean"
  //     ) {
  //       setDateVis(tabsData[tabIndex].date as boolean);
  //     }
  //   }
  // }, [tabsData, tabID, dateVis, descriptionVis, itemsPerPage]);



  let itemsPerPage = calcItemsPerPage();
  let descriptionVis = calcDescriptionVis();
  let dateVis = calcDateVis();

  

  const [pageNumber, setPageNumber] = useState(0);

  const { data, status } = useQuery(`${tabID}`, fetchFeed, {
    // staleTime: 2000,
    // cacheTime: 10,
    onSuccess: () => {
      console.log("data fetched with no problems");
    },
  });

  async function fetchFeed() {
    // let currentTab = tabsData.filter((obj) => obj.id === tabID);
    const response = await parser.parseURL(currentTab.rssLink);

    return response;
  }

  function mapData() {
    let arrOfObj = [];

    let howManyNews = data.items.length;

    // #1(2nd page) 7perPage      1*7                   <7 + 7           [7-13]
    for (
      let i = pageNumber * itemsPerPage;
      i < pageNumber * itemsPerPage + itemsPerPage;
      i++
    ) {
      if (i > howManyNews) {
        break;
      }

      if (data.items[i]) {
        arrOfObj.push(data.items[i]);
        continue;
      }
      break;
    }

    function convertRssDate(pubDate: string) {
      let date = new Date(pubDate);
      if (!date || !date.getDay() || !date.getMonth()) {
        return "unknown date";
      }
      // let dateShorter = new Date(date.getFullYear(), date.getMonth(), date.getDate())

      let dateNow = new Date();
      // let dateNowShorter = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate())

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      let date_day = date.getDate();
      let dateNow_day = dateNow.getDate();

      if (date_day === dateNow_day) {
        return "today";
      }

      if (date_day + 1 === dateNow_day) {
        return "yesterday";
      }

      for (let i = 2; i <= 31; i++) {
        if (date_day + i === dateNow_day) {
          return `${i} days ago`;
        }
      }

      return "older than a month";

      // let newDatePartial =
      //   `${dayOfTheMonth(date)}` + " " + months[date.getMonth()];

      // return newDatePartial;

      // function dayOfTheMonth(date: Date) {
      //   let day = date.getDate();

      //   switch (day) {
      //     case 1:
      //       return `${day}st`;
      //     case 2:
      //       return `${day}nd`;
      //     case 3:
      //       return `${day}rd`;
      //     default:
      //       return `${day}th`;
      //   }
      // }
    }

    return arrOfObj.map((el, i) => (
      <SingleRssNews
        title={el.title}
        description={el.contentSnippet}
        descriptionVis={descriptionVis}
        dateVis={dateVis}
        link={el.link}
        key={i}
        // pubDate={el.pubDate}
        pubDate={convertRssDate(el.pubDate)}
      />
    ));
  }

  function lastPageNumber() {
    if (status !== "success") {
      return 1;
    }

    let howManyNews = data.items.length;

    let maxNumber = howManyNews < 50 ? howManyNews : 50;

    // console.log("how many news");
    // console.log(howManyNews);

    // console.log("maxNumber");
    // console.log(maxNumber);

    // console.log("items per page");
    // console.log(itemsPerPage);

    // rounded up
    console.log(Math.ceil(maxNumber / itemsPerPage) - 1);

    return Math.ceil(maxNumber / itemsPerPage) - 1;
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
            pageNumber === lastPageNumber()
              ? `text-gray-400`
              : `cursor-pointer text-black hover:bg-gray-200`
          }`}
          onClick={() => {
            if (pageNumber < lastPageNumber()) {
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

      {status === "success" && <div>{mapData()}</div>}
    </div>
  );
}

export default ReactQuery;
