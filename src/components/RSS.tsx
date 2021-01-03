import React, { useEffect, useState } from "react";

import { bookmarksDataState } from "../state/bookmarksAndLinks";
import { uiColorState } from "../state/colorsState";

import { produce } from "immer";
import SingleRssNews from "./SingleRssNews";

import { ReactComponent as ArrowLeft } from "../svgs/arrowLeft.svg";
import { ReactComponent as ArrowRight } from "../svgs/arrowRight.svg";

let Parser = require("rss-parser");
let parser = new Parser();

interface Props {
  bookmarkID: string | number;
  bookmarkIndex: number;
}

function RSS({ bookmarkID, bookmarkIndex }: Props): JSX.Element {
  let bgOnHover = `hover:bg-${uiColorState}`;

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

    for (let i = 0 + pageNumber * 10; i < itemsPerPage + pageNumber * 10; i++) {
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
            for (
              let i = 0;
              // @ts-ignore: Unreachable code error
              i < bookmarksData[bookmarkIndex].items?.length;
              i++
            ) {
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

export default RSS;
