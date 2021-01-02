import React, { useEffect, useState } from "react";

import { bookmarksDataState } from "../state/bookmarksAndLinks";

import { produce } from "immer";
import SingleRssNews from "./SingleRssNews";

let Parser = require("rss-parser");
let parser = new Parser();

interface Props {
  bookmarkID: string | number;
  bookmarkIndex: number;
}

function RSS({ bookmarkID, bookmarkIndex }: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [toDisplay, setToDisplay] = useState([
    {
      title: "loading data...",
      link: "loading data...",
      pubDate: "loading data...",
    },
  ]);
  const itemsPerPage = 10;
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    calcCurrentPage(toDisplay, pageNumber, itemsPerPage)
  );

  function calcCurrentPage(
    toDisplay: any,
    pageNumber: number,
    itemsPerPage: number
  ) {
    let arrOfObj = [];

    for (let i = 0 + (pageNumber*10); i < itemsPerPage + (pageNumber*10); i++) {
      if (toDisplay[i]) {
        arrOfObj.push(toDisplay[i]);
      }
    }

    return arrOfObj;
  }

  useEffect(() => {
    let currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkID);

    // @ts-ignore: Unreachable code error
    if (toDisplay[0].title === "loading data...") {
      parser.parseURL(currentBookmark[0].rssLink).then(
        // @ts-ignore: Unreachable code error
        (feed) => {
          // @ts-ignore: Unreachable code error
          // feed.items.forEach((item) =>
          //   console.log(item.title + " : " + item.link + " " + item.pubDate)
          // );

          let howManyItems: number;

          if (feed.length < 50) {
            howManyItems = feed.length;
          } else {
            howManyItems = 50;
          }

          setBookmarksData((previous) =>
            produce(previous, (updated) => {
              // @ts-ignore: Unreachable code error
              // updated[bookmarkIndex].items.push({
              //   ...feed.items[0],
              // });
              for (let i = 0; i < howManyItems; i++) {
                // @ts-ignore: Unreachable code error
                updated[bookmarkIndex].items.push({
                  ...feed.items[i],
                });
              }
            })
          );

          setToDisplay((previous) =>
            produce(previous, (updated) => {
              if (toDisplay.length === 1) {
                updated.shift();
                for (let i = 0; i < howManyItems; i++) {
                  updated.push(feed.items[i]);
                }
              }
            })
          );
        }
      );
    } else {
      setToDisplay((previous) =>
        produce(previous, (updated) => {
          if (toDisplay.length === 1) {
            updated.shift();
            // @ts-ignore: Unreachable code error
            for (let i = 0; i < bookmarksData[bookmarkIndex].items?.length; i++) {
              // @ts-ignore: Unreachable code error
              updated.push(bookmarksData[bookmarkIndex].items[i]);
            }
          }
        })
      );
    }

    setCurrentPage(calcCurrentPage(toDisplay, pageNumber, itemsPerPage));
    console.log(toDisplay[0].title);

    // console.log(bookmarksData[bookmarkIndex].items);
  }, [
    bookmarksData,
    setBookmarksData,
    bookmarkIndex,
    bookmarkID,
    toDisplay,
    pageNumber,
  ]);

  return (
    <div>
      {/* {toDisplay.map((el, i) => { */}
      {currentPage.map((el, i) => {
        return (
          <SingleRssNews
            title={el.title}
            link={el.link}
            key={i}
            pubDate={el.pubDate}
          />
        );
      })}
    </div>
  );
}

export default RSS;
