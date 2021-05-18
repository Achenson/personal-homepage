import React, { useState, useEffect, useRef } from "react";

import SelectableList from "../Shared/SelectableList";

import { ReactComponent as ChevronDownSVG } from "../../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../../svgs/chevron-up.svg";
import { ReactComponent as XsmallSVG } from "../../svgs/x-small.svg";

import { bookmarksDataState } from "../../state/tabsAndBookmarks";

import { handleKeyDown_inner } from "../../utils/func_handleKeyDown_inner";

interface Props {
  selectablesListVis: boolean;
  setSelectablesListVis: React.Dispatch<React.SetStateAction<boolean>>;
  setWasAnythingClicked: React.Dispatch<React.SetStateAction<boolean>>;
  selectablesInputStr: string;
  setSelectablesInputStr: React.Dispatch<React.SetStateAction<string>>;
  saveFunc: () => void;
}

function EditTab_folder({
  selectablesListVis,
  setSelectablesListVis,
  setWasAnythingClicked,
  selectablesInputStr,
  setSelectablesInputStr,
  saveFunc,
}: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  let selectablesRef = useRef();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const [initialBookmarks, setInitialBookmarks] = useState(() =>
    makeInitialBookmarks()
  );

  const [visibleBookmarks, setVisibleBookmarks] = useState<string[]>(() =>
    makeInitialBookmarks()
  );

  useEffect(() => {
    // let newVisibleBookmarks: string[] = [];

    // initialBookmarks.forEach((el) => {
    //   // in new RegExp the \ needs to be escaped!
    //   let tagRegex = new RegExp(`\\b${el}\\b`);

    //   if (!tagRegex.test(selectablesInputStr)) {
    //     newVisibleBookmarks.push(el);
    //   }
    // });

    // setVisibleBookmarks([...newVisibleBookmarks]);

    // if (newVisibleBookmarks.length === 0) {
    //   setSelectablesListVis(false);
    // }
    let newVisibleBookmarks: string[] = [];

    let selectablesInputArr = selectablesInputStr.split(", ");

    let lastSelectablesArrEl =
      selectablesInputArr[selectablesInputArr.length - 1];

    function letterToLetterMatch(lastInput: string, el: string) {
      for (let i = 0; i < lastInput.length; i++) {
        if (
          lastInput[i] !== el[i] &&
          // returns true if lastInput is present in initial bookmarks
          initialBookmarks.indexOf(lastInput) === -1 &&
          // returns true is last char is a comma
          selectablesInputStr[selectablesInputStr.length - 1] !== ","
        ) {
          return false;
        }
      }
      return true;
    }

    initialBookmarks.forEach((el) => {
      // in new RegExp the \ needs to be escaped!
      // \b -> word boundary
      let tagRegex = new RegExp(`\\b${el}\\b`);

      // a selectable is visible only if the input does not contain it
      if (
        !tagRegex.test(selectablesInputStr) &&
        (letterToLetterMatch(lastSelectablesArrEl, el) ||
          selectablesInputStr.length === 0)
      ) {
        newVisibleBookmarks.push(el);
      }
    });

    setVisibleBookmarks([...newVisibleBookmarks]);

    if (newVisibleBookmarks.length === 0) {
      setSelectablesListVis(false);
    }
  }, [
    selectablesInputStr,
    initialBookmarks,
    setVisibleBookmarks,
    setSelectablesListVis,
  ]);

  function makeInitialBookmarks(): string[] {
    let bookmarks: string[] = [];

    bookmarksData.forEach((obj) => {
      bookmarks.push(obj.title);
    });

    return bookmarks;
  }

  function handleKeyDown(event: KeyboardEvent) {
    handleKeyDown_inner(
      event,
      event.code,
      selectablesListVis,
      setSelectablesListVis,
      setSelectablesInputStr,
      selectablesRef,
      saveFunc
    );
  }

  return (
    /* bookmarks not visible for tab with ALL Bookmarks */

    <div className="flex items-center mt-2 justify-between">
      <p className={`flex-none`} style={{ width: "87px" }}>
        Bookmarks
      </p>
      <div className="relative w-full">
        <div className="relative">
          <input
            type="text"
            // min-w-0 !! ??
            className="border pl-px w-full pr-5"
            //@ts-ignore
            ref={selectablesRef}
            value={selectablesInputStr}
            onChange={(e) => {
              // setTabTitleInput(e.target.value);
              setWasAnythingClicked(true);

              let target = e.target.value;

              setSelectablesInputStr(target);

              // let bookmarksInputArr = target.split(", ");
              // let newVisibleBookmarks: string[] = [];

              // visibleBookmarks.forEach((el) => {
              //   if (bookmarksInputArr.indexOf(el) === -1) {
              //     newVisibleBookmarks.push(el);
              //   }
              // });

              // setVisibleBookmarks([...newVisibleBookmarks]);
            }}
            onFocus={(e) => {
              setSelectablesListVis(true);
            }}
            placeholder={"Choose at least one"}
          />
          {selectablesInputStr.length !== 0 && (
            <span
              className="absolute h-4 bg-white z-50"
              style={{ top: "7px", right: "2px" }}
            >
              <XsmallSVG
                className="h-full text-gray-500 cursor-pointer hover:text-opacity-60"
                onClick={() => {
                  setSelectablesInputStr("");
                  setWasAnythingClicked(true);
                }}
              />
            </span>
          )}
        </div>

        {selectablesListVis && (
          <SelectableList
            setSelectablesInputStr={setSelectablesInputStr}
            selectablesInputStr={selectablesInputStr}
            visibleSelectables={visibleBookmarks}
            setSelectablesVis={setSelectablesListVis}
            initialSelectables={initialBookmarks}
            marginTop="0px"
            // setWasAnythingClicked
            setWasAnythingClicked={setWasAnythingClicked}
          />
        )}
      </div>

      <div
        style={{ height: "18px", width: "18px" }}
        className=" mt-0.5 flex-none -mr-1"
      >
        {selectablesListVis ? (
          <ChevronUpSVG
            className="h-full cursor-pointer hover:text-blueGray-500 transition-colors duration-75"
            onClick={() => {
              setSelectablesListVis((b) => !b);
            }}
          />
        ) : (
          <ChevronDownSVG
            className="h-full cursor-pointer hover:text-blueGray-500 transition-colors duration-75"
            onClick={() => {
              setSelectablesListVis((b) => !b);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default EditTab_folder;
