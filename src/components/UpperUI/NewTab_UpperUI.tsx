import React from "react";

import { useState, useEffect } from "react";

import { uiColorState } from "../../state/colorsState";

import { v4 as uuidv4 } from "uuid";
import { ReactComponent as SaveSVG } from "../../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";
import { ReactComponent as ChevronDownSVG } from "../../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../../svgs/chevron-up.svg";

import {
  createFolderTab,
  createNote,
  createRSS,
} from "../../utils/objCreators";

import { produce } from "immer";

import { tabsDataState } from "../../state/tabsAndBookmarks";
import {
  bookmarksDataState,
  bookmarksAllTagsState,
} from "../../state/tabsAndBookmarks";

import { UpperVisAction } from "../../utils/interfaces";
import SelectableList from "../Shared/SelectableList";

interface Props {
  // setNewTabVis: React.Dispatch<React.SetStateAction<boolean>>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  tabType: "folder" | "note" | "rss";
}

function NewTab_UpperUI({ tabType, upperVisDispatch }: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  const [
    bookmarksAllTagsData,
    setBookmarksAllTagsData,
  ] = bookmarksAllTagsState.use();

  const [uiColorData, setUiColorData] = uiColorState.use();

  const [tabTitleInput, setTabTitleInput] = useState<string>("");
  const [rssLinkInput, setRssLinkInput] = useState<string>("");

  const [tabColumnInput, setTabColumnInput] = useState<number>(1);
  // const [tabLinksInput, setTabBookmarksInput] = useState<string[]>([]);

  const [tabsErrorVis, setTabsErrorVis] = useState<boolean>(false);
  const [tabsRepeatErrorVis, setTabsRepeatErrorVis] = useState<boolean>(false);
  const [tabsExistenceErrorVis, setTabsExistenceErrorVis] = useState<boolean>(
    false
  );

  const [titleFormatErrorVis, setTitleFormatErrorVis] = useState<boolean>(
    false
  );
  const [
    titleUniquenessErrorVis,
    setTitleUniquenessErrorVis,
  ] = useState<boolean>(false);
  // for notes
  const [textAreaErrorVis, setTextAreaErrorVis] = useState<boolean>(false);

  const [bookmarksListVis, setBookmarksListVis] = useState<boolean>(false);

  const [visibleBookmarks, setVisibleBookmarks] = useState<string[]>(
    makeInitialBookmarks()
  );

  const [bookmarksInputStr, setBookmarksInputStr] = useState<string>("");

  // ^  and $ -> beginning and end of the text!
  // let regexForBookmarks = /^\w+(,\s\w+)*$/;
  let regexForBookmarks = /^\w(\s?\w+)*(,\s\w(\s?\w+)*)*$/;
  // let regexForTitle = /^\w+$/;
  let regexForTitle = /^\w(\s?\w+)*$/;

  const [textAreaValue, setTextAreaValue] = useState<string | null>("");

  const [chevronDown, setChevronDown] = useState(true);

  const [initialBookmarks, setInitialBookmarks] = useState(
    makeInitialBookmarks()
  );

  // XX tags won't be visible on first render even though visibleTags length won't be 0 (see useEffect)
  // XX

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

    // if (newVisibleBookmarks.length > 0 && !isThisTheFirstRender) {
    //   setBookmarksListVis(true);
    // }

    // setIsThisTheFirstRender(false);
  }, [
    bookmarksInputStr,
    initialBookmarks,
    setVisibleBookmarks,
    setBookmarksListVis,
    // isThisTheFirstRender,
  ]);

  function makeInitialBookmarks(): string[] {
    let tabs: string[] = [];

    bookmarksData.forEach((obj) => {
      tabs.push(obj.title);
    });

    return tabs;
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
            className={`h-4 w-4 ml-px mt-px cursor-pointer border-2 border-${uiColorData} ${
              tabColumnInput === el
                ? `bg-${uiColorData} hover:bg-opacity-50`
                : `hover:bg-${uiColorData} hover:bg-opacity-50`
            } `}
            onClick={() => {
              setTabColumnInput(el);
              setBookmarksListVis(false);
              setChevronDown(true);
            }}
        
          ></div>
        </div>
      );
    });
  }

  return (
    // opacity cannot be used, because children will inherit it and the text won't be readable
    <div
      className="flex z-50 absolute h-screen w-screen items-center justify-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
    >
      <div
        className="bg-gray-200 pb-2 pt-6 pl-2 pr-1 border-2 border-teal-500 rounded-sm md:mb-48"
        style={{ width: "350px" }}
      >
        <div className="flex justify-around mb-2 mt-2">
          <p className="w-32">Title</p>
          {/* <div className="w-full pl-2"> */}
          <input
            type="text"
            className="w-full border border-gray-500 pl-px"
            value={tabTitleInput}
            placeholder={
              // tabType === "folder"
              //   ? "new folder title"
              //   : "new note title"
              tabType === "folder"
                ? "new folder title"
                : tabType === "note"
                ? "new note title"
                : "new RSS title"
            }
            onChange={(e) => setTabTitleInput(e.target.value)}
            onFocus={
              (e) => {
               setBookmarksListVis(false)
               setChevronDown(true);
              }
            }
          />
          {/* </div> */}
          <div className="w-5 h-5">
            <ChevronDownSVG className="h-full invisible" />
          </div>
          {/* <ChevronDownSVG className="h-6 invisible" /> */}
        </div>

        {tabType === "folder" && (
          <div className="flex justify-around mb-2 mt-2">
            <p className="w-32">Bookmarks</p>
            {/* <div className="w-full pl-2"> */}
            <input
              type="text"
              className="w-full border border-gray-500 pl-px"
              // value={tabLinksInput.join(", ")}
              value={bookmarksInputStr}
              // onChange={(e) =>
              //   setTabLinksInput([...e.target.value.split(", ")])
              // }

              onChange={(e) => {
                let target = e.target.value;

                setBookmarksInputStr(target);

                let tabsInputArr = target.split(", ");

                // setTagsInputArr(tagsInputStr.split(" ,"))

                // let newVisibleTags = [...visibleTags];
                let newVisibleTabs: string[] = [];

                visibleBookmarks.forEach((el) => {
                  if (tabsInputArr.indexOf(el) === -1) {
                    newVisibleTabs.push(el);
                  }
                });

                setVisibleBookmarks([...newVisibleTabs]);
              }}

              onFocus={
                (e) => {
                 setBookmarksListVis(true)
                 setChevronDown(false);
                }
              }

            

              // onBlur={}

              placeholder={"Choose at least one"}
            />
            {/* </div> */}
            {chevronDown ? (
              <div className="w-5 h-5 mt-1">
                <ChevronDownSVG
                  className="h-full cursor-pointer hover:text-blueGray-500"
                  onClick={() => {
                    setChevronDown((b) => !b);
                    setBookmarksListVis((b) => !b);
                  }}
                />
              </div>
            ) : (
              <div className="w-5 h-5 mt-1">
                <ChevronUpSVG
                  className="h-full cursor-pointer hover:text-blueGray-500"
                  onClick={() => {
                    setChevronDown((b) => !b);
                    setBookmarksListVis((b) => !b);
                  }}
                />
              </div>
            )}
          </div>
        )}

        {tabType === "rss" && (
          <div className="flex justify-around mb-2 mt-2">
            <p className="w-32">RSS link</p>
            <div className="w-full">
              <input
                type="text"
                className="w-full border border-gray-500 pl-px"
                value={rssLinkInput}
                placeholder="enter RSS link"
                onChange={(e) => setRssLinkInput(e.target.value)}
              />
            </div>
            <div className="w-5 h-5 mt-1">
              <ChevronDownSVG className="h-full invisible" />
            </div>
          </div>
        )}

        <div className="flex justify-between mb-2 mt-2">
          <p className="w-32">Column</p>
          {/* <div className="w-full pl-2"> */}

          <div className="flex">
            {renderColsNumberControls()}
            <div className="w-5 h-5">
              <ChevronDownSVG className="h-full invisible" />
            </div>
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

        {bookmarksListVis && (
          <SelectableList
            setSelectablesInputStr={setBookmarksInputStr}
            selectablesInputStr={bookmarksInputStr}
            visibleSelectables={visibleBookmarks}
            width="228px"
            marginLeft="89px"
          />
        )}

        {titleFormatErrorVis && (
          <p className={`text-red-600`}>
            Folder title can contain letters, numbers or underscore
          </p>
        )}

        {titleUniquenessErrorVis && (
          <p className={`text-red-600`}>
            Folder with that title already exists
          </p>
        )}

        {tabsErrorVis && tabType === "folder" && (
          <p className={`text-red-600`}>
            Tabs should consist of words separated by coma and space
          </p>
        )}

        {tabsExistenceErrorVis && tabType === "folder" && (
          <p className={`text-red-600`}>
            You can choose from existing tabs only
          </p>
        )}

        {tabsRepeatErrorVis && tabType === "folder" && (
          <p className={`text-red-600`}>Each tab should be unique</p>
        )}

        {textAreaErrorVis && tabType === "note" && (
          <p className={`text-red-600`}>Note cannot be empty</p>
        )}

        <div className="flex justify-start mt-6">
          <p className="w-8"></p>
          {/* !!! pl-4 in NewLink */}
          <div className="w-full flex justify-center">
            <SaveSVG
              className="h-5 fill-current text-black mr-3 hover:text-green-600 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();

                // if(tagsInput.join(", "))

                setTabsErrorVis(false);
                setTabsRepeatErrorVis(false);
                setTitleFormatErrorVis(false);
                setTitleUniquenessErrorVis(false);
                setTabsExistenceErrorVis(false);
                setTextAreaErrorVis(false);

                let bookmarksInputArr = bookmarksInputStr.split(", ");

                if (!regexForTitle.test(tabTitleInput)) {
                  setTitleFormatErrorVis(true);

                  return;
                }

                if (!titleUniquenessCheck()) {
                  setTitleUniquenessErrorVis(true);
                  return;
                }

                if (tabType === "folder") {
                  // if (!regexForTabs.test(tabBookmarksInput.join(", "))) {
                  if (!regexForBookmarks.test(bookmarksInputArr.join(", "))) {
                    setTabsErrorVis(true);
                    return;
                  }

                  if (!tabExistenceCheck()) {
                    setTabsExistenceErrorVis(true);
                    return;
                  }

                  if (!tagUniquenessCheck()) {
                    setTabsRepeatErrorVis(true);
                    return;
                  }
                }

                if (tabType === "note") {
                  if ((textAreaValue as string).length === 0) {
                    setTextAreaErrorVis(true);
                    return;
                  }
                }

                let sortedTabsInCol = tabsData
                  .filter((obj) => obj.column === tabColumnInput)
                  .sort((a, b) => a.priority - b.priority);

                let newTabPriority =
                  sortedTabsInCol[sortedTabsInCol.length - 1].priority + 1;

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

                // setNewTabVis((b) => !b);
                upperVisDispatch({ type: "NEW_TAB_TOGGLE" });

                function tabExistenceCheck() {
                  let tabsArr: string[] = [];

                  bookmarksData.forEach((obj) => {
                    tabsArr.push(obj.title);
                  });

                  for (let el of bookmarksInputArr) {
                    if (tabsArr.indexOf(el) === -1) {
                      return false;
                    }
                  }

                  return true;
                }

                function tagUniquenessCheck() {
                  let isUnique: boolean = true;

                  bookmarksInputArr.forEach((el, i) => {
                    let tagsInputCopy = [...bookmarksInputArr];
                    tagsInputCopy.splice(i, 1);

                    if (tagsInputCopy.indexOf(el) > -1) {
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
              }}
            />

            <CancelSVG
              className="h-5 fill-current text-black ml-3 hover:text-red-600 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                // setNewTabVis((b) => !b);
                upperVisDispatch({ type: "NEW_TAB_TOGGLE" });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTab_UpperUI;
