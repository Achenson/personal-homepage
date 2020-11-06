import React from "react";
import { useState } from "react";
import Bookmark from "./Bookmark";

interface Props {}

function Grid({}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = useState([
    {
      title: "all",
      color: "bg-teal-500",
      column: 1,
      priority: 1,
      linksTitles: ["facebook", "tvn24", "gmail"],
    },
    {
      title: "main",
      color: "bg-teal-500",
      column: 1,
      priority: 0,
      linksTitles: ["tvn24", "gmail"],
    },
    {
      title: "fun",
      color: "bg-teal-500",
      column: 2,
      priority: 0,
      linksTitles: ["facebook"],
    },
  ]);

  const [linksData, setLinksData] = useState([
    {
      title: "facebook",
      URL: "https://en.wikipedia.org/wiki/Deadly_Rooms_of_Death",
      tags: ["all", "fun"],
    },
    {
      title: "tvn24",
      URL: "https://en.wikipedia.org/wiki/Webfoot_Technologies",
      tags: ["all", "main"],
    },
    {
      title: "gmail",
      URL: "https://en.wikipedia.org/wiki/Microsoft_Windows",
      tags: ["all", "main"],
    },
  ]);

  function compareNumeric(a: number, b: number) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-4">
      <div className="bg-yellow-200">
        {bookmarksData
          .filter((el) => el.column === 1)
          .sort((a, b) => a.priority - b.priority)
          .map((el, i) => {
            return <Bookmark bookmarkTitle={el.title} linksData={linksData} key={i} />;
          })}
      </div>
      <div className="hidden sm:block bg-orange-200">
        {bookmarksData
          .filter((el) => el.column === 2)
          .sort((a, b) => a.priority - b.priority)
          .map((el, i) => {
            return <Bookmark bookmarkTitle={el.title} linksData={linksData} key={i} />;
          })}
      </div>
      <div className="hidden md:block bg-red-200">3</div>
      <div className="hidden lg:block bg-green-200">4</div>
    </div>
  );
}

export default Grid;
