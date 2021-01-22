import React from "react";
import { useQuery } from "react-query";
import SingleRssNews from "./SingleRssNews";

import { bookmarksDataState } from "../state/bookmarksAndLinks";

let Parser = require("rss-parser");
let parser = new Parser();

interface Props {
  bookmarkID: string | number;
}

function ReactQuery({ bookmarkID }: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  const { data, status } = useQuery("feed", fetchFeed, {
    // staleTime: 2000,
    // cacheTime: 10,
    onSuccess: () => console.log("data fetched with no problems"),
  });
  console.log(data);

  async function fetchFeed() {
    let currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkID);
    const response = await parser.parseURL(currentBookmark[0].rssLink)

    return response;
  }

  return (
    <div>
      {status === "loading" && <div>Loading data</div>}

      {status === "error" && <div>Error fetching data</div>}

      {status === "success" && (
        <div>
          {
            // @ts-ignore: Unreachable code error
            data.items.map((el, i) => (
              <SingleRssNews
                title={el.title}
                link={el.link}
                key={i}
                pubDate={el.pubDate}
              />
            ))
          }
        </div>
      )}
    </div>
  );
}

export default ReactQuery;
