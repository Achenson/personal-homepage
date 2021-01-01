import React, { useEffect, useState } from "react";

import { bookmarksDataState } from "../state/bookmarksAndLinks";

import { produce } from "immer";
import SingleRssNews from "./SingleRssNews";

let Parser = require("rss-parser");
let parser = new Parser();

interface Props {
  //  rssLink: string | null
  bookmarkID: string | number;
  bookmarkIndex: number;
}

function RSS({ bookmarkID, bookmarkIndex }: Props): JSX.Element {

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [toDisplay, setToDisplay] = useState("loading data...");

  let currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkID);

  // let bookmarkIndex: number;

  // bookmarksData.forEach((obj, i) => {
  //   if (obj.id === bookmarkID) {
  //     bookmarkIndex = i;
  //   }
  // });

  useEffect(() => {  



    // @ts-ignore: Unreachable code error
    if (currentBookmark[0].items?.length === 0) {
      parser
        .parseURL(currentBookmark[0].rssLink)
        // @ts-ignore: Unreachable code error
        .then(
          // @ts-ignore: Unreachable code error
          (feed) => {
            // feed.items.forEach((item) => console.log(item.title + " : " + item.link))

            // @ts-ignore: Unreachable code error
            // feed.items.forEach((item) =>
            //   console.log(item.title + " : " + item.link + " " + item.pubDate)
            // );

            // console.log(feed.items[0])
            setBookmarksData((previous) =>
              produce(previous, (updated) => {
                // @ts-ignore: Unreachable code error
                updated[bookmarkIndex].items.push({
                  ...feed.items[0],
                });
              })
            );


              setToDisplay(feed.items[0].title)


          }
        );
    } else {

      // @ts-ignore: Unreachable code error
      setToDisplay(bookmarksData[bookmarkIndex].items[0].title)
    }

    // console.log(bookmarksData[bookmarkIndex].items);
    
  },[currentBookmark, bookmarksData, setBookmarksData, bookmarkIndex]);

  // (async () => {
  //   // let feed = await parser.parseURL('https://www.reddit.com/.rss');
  //   let feed = await parser.parseURL(currentBookmark[0].rssLink);
  //   // console.log(feed.title);

  //   // @ts-ignore: Unreachable code error
  //   feed.items.forEach((item) => {
  //     console.log(item.title + ":" + item.link);
  //   });
  // })();

  return (
    <div>
      {/* <SingleRssNews bookmarkID={bookmarkID} /> */}
      {toDisplay}
    </div>
  );
}

export default RSS;
