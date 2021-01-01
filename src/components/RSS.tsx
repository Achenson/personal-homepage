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
  const [toDisplay, setToDisplay] = useState([
    {
      title: "sth",
      link: "someLink",
    },
  ]);
  // const [toDisplay, setToDisplay] = useState("df");

  // let bookmarkIndex: number;

  // bookmarksData.forEach((obj, i) => {
  //   if (obj.id === bookmarkID) {
  //     bookmarkIndex = i;
  //   }
  // });

  useEffect(() => {
    let currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkID);

    // @ts-ignore: Unreachable code error
    if (toDisplay[0].title === "sth") {
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

            // setToDisplay(feed.items[0].title)

            setToDisplay((previous) =>
              produce(previous, (updated) => {
                // updated.splice(0, updated.length)

                if (toDisplay.length === 1) {
                  for (let i = 0; i < 3; i++) {
                    updated.push(feed.items[i]);
                  }
                }

                // updated.shift();
              })
            );

            // let arrOfObj = [];

            // for (let i = 0; i < 3; i++) {
            //   arrOfObj.push(feed.items[i]);
            // }
            // // @ts-ignore: Unreachable code error
            // setToDisplay([...arrOfObj]);
          }
        );
    } else {
      setToDisplay((previous) =>
        produce(previous, (updated) => {
          if (toDisplay.length === 1) {
            for (let i = 0; i < 3; i++) {
              // @ts-ignore: Unreachable code error
              updated.push(bookmarksData[bookmarkIndex].items[i]);
            }
          }
        })
      );

      // let arrOfObj = [];

      // for (let i = 0; i < 3; i++) {
      //   // @ts-ignore: Unreachable code error
      //   arrOfObj.push(bookmarksData[bookmarkIndex].items[i]);
      // }
      // // @ts-ignore: Unreachable code error
      // setToDisplay([...arrOfObj]);

      // @ts-ignore: Unreachable code error
      // setToDisplay(bookmarksData[bookmarkIndex].items[0].title)
    }

    console.log(toDisplay[0].title);

    // console.log(bookmarksData[bookmarkIndex].items);
  }, [bookmarksData, setBookmarksData, bookmarkIndex, bookmarkID, toDisplay]);

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
      {toDisplay.map((el, i) => {
        return <SingleRssNews title={el.title} link={el.link} key={i} />;
      })}
    </div>
  );

  // return <div>null</div>;
}

export default RSS;
