import React, { useState } from "react";
import { useQuery } from "react-query";
import SingleRssNews from "./SingleRssNews";

import { bookmarksDataState } from "../state/bookmarksAndLinks";
import { rssSettingsState } from "../state/defaultSettings";

import { ReactComponent as ArrowLeft } from "../svgs/arrowLeft.svg";
import { ReactComponent as ArrowRight } from "../svgs/arrowRight.svg";

let Parser = require("rss-parser");
let parser = new Parser();

interface Props {
  bookmarkID: string | number;
}

function ReactQuery({ bookmarkID }: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [rssSettingsData, setRssSettingsData] = rssSettingsState.use();
  let currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkID);

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof currentBookmark[0].itemsPerPage === "number") {
      return currentBookmark[0].itemsPerPage;
    }

    return rssSettingsData.itemsPerPage;
  });
  const [pageNumber, setPageNumber] = useState(0);

  const { data, status } = useQuery("feed", fetchFeed, {
    // staleTime: 2000,
    // cacheTime: 10,
    onSuccess: () => console.log("data fetched with no problems"),
  });
  console.log(data);

  async function fetchFeed() {
    let currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkID);
    const response = await parser.parseURL(currentBookmark[0].rssLink);

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
        link={el.link}
        key={i}
        pubDate={el.pubDate}
      />
    ));
  }

  return (
    <div>
      {status === "loading" && <div>Loading data</div>}

      {status === "error" && <div>Error fetching data</div>}

      {status === "success" && <div>{mapData()}</div>}

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
    </div>
  );
}

export default ReactQuery;
