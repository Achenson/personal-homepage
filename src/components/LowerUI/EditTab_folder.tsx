import React, { useState, useEffect } from "react";

import SelectableList from "../Shared/SelectableList";

import { ReactComponent as ChevronDownSVG } from "../../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../../svgs/chevron-up.svg";

import { bookmarksDataState } from "../../state/tabsAndBookmarks";

interface Props {
  chevronDown: boolean;
  setChevronDown: React.Dispatch<React.SetStateAction<boolean>>;
  bookmarksListVis: boolean;
  setBookmarksListVis: React.Dispatch<React.SetStateAction<boolean>>;
  setWasAnythingClicked: React.Dispatch<React.SetStateAction<boolean>>;
  bookmarksInputStr: string;
  setBookmarksInputStr: React.Dispatch<React.SetStateAction<string>>;
}

function EditTab_folder({
  chevronDown,
  setChevronDown,
  bookmarksListVis,
  setBookmarksListVis,
  setWasAnythingClicked,
  bookmarksInputStr,
  setBookmarksInputStr 
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
      setChevronDown(true);
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
        <input
          type="text"
          // min-w-0 !! ??
          className="border pl-px w-full"
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
            setChevronDown(false);
          }}
          placeholder={"Choose at least one"}
        />

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
        {chevronDown ? (
          <ChevronDownSVG
            className="h-full cursor-pointer hover:text-blueGray-500 transition-colors duration-75"
            onClick={() => {
              setChevronDown((b) => !b);
              setBookmarksListVis((b) => !b);
            }}
          />
        ) : (
          <ChevronUpSVG
            className="h-full cursor-pointer hover:text-blueGray-500 transition-colors duration-75"
            onClick={() => {
              setChevronDown((b) => !b);
              setBookmarksListVis((b) => !b);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default EditTab_folder;
