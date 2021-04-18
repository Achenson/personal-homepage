import React, { useState, useEffect } from "react";

import SelectableList from "../Shared/SelectableList";

import { ReactComponent as ChevronDownSVG } from "../../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../../svgs/chevron-up.svg";
import { ReactComponent as XsmallSVG } from "../../svgs/x-small.svg";

import { bookmarksDataState } from "../../state/tabsAndBookmarks";

interface Props {
  bookmarksListVis: boolean;
  setBookmarksListVis: React.Dispatch<React.SetStateAction<boolean>>;
  setWasAnythingClicked: React.Dispatch<React.SetStateAction<boolean>>;
  bookmarksInputStr: string;
  setBookmarksInputStr: React.Dispatch<React.SetStateAction<string>>;
}

function EditTab_folder({
  bookmarksListVis,
  setBookmarksListVis,
  setWasAnythingClicked,
  bookmarksInputStr,
  setBookmarksInputStr,
}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  const [initialBookmarks, setInitialBookmarks] = useState(() =>
    makeInitialBookmarks()
  );

  const [visibleBookmarks, setVisibleBookmarks] = useState<string[]>(() =>
    makeInitialBookmarks()
  );

  useEffect(() => {
    let newVisibleBookmarks: string[] = [];

    initialBookmarks.forEach((el) => {
      // in new RegExp the \ needs to be escaped!
      let tagRegex = new RegExp(`\\b${el}\\b`);

      if (!tagRegex.test(bookmarksInputStr)) {
        newVisibleBookmarks.push(el);
      }
    });

    setVisibleBookmarks([...newVisibleBookmarks]);

    if (newVisibleBookmarks.length === 0) {
      setBookmarksListVis(false);
    }
  }, [
    bookmarksInputStr,
    initialBookmarks,
    setVisibleBookmarks,
    setBookmarksListVis,
  ]);

  function makeInitialBookmarks(): string[] {
    let bookmarks: string[] = [];

    bookmarksData.forEach((obj) => {
      bookmarks.push(obj.title);
    });

    return bookmarks;
  }

  return (
    /* bookmarks not visible for tab with ALL Bookmarks */

    <div className="flex items-center mt-2 justify-between">
      <p className={`mr-2`}>Bookmarks</p>
      <div className="relative w-full">
        <div className="relative">
          <input
            type="text"
            // min-w-0 !! ??
            className="border pl-px w-full pr-5"
            value={bookmarksInputStr}
            onChange={(e) => {
              // setTabTitleInput(e.target.value);
              setWasAnythingClicked(true);

              let target = e.target.value;

              setBookmarksInputStr(target);

              let bookmarksInputArr = target.split(", ");
              let newVisibleBookmarks: string[] = [];

              visibleBookmarks.forEach((el) => {
                if (bookmarksInputArr.indexOf(el) === -1) {
                  newVisibleBookmarks.push(el);
                }
              });

              setVisibleBookmarks([...newVisibleBookmarks]);
            }}
            onFocus={(e) => {
              setBookmarksListVis(true);
            }}
            placeholder={"Choose at least one"}
          />
          {bookmarksInputStr.length !== 0 && (
            <span
              className="absolute h-4 bg-white z-50"
              style={{ top: "7px", right: "2px" }}
            >
              <XsmallSVG
                className="h-full text-gray-500 cursor-pointer hover:text-opacity-60"
                onClick={() => {
                  setBookmarksInputStr("");
                  setWasAnythingClicked(true);
                }}
              />
            </span>
          )}
        </div>

        {bookmarksListVis && (
          <SelectableList
            setSelectablesInputStr={setBookmarksInputStr}
            selectablesInputStr={bookmarksInputStr}
            visibleSelectables={visibleBookmarks}
            marginTop="0px"
            // setWasAnythingClicked
            setWasAnythingClicked={setWasAnythingClicked}
          />
        )}
      </div>

      <div style={{ height: "18px" }} className="-mr-1">
        {bookmarksListVis ? (
          <ChevronUpSVG
            className="h-full cursor-pointer hover:text-blueGray-500 transition-colors duration-75"
            onClick={() => {
              setBookmarksListVis((b) => !b);
            }}
          />
        ) : (
          <ChevronDownSVG
            className="h-full cursor-pointer hover:text-blueGray-500 transition-colors duration-75"
            onClick={() => {
              setBookmarksListVis((b) => !b);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default EditTab_folder;
