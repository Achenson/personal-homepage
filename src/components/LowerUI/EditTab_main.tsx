import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

import { ReactComponent as SaveSVG } from "../../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { ReactComponent as TrashSVG } from "../../svgs/trash.svg";
import { ReactComponent as LockClosedSVG } from "../../svgs/lock-closed.svg";
import { ReactComponent as LockOpenSVG } from "../../svgs/lock-open.svg";
import { ReactComponent as ChevronDownSVG } from "../../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../../svgs/chevron-up.svg";

import { produce } from "immer";

import {
  tabsDataState,
  bookmarksDataState,
} from "../../state/tabsAndBookmarks";

import { rssSettingsState } from "../../state/defaultSettings";

import { SingleTabData, TabVisAction } from "../../utils/interfaces";
import { tabErrors } from "../../utils/errors";
import EditTab_folder from "./EditTab_folder";
import EditTab_notes from "./EditTab_notes";
import EditTab_RSS from "./EditTab_RSS";

interface Props {
  tabType: "folder" | "note" | "rss";
  // setEditTabVis: React.Dispatch<React.SetStateAction<boolean>>;
  visDispatch: React.Dispatch<TabVisAction>;
  // noteInput: string | null;
  tabID: string | number;
  currentTab: SingleTabData;
  top: number;
  left: number;
  tabWidth: number;
  setTabOpened_local: React.Dispatch<React.SetStateAction<boolean>>;
}

const errorsAllFalse = {
  bookmarksErrorVis: false,
  bookmarksRepeatErrorVis: false,
  titleFormatErrorVis: false,
  titleUniquenessErrorVis: false,
  bookmarkExistenceErrorVis: false,
  textAreaErrorVis: false,
  noDeletionErrorVis: false,
  invalidLinkErrorVis: false,
};

