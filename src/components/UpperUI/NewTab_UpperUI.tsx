import React from "react";

import { useState, useEffect, useRef } from "react";

import { uiColorState } from "../../state/colorsState";

import { v4 as uuidv4 } from "uuid";
import { ReactComponent as SaveSVG } from "../../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";
import { ReactComponent as XsmallSVG } from "../../svgs/x-small.svg";
import { ReactComponent as ChevronDownSVG } from "../../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../../svgs/chevron-up.svg";

import {
  createFolderTab,
  createNote,
  createRSS,
} from "../../utils/objCreators";

import { handleKeyDown_inner } from "../../utils/func_handleKeyDown_inner";

import { produce } from "immer";

import { tabsDataState } from "../../state/tabsAndBookmarks";
import {
  bookmarksDataState,
  bookmarksAllTagsState,
} from "../../state/tabsAndBookmarks";

import { UpperVisAction } from "../../utils/interfaces";
import { tabErrors } from "../../utils/errors";

import SelectableList from "../Shared/SelectableList";

interface Props {
  // setNewTabVis: React.Dispatch<React.SetStateAction<boolean>>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  tabType: "folder" | "note" | "rss";
}

const errorsAllFalse = {
  bookmarksErrorVis: false,
  bookmarksRepeatErrorVis: false,
  titleFormatErrorVis: false,
  titleUniquenessErrorVis: false,
  bookmarkExistenceErrorVis: false,
  textAreaErrorVis: false,
};

