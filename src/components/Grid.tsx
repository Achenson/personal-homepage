import React from "react";
import { useState, useEffect } from "react";
import Bookmark from "./Bookmark";
import { bookmarksDataState, linksDataState } from "../state/bookmarksAndLinks";
import { produce } from "immer";

interface Props {}

function Grid({}: Props): JSX.Element {
 

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [linksData, setLinksData] = linksDataState.use();

  useEffect(() => {
    let linksDataTags: string[] = [];

    linksData.forEach((obj) => {
      obj.tags.forEach((el) => {
        if (linksDataTags.indexOf(el) === -1) {
          linksDataTags.push(el);
        }
      });
    });

    bookmarksData.forEach((obj, i) => {
      if (linksDataTags.indexOf(obj.title) === -1) {
        setBookmarksData((previous) =>
          produce(previous, (updated) => {
            updated.splice(i, 1);
          })
        );
      }
    });
  }, [bookmarksData, linksData]);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-4">
      <div className="bg-yellow-200">
        {bookmarksData
          .filter((el) => el.column === 1)
          .sort((a, b) => a.priority - b.priority)
          .map((el, i) => {
            return (
              <Bookmark
                bookmarkTitle={el.title}
                bookmarkColor={el.color}
                linksData={linksData}
                key={i}
              />
            );
          })}
      </div>
      <div className="hidden sm:block bg-orange-200">
        {bookmarksData
          .filter((el) => el.column === 2)
          .sort((a, b) => a.priority - b.priority)
          .map((el, i) => {
            return (
              <Bookmark
                bookmarkTitle={el.title}
                bookmarkColor={el.color}
                linksData={linksData}
                key={i}
              />
            );
          })}
      </div>
      <div className="hidden md:block bg-red-200">3</div>
      <div className="hidden lg:block bg-green-200">4</div>
    </div>
  );
}

export default Grid;