function EditTab({
  tabID,
  visDispatch,
  tabType,
  currentTab,
  top,
  left,
  tabWidth,
  setTabOpened_local,
}: // setEditTabVis,
// noteInput,
Props): JSX.Element {
  // const [deletedTab, setDeletedTab] = deletedTabState.use();

  const [tabsData, setTabsData] = tabsDataState.use();

  const [rssSettingsData, setRssSettingsData] = rssSettingsState.use();

  let firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstFieldRef.current !== null) {
      firstFieldRef.current.focus();
    }
  }, []);

  // let currentTab = tabsData.find((obj) => obj.id === tabID);
  let tabTitle = currentTab.title;

  let rssLink: string | null | undefined = "no bookmark";
  // let rssLink;

  if (tabType === "rss") {
    rssLink = currentTab.rssLink;
  }

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  // for note only
  const [textAreaValue, setTextAreaValue] = useState<string | null>(
    currentTab.noteInput as string | null
  );

  const [tabTitleInput, setTabTitleInput] = useState<string>(
    tabTitle as string
  );

  const [rssLinkInput, setRssLinkInput] = useState<string>(rssLink as string);

  const [descriptionCheckbox, setDescriptionCheckbox] = useState(() => {
    if (typeof currentTab.description === "boolean") {
      return currentTab.description;
    }

    return rssSettingsData.description;
  });
  const [dateCheckbox, setDateCheckbox] = useState(() => {
    if (typeof currentTab.date === "boolean") {
      return currentTab.date;
    }
    return rssSettingsData.date;
  });

  // checkboxes won't be saved on Save if there were not manipulated
  //  (so they will still respond to changing default setting (they will have null as a property))
  const [wasCheckboxClicked, setWasCheckboxClicked] = useState(false);

  const [rssItemsPerPage, setRssItemsPerPage] = useState(() => {
    if (typeof currentTab.itemsPerPage === "number") {
      return currentTab.itemsPerPage;
    }
    return rssSettingsData.itemsPerPage;
  });

  // items per page won't be saved on Save if there were not manipulated
  const [wasItemsPerPageClicked, setWasItemsPerPageClicked] = useState(false);

  const [wasTabOpenClicked, setWasTabOpenClicked] = useState(false);

  // for disabling save btn
  const [wasAnythingClicked, setWasAnythingClicked] = useState(false);

  const [arrOfBookmarksNames, setArrayOfBookmarksNames] = useState<string[]>(
    () => {
      return calcArrOfBookmarksNames();
    }
  );

  function calcArrOfBookmarksNames() {
    // filtered lknks
    let filteredBookmarks = bookmarksData.filter(
      (obj) => obj.tags.indexOf(currentTab.id) > -1
    );

    let arrOfBookmarksNames: string[] = [];

    filteredBookmarks.forEach((obj) => {
      arrOfBookmarksNames.push(obj.title);
    });

    return arrOfBookmarksNames;
  }

  const [selectablesInputStr, setSelectablesInputStr] = useState<string>(
    arrOfBookmarksNames.join(", ")
  );

  useEffect(() => {
    if (wasCheckboxClicked || wasTabOpenClicked || wasItemsPerPageClicked) {
      setWasAnythingClicked(true);
    }
  }, [wasCheckboxClicked, wasTabOpenClicked, wasItemsPerPageClicked]);

  const [errors, setErrors] = useState({
    ...errorsAllFalse,
  });

  // let regexForTitle = /^\w+$/;
  let regexForTitle = /^\w(\s?\w+)*$/;

  const [tabOpen, setTabOpen] = useState(currentTab.openedByDefault);

  const [selectablesListVis, setSelectablesListVis] = useState<boolean>(false);

  // ^  and $ -> beginning and end of the text!
  // let regexForTabs = /^\w+(,\s\w+)*$/;
  // let regexForBookmarks = /^\w(\s?\w+)*(,\s\w(\s?\w+)*)*$/;
  let regexForBookmarks = /^\w(\s?\w+)*(,\s\w(\s?\w+)*)*,?$/;
  // https://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript
  const regexForLink =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  function titleWidth() {
    if (tabType === "note" || tabID === "ALL_TAGS") {
      // return "mr-2";
      return "40px";
    }
    // if (tabType === "rss") return "mr-9";
    if (tabType === "rss") return "65px";
    // if (tabType === "folder") return "mr-14";
    if (tabType === "folder") return "87px";
  }

  // let bookmarksInputArr = selectablesInputStr.split(", ");

  let bookmarksInputArr: string[] = selectablesInputStr.split(", ");

  let selectablesInputStr_noComma: string;

  if (selectablesInputStr[selectablesInputStr.length - 1] === ",") {
    selectablesInputStr_noComma = selectablesInputStr.slice(
      0,
      selectablesInputStr.length - 1
    );
    bookmarksInputArr = selectablesInputStr_noComma.split(", ");
  }

  function errorHandling(): boolean {
    setWasCheckboxClicked(false);
    setWasItemsPerPageClicked(false);

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

    if (tabType === "rss") {
      if (!regexForLink.test(rssLinkInput)) {
        setErrors({
          ...errorsAllFalse,
          invalidLinkErrorVis: true,
        });
        return true;
      }
    }

    if (tabType === "folder") {
      if (!regexForBookmarks.test(selectablesInputStr)) {
        // setBookmarksErrorVis(true);
        setErrors({
          ...errorsAllFalse,
          bookmarksErrorVis: true,
        });
        setSelectablesListVis(false);
        return true;
      }

      if (!bookmarkExistenceCheck()) {
        // setBookmarksExistenceErrorVis(true);
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

    function titleUniquenessCheck() {
      let isUnique: boolean = true;

      tabsData.forEach((obj, i) => {
        // diff than NewTab_UpperUI
        if (obj.title === tabTitleInput && obj.id !== tabID) {
          isUnique = false;
        }
      });

      return isUnique;
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
  }

  function editTab() {
    setTabsData((previous) =>
      produce(previous, (updated) => {
        let tabToUpdate = updated.find((obj) => obj.id === tabID);

        if (tabToUpdate) {
          tabToUpdate.title = tabTitleInput;
          // updated[tabIndex].deletable = currentTab[0].deletable
          if (wasTabOpenClicked) {
            tabToUpdate.openedByDefault = tabOpen;
            setTabOpened_local(tabOpen);
            tabToUpdate.opened = tabOpen;
          }

          if (tabType === "note") {
            tabToUpdate.noteInput = textAreaValue;
          }
          if (tabType === "rss") {
            tabToUpdate.rssLink = rssLinkInput;

            if (wasCheckboxClicked) {
              tabToUpdate.date = dateCheckbox;
            }

            if (wasCheckboxClicked) {
              tabToUpdate.description = descriptionCheckbox;
            }

            if (wasItemsPerPageClicked) {
              tabToUpdate.itemsPerPage = rssItemsPerPage;
            }
          }
        }
      })
    );

    if (tabType === "folder") {
      // changing tags in bookmarks
      setBookmarksData((previous) =>
        produce(previous, (updated) => {
          updated.forEach((obj) => {
            // let bookmarksInputArr = selectablesInputStr.split(", ");

            // make array of missing bookmarks
            let missingBookmarks: string[] = [];

            arrOfBookmarksNames.forEach((el, i) => {
              if (bookmarksInputArr.indexOf(el) === -1) {
                missingBookmarks.push(el);
              }
            });

            // if this bookmarks' title is inside missing bookmarks
            // cut out tabID (current folder) from tags
            if (missingBookmarks.indexOf(obj.title) > -1) {
              obj.tags.splice(obj.tags.indexOf(tabID), 1);
            }

            //  if link title is present in folder's new input for tags & if folder title wasn't already in tags
            // add new tag
            if (
              bookmarksInputArr.indexOf(obj.title) > -1 &&
              obj.tags.indexOf(tabID) === -1
            ) {
              obj.tags.push(tabID);
            }
          });
        })
      );
    }
  }

  function saveFunc() {
    if (!wasAnythingClicked) {
      return;
    }

    let isThereAnError = errorHandling();
    if (isThereAnError) return;

    // 1.edit tab(folder,rss or note)
    // 2. (in case of folders) delete tag from bookmark or add tag to bookmark
    editTab();

    // if (tabOpen) {
    //   visDispatch({ type: "TAB_CONTENT_OPEN_AFTER_LOCKING" });
    // } else {
    //    visDispatch({ type: "EDIT_TOGGLE" });
    //   }

    visDispatch({ type: "EDIT_TOGGLE" });
  }

  return (
    <div
      className={`absolute w-full z-40 bg-gray-100 pb-2 border border-blueGray-303 pl-1 pr-1 shadow-md`}
      // style={{
      //   top: `${top + 32 + document.documentElement.scrollTop}px`,
      //   left: `${left}px`,
      //   width: `${tabWidth}px`,
      // }}
    >
      <div className="mb-3">
        <div className={`flex items-center mt-2 justify-between`}>
          <p className="flex-none" style={{ width: `${titleWidth()}` }}>
            Title
          </p>
          <input
            type="text"
            ref={firstFieldRef}
            // min-w-0 !!
            className="border w-full max-w-6xl pl-px input-focus"
            value={tabTitleInput}
            onChange={(e) => {
              setTabTitleInput(e.target.value);
              setWasAnythingClicked(true);
            }}
            onFocus={(e) => {
              setSelectablesListVis(false);
            }}
          />
          {tabType === "folder" && tabID !== "ALL_TAGS" && (
            <div
              style={{ height: "18px", width: "18px" }}
              className="flex-none -mr-1"
            ></div>
          )}
        </div>

        {tabType === "folder" && tabID !== "ALL_TAGS" && (
          <EditTab_folder
            selectablesListVis={selectablesListVis}
            setSelectablesListVis={setSelectablesListVis}
            setWasAnythingClicked={setWasAnythingClicked}
            selectablesInputStr={selectablesInputStr}
            setSelectablesInputStr={setSelectablesInputStr}
            saveFunc={saveFunc}
          />
        )}

        {tabType === "note" && (
          <EditTab_notes
            textAreaValue={textAreaValue}
            setTextAreaValue={setTextAreaValue}
            setWasAnythingClicked={setWasAnythingClicked}
          />
        )}

        {tabType === "rss" && (
          <EditTab_RSS
            dateCheckbox={dateCheckbox}
            descriptionCheckbox={descriptionCheckbox}
            rssItemsPerPage={rssItemsPerPage}
            setDateCheckbox={setDateCheckbox}
            setDescriptionCheckbox={setDescriptionCheckbox}
            setRssItemsPerPage={setRssItemsPerPage}
            setWasAnythingClicked={setWasAnythingClicked}
            setWasCheckboxClicked={setWasCheckboxClicked}
            setWasItemsPerPageClicked={setWasItemsPerPageClicked}
            setWasTabOpenClicked={setWasTabOpenClicked}
            tabID={tabID}
            rssLinkInput={rssLinkInput}
            setRssLinkInput={setRssLinkInput}
          />
        )}

        {errors.titleFormatErrorVis && (
          <p className={`text-red-600 mt-1 -mb-2`}>{tabErrors.titleFormat}</p>
        )}

        {errors.titleUniquenessErrorVis && (
          <p className={`text-red-600 mt-1 -mb-2`}>
            {tabErrors.titleUniqueness}
          </p>
        )}

        {errors.textAreaErrorVis && tabType === "note" && (
          <p className={`text-red-600 mt-1 -mb-2`}>{tabErrors.textArea}</p>
        )}

        {errors.bookmarksErrorVis && tabType === "folder" && (
          <p className={`text-red-600 mt-1 -mb-2`}>
            {tabErrors.bookmarksFormat}
          </p>
        )}

        {errors.bookmarkExistenceErrorVis && tabType === "folder" && (
          <p className={`text-red-600 mt-1 -mb-2`}>
            {tabErrors.bookmarkExistence}
          </p>
        )}

        {errors.bookmarksRepeatErrorVis && tabType === "folder" && (
          <p className={`text-red-600 mt-1 -mb-2`}>
            {tabErrors.bookmarksRepeat}
          </p>
        )}

        {errors.noDeletionErrorVis && (
          <p className={`text-red-600 mt-1 -mb-2`}>{tabErrors.noDeletion}</p>
        )}

        {errors.invalidLinkErrorVis && tabType === "rss" && (
          <p className={`text-red-600 mt-1 -mb-2`}>
            {tabErrors.invalidLinkError}
          </p>
        )}
      </div>

      <div className={`pt-2`} style={{ borderTop: "solid lightGray 1px" }}>
        <div className="flex justify-between items-center">
          <p>Lock as opened by default</p>

          {tabOpen ? (
            <button
              className="h-6 w-6 focus:outline-none focus:ring-2 focus:ring-blueGray-300"
              onClick={() => {
                setTabOpen((b) => !b);
                setWasTabOpenClicked(true);
                setSelectablesListVis(false);
              }}
            >
              <LockClosedSVG className="text-gray-700 transition-colors duration-75 hover:text-black cursor-pointer" />
            </button>
          ) : (
            <button
              className="h-6 w-6 focus:outline-none focus:ring-2 focus:ring-blueGray-300"
              onClick={() => {
                setTabOpen((b) => !b);
                setWasTabOpenClicked(true);
                setSelectablesListVis(false);
              }}
            >
              <LockOpenSVG className="h-6 w-6 text-gray-700 transition-colors duration-75 hover:text-black cursor-pointer" />
            </button>
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <p>Delete</p>

          <button
            className="h-6 w-6 focus:outline-none focus:ring-2 focus:ring-blueGray-300"
            onClick={() => {
              if (!currentTab.deletable) {
                // setNoDeletionErrorVis(true);
                setErrors({
                  ...errorsAllFalse,
                  noDeletionErrorVis: true,
                });
                return;
              }

              // setDeletedTab(tabID);

              setTabsData((previous) =>
                produce(previous, (updated) => {
                  let tabToDelete = updated.find((obj) => obj.id == tabID);
                  if (tabToDelete) {
                    let tabIndex = updated.indexOf(tabToDelete);
                    updated.splice(tabIndex, 1);
                  }
                })
              );

              // setEditTabVis((b) => !b);
              visDispatch({ type: "EDIT_TOGGLE" });
              // removing deleted tab(tag) for bookmarks
              bookmarksData.forEach((obj, i) => {
                if (obj.tags.indexOf(tabTitle as string) > -1) {
                  setBookmarksData((previous) =>
                    produce(previous, (updated) => {
                      updated[i].tags.splice(
                        obj.tags.indexOf(tabTitle as string),
                        1
                      );
                    })
                  );
                }
              });
            }}
          >
            <TrashSVG className="h-6 w-6 text-gray-500 transition-colors duration-75 hover:text-black cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center mt-2">
        <button
          className="h-5 w-5 mr-6 btn-focus"
          onClick={(e) => {
            e.preventDefault();

            saveFunc();
          }}
        >
          <SaveSVG
            className={`h-5 w-5 fill-current transition-colors duration-75 ${
              wasAnythingClicked
                ? "text-gray-900 hover:text-green-600 cursor-pointer"
                : "text-blueGray-400 cursor-default"
            }`}
          />
        </button>

        <button
          className="h-5 w-5 btn-focus"
          onClick={(e) => {
            e.preventDefault();
            // setEditTabVis((b) => !b);
            visDispatch({ type: "EDIT_TOGGLE" });
          }}
        >
          <CancelSVG className="h-5 w-5 fill-current text-gray-900 hover:text-red-600 cursor-pointer transition-colors duration-75" />
        </button>
      </div>

      {/* </form> */}
    </div>
  );
}

export default EditTab;