function NewTab_UpperUI({ tabType, upperVisDispatch }: Props): JSX.Element {
  // console.log("rendered");

  const [tabsData, setTabsData] = tabsDataState.use();

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  const [
    bookmarksAllTagsData,
    setBookmarksAllTagsData,
  ] = bookmarksAllTagsState.use();

  const [uiColorData, setUiColorData] = uiColorState.use();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  let selectablesRef = useRef();

  const [tabTitleInput, setTabTitleInput] = useState<string>("");
  const [rssLinkInput, setRssLinkInput] = useState<string>("");

  const [tabColumnInput, setTabColumnInput] = useState<number>(1);
  // const [tabLinksInput, setTabBookmarksInput] = useState<string[]>([]);

  const [errors, setErrors] = useState({
    ...errorsAllFalse,
  });

  // const [bookmarksErrorVis, setBookmarksErrorVis] = useState<boolean>(false);
  // const [
  //   bookmarksRepeatErrorVis,
  //   setBookmarksRepeatErrorVis,
  // ] = useState<boolean>(false);
  // const [
  //   bookmarkExistenceErrorVis,
  //   setBookmarkExistenceErrorVis,
  // ] = useState<boolean>(false);

  // const [titleFormatErrorVis, setTitleFormatErrorVis] = useState<boolean>(
  //   false
  // );
  // const [
  //   titleUniquenessErrorVis,
  //   setTitleUniquenessErrorVis,
  // ] = useState<boolean>(false);
  // // for notes
  // const [textAreaErrorVis, setTextAreaErrorVis] = useState<boolean>(false);

  const [selectablesListVis, setSelectablesListVis] = useState<boolean>(false);

  const [visibleBookmarks, setVisibleBookmarks] = useState<string[]>(() =>
    makeInitialBookmarks()
  );

  const [selectablesInputStr, setSelectablesInputStr] = useState<string>("");

  // ^  and $ -> beginning and end of the text!
  // let regexForBookmarks = /^\w+(,\s\w+)*$/;
  // let regexForBookmarks = /^\w(\s?\w+)*(,\s\w(\s?\w+)*)*$/;
  let regexForBookmarks = /^\w(\s?\w+)*(,\s\w(\s?\w+)*)*,?$/;
  // let regexForTitle = /^\w+$/;
  let regexForTitle = /^\w(\s?\w+)*$/;

  const [textAreaValue, setTextAreaValue] = useState<string | null>("");

  const [initialBookmarks, setInitialBookmarks] = useState(() =>
    makeInitialBookmarks()
  );

  // XX tags won't be visible on first render even though visibleTags length won't be 0 (see useEffect)
  // XX

  useEffect(() => {
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

  function renderColsNumberControls() {
    const arrOfColsNumbers: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];

    let colsNumbering = {
      1: "I",
      2: "II",
      3: "III",
      4: "IV",
    };

    return arrOfColsNumbers.map((el, i) => {
      return (
        <div className="flex items-center ml-2 justify-end w-full" key={i}>
          <p className="mr-px">{colsNumbering[el]}</p>
          <div
            className={`h-4 w-4 ml-px mt-px cursor-pointer transition duration-75 border-2 border-${uiColorData} ${
              tabColumnInput === el
                ? `bg-${uiColorData} hover:bg-opacity-50`
                : `hover:bg-${uiColorData} hover:bg-opacity-50`
            } `}
            onClick={() => {
              setTabColumnInput(el);
              setSelectablesListVis(false);
            }}
          ></div>
        </div>
      );
    });
  }

  let bookmarksInputArr: string[] = selectablesInputStr.split(", ");

  let selectablesInputStr_noComma: string;
  
  if (selectablesInputStr[selectablesInputStr.length-1] === ",") {
    selectablesInputStr_noComma = selectablesInputStr.slice(0, selectablesInputStr.length-1)
    bookmarksInputArr = selectablesInputStr_noComma.split(", ");
  }
  

  function errorHandling(): boolean {
   

    if (!regexForTitle.test(tabTitleInput)) {
      // setTitleFormatErrorVis(true);
      setErrors({
        ...errorsAllFalse,
        titleFormatErrorVis: true,
      });
      setSelectablesListVis(false);
      return true;
    }

    if (!titleUniquenessCheck()) {
      // setTitleUniquenessErrorVis(true);
      setErrors({
        ...errorsAllFalse,
        titleUniquenessErrorVis: true,
      });
      setSelectablesListVis(false);
      return true;
    }

    if (tabType === "folder") {
      if (!regexForBookmarks.test(bookmarksInputArr.join(", "))) {
        // setBookmarksErrorVis(true);
        setErrors({
          ...errorsAllFalse,
          bookmarksErrorVis: true,
        });
        setSelectablesListVis(false);
        return true;
      }

      if (!bookmarkExistenceCheck()) {
        // setBookmarkExistenceErrorVis(true);
        setErrors({
          ...errorsAllFalse,
          bookmarkExistenceErrorVis: true,
        });
        setSelectablesListVis(false);
        return true;
      }

      if (!bookmarksUniquenessCheck()) {
        // setBookmarksRepeatErrorVis(true);
        setErrors({
          ...errorsAllFalse,
          bookmarksRepeatErrorVis: true,
        });
        setSelectablesListVis(false);
        return true;
      }
    }

    if (tabType === "note") {
      if ((textAreaValue as string).length === 0) {
        // setTextAreaErrorVis(true);
        setErrors({
          ...errorsAllFalse,
          textAreaErrorVis: true,
        });
        return true;
      }
    }

    return false;

    function bookmarkExistenceCheck() {
      let bookmarksArr: string[] = [];

      bookmarksData.forEach((obj) => {
        bookmarksArr.push(obj.title);
      });

      for (let el of bookmarksInputArr) {
        if (bookmarksArr.indexOf(el) === -1) {
          return false;
        }
      }

      return true;
    }

    function bookmarksUniquenessCheck() {
      let isUnique: boolean = true;

      bookmarksInputArr.forEach((el, i) => {
        let bookmarksInputCopy = [...bookmarksInputArr];
        bookmarksInputCopy.splice(i, 1);

        if (bookmarksInputCopy.indexOf(el) > -1) {
          isUnique = false;
          return;
        }
      });

      return isUnique;
    }

    function titleUniquenessCheck() {
      let isUnique: boolean = true;

      tabsData.forEach((obj, i) => {
        if (obj.title === tabTitleInput) {
          isUnique = false;
        }
      });

      return isUnique;
    }
  }

  function addTab() {
    let sortedTabsInCol = tabsData
      .filter((obj) => obj.column === tabColumnInput)
      .sort((a, b) => a.priority - b.priority);

    let newTabPriority: number = 0;

    if (sortedTabsInCol.length > 0) {
      newTabPriority = sortedTabsInCol[sortedTabsInCol.length - 1].priority + 1;
    }

    if (tabType === "note") {
      setTabsData((previous) =>
        produce(previous, (updated) => {
          updated.push({
            ...createNote(
              tabTitleInput,
              tabColumnInput,
              newTabPriority,
              textAreaValue
            ),
          });
        })
      );
    }

    if (tabType === "folder") {
      let newFolderTab = createFolderTab(
        tabTitleInput,
        tabColumnInput,
        newTabPriority
      );

      let newBookmarksAllTagsData = [...bookmarksAllTagsData];
      newBookmarksAllTagsData.push(newFolderTab.id);
      setBookmarksAllTagsData([...newBookmarksAllTagsData]);

      setTabsData((previous) =>
        produce(previous, (updated) => {
          updated.push(
            // ...createFolderTab(tabTitleInput, tabColumnInput, 0),
            newFolderTab
          );
        })
      );

      // updating links data (tags array)
      setBookmarksData((previous) =>
        produce(previous, (updated) => {
          updated.forEach((obj) => {
            if (
              bookmarksInputArr.indexOf(obj.title) > -1 &&
              obj.tags.indexOf(newFolderTab.id) === -1
            ) {
              obj.tags.push(newFolderTab.id);
            }
          });
        })
      );
    }

    if (tabType === "rss") {
      setTabsData((previous) =>
        produce(previous, (updated) => {
          updated.push({
            ...createRSS(
              tabTitleInput,
              tabColumnInput,
              newTabPriority,
              rssLinkInput
            ),
          });
        })
      );
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    handleKeyDown_inner(
      event,
      event.code,
      selectablesListVis,
      setSelectablesListVis,
      setSelectablesInputStr,
      selectablesRef,
      saveFunc,
      tabType === "folder" ? false : true
    );
  }

  function saveFunc() {

    let isThereAnError = errorHandling();
    if (isThereAnError) return;

    // 1. adding Tab(Folder/RSS?Notes) 2.updating Bookmarks with tags (same as new folder title)
    addTab();
    upperVisDispatch({ type: "NEW_TAB_TOGGLE" });
  }

  return (
    // opacity cannot be used, because children will inherit it and the text won't be readable
    <div
      className="flex z-50 fixed h-full w-screen items-center justify-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
      onClick={() => {
        upperVisDispatch({ type: "NEW_TAB_TOGGLE" });
      }}
    >
      <div
        className="bg-warmGray-100 pb-2 pt-3 pl-2 pr-0.5 border-2 border-teal-500 rounded-sm md:mb-48"
        style={{ width: "350px" }}
        onClick={(e) => {
          e.stopPropagation();
          return;
        }}
      >
        <p className="text-center">
          New{" "}
          {tabType === "folder"
            ? "folder"
            : tabType === "note"
            ? "note"
            : "RSS channel"}
        </p>
        <div className="flex justify-around mb-2 mt-3">
          <p
            className="flex-none"
            style={{ width: `${tabType === "folder" ? "87px" : "66px"}` }}
          >
            Title
          </p>
          {/* <div className="w-full pl-2"> */}
          <input
            type="text"
            className="w-full border pl-px"
            value={tabTitleInput}
            placeholder={
              tabType === "folder"
                ? "new folder title"
                : tabType === "note"
                ? "new note title"
                : "new RSS title"
            }
            onChange={(e) => {
              setTabTitleInput(e.target.value);
            }}
            onFocus={(e) => {
              setSelectablesListVis(false);
            }}
          />
          {/* </div> */}
          {/* <div className="w-5 h-5"> */}
          {/* <ChevronDownSVG className="h-full invisible" /> */}
          <div className="w-5 flex-none"></div>
          {/* </div> */}
          {/* <ChevronDownSVG className="h-6 invisible" /> */}
        </div>

        {tabType === "folder" && (
          <div className="flex justify-around mb-2 mt-2">
            <p className="flex-none" style={{ width: "87px" }}>
              Bookmarks
            </p>
            {/* <div className="w-full pl-2"> */}

            <div className="relative w-full">
              <div className="relative">
                <input
                  type="text"
                  className="w-full border pl-px pr-5"
                  // value={tabLinksInput.join(", ")}
                  value={selectablesInputStr}
                  //@ts-ignore
                  ref={selectablesRef}
                  onChange={(e) => {
                    if (!selectablesListVis) setSelectablesListVis(true);
                    let target = e.target.value;

                    setSelectablesInputStr(target);

         
                  }}
                  onFocus={(e) => {
                    setSelectablesListVis(true);
                  }}
                  // onBlur={}

                  placeholder={"Choose at least one"}
                />
                {selectablesInputStr.length !== 0 && (
                  <span
                    className="absolute h-4 bg-white z-50"
                    style={{ top: "7px", right: "2px" }}
                  >
                    <XsmallSVG
                      className="h-full text-gray-500 cursor-pointer hover:text-opacity-60"
                      onClick={() => setSelectablesInputStr("")}
                    />
                  </span>
                )}
              </div>

              {selectablesListVis && (
                <SelectableList
                  setSelectablesInputStr={setSelectablesInputStr}
                  selectablesInputStr={selectablesInputStr}
                  visibleSelectables={visibleBookmarks}
                  initialSelectables={initialBookmarks}
                  setSelectablesVis={setSelectablesListVis}
                  marginTop="0px"
                />
              )}
            </div>

            <div className="flex-none w-5 h-5 mt-1">
              {selectablesListVis ? (
                <ChevronUpSVG
                  className="h-full cursor-pointer hover:text-blueGray-500"
                  onClick={() => {
                    setSelectablesListVis((b) => !b);
                  }}
                />
              ) : (
                <ChevronDownSVG
                  className="h-full cursor-pointer hover:text-blueGray-500"
                  onClick={() => {
                    setSelectablesListVis((b) => !b);
                  }}
                />
              )}
            </div>
          </div>
        )}

        {tabType === "rss" && (
          <div className="flex justify-around mb-2 mt-2">
            <p className="flex-none" style={{ width: "66px" }}>
              RSS link
            </p>
            <div className="w-full">
              <input
                type="text"
                className="w-full border pl-px"
                value={rssLinkInput}
                placeholder="enter RSS link"
                onChange={(e) => setRssLinkInput(e.target.value)}
              />
            </div>
            {/* <div className="w-5 h-5 mt-1"> */}
            {/* <ChevronDownSVG className="h-full invisible" /> */}
            <div className="w-5 flex-none"></div>
            {/* </div> */}
          </div>
        )}

        <div className="flex justify-between mb-2 mt-2">
          <p className="w-32">Column</p>
          {/* <div className="w-full pl-2"> */}

          <div className="flex">
            {renderColsNumberControls()}
            {/* <div className="w-5 h-5"> */}
            {/* <ChevronDownSVG className="h-full invisible" /> */}
            <div className="w-5 flex-none"></div>
            {/* </div> */}
          </div>

          {/* </div> */}
        </div>

        {tabType === "note" && (
          <div>
            <textarea
              value={textAreaValue as string}
              className="h-full w-full overflow-visible pl-1 pr-1 border font-mono"
              rows={10}
              onChange={(e) => {
                setTextAreaValue(e.target.value);
              }}
            ></textarea>
          </div>
        )}

        {errors.titleFormatErrorVis && (
          <p className={`text-red-600`}>{tabErrors.titleFormat}</p>
        )}

        {errors.titleUniquenessErrorVis && (
          <p className={`text-red-600`}>{tabErrors.titleUniqueness}</p>
        )}

        {errors.bookmarksErrorVis && tabType === "folder" && (
          <p className={`text-red-600`}>{tabErrors.bookmarksFormat}</p>
        )}

        {errors.bookmarkExistenceErrorVis && tabType === "folder" && (
          <p className={`text-red-600`}>{tabErrors.bookmarkExistence}</p>
        )}

        {errors.bookmarksRepeatErrorVis && tabType === "folder" && (
          <p className={`text-red-600`}>{tabErrors.bookmarksRepeat}</p>
        )}

        {errors.textAreaErrorVis && tabType === "note" && (
          <p className={`text-red-600`}>{tabErrors.textArea}</p>
        )}

        {/* !!! pl-4 in NewLink */}
        <div className="w-full flex justify-center mt-4">
          <SaveSVG
            className="h-5 w-5 fill-current text-black mr-6 hover:text-green-600 cursor-pointer transition-colors duration-75"
            onClick={(e) => {
              e.preventDefault();

              saveFunc()



       
            }}
          />

          <CancelSVG
            className="h-5 w-5 fill-current text-black hover:text-red-600 cursor-pointer transition-colors duration-75"
            onClick={(e) => {
              e.preventDefault();
              // setNewTabVis((b) => !b);
              upperVisDispatch({ type: "NEW_TAB_TOGGLE" });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default NewTab_UpperUI;
