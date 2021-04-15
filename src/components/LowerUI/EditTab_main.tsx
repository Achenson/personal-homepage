import React, { useEffect } from "react";
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

interface Props {
  tabType: "folder" | "note" | "rss";
  // setEditTabVis: React.Dispatch<React.SetStateAction<boolean>>;
  visDispatch: React.Dispatch<TabVisAction>;
  // noteInput: string | null;
  tabID: string | number;
}

function EditTab({
  tabID,
  visDispatch,
  tabType,
}: // setEditTabVis,
// noteInput,
Props): JSX.Element {
  // const [deletedTab, setDeletedTab] = deletedTabState.use();

  const [tabsData, setTabsData] = tabsDataState.use();

  const [rssSettingsData, setRssSettingsData] = rssSettingsState.use();

  let currentTab = tabsData.find((obj) => obj.id === tabID);
  let tabTitle = currentTab?.title;

  let rssLink: string | null | undefined = "no bookmark";
  // let rssLink;

  if (tabType === "rss") {
    rssLink = currentTab?.rssLink;
  }

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  // for note only
  const [textAreaValue, setTextAreaValue] = useState<string | null>(
    currentTab?.noteInput as string | null
  );

  const [tabTitleInput, setTabTitleInput] = useState<string>(
    tabTitle as string
  );

  const [rssLinkInput, setRssLinkInput] = useState<string>(rssLink as string);

  const [descriptionCheckbox, setDescriptionCheckbox] = useState(() => {
    if (typeof currentTab?.description === "boolean") {
      return currentTab.description;
    }

    return rssSettingsData.description;
  });
  const [dateCheckbox, setDateCheckbox] = useState(() => {
    if (typeof currentTab?.date === "boolean") {
      return currentTab.date;
    }
    return rssSettingsData.date;
  });
  // checkboxes won't be saved on Save if there were not manipulated
  //  (so they will still respond to changing default setting (they will have null as a property))
  const [wasCheckboxClicked, setWasCheckboxClicked] = useState(false);

  const [rssItemsPerPage, setRssItemsPerPage] = useState(() => {
    if (typeof currentTab?.itemsPerPage === "number") {
      return currentTab.itemsPerPage;
    }
    return rssSettingsData.itemsPerPage;
  });

  // items per page won't be saved on Save if there were not manipulated
  const [wasItemsPerPageClicked, setWasItemsPerPageClicked] = useState(false);

  const [wasTabOpenClicked, setWasTabOpenClicked] = useState(false);

  // for disabling save btn
  const [wasAnythingClicked, setWasAnythingClicked] = useState(false);

  const [chevronDown, setChevronDown] = useState(true);

  const [arrOfBookmarksNames, setArrayOfBookmarksNames] = useState<string[]>(
    () => {
      return calcArrOfBookmarksNames();
    }
  );

  function calcArrOfBookmarksNames() {
    // filtered lknks
    let filteredBookmarks = bookmarksData.filter(
      (obj) => obj.tags.indexOf((currentTab as SingleTabData).id) > -1
    );

    let arrOfBookmarksNames: string[] = [];

    filteredBookmarks.forEach((obj) => {
      arrOfBookmarksNames.push(obj.title);
    });

    return arrOfBookmarksNames;
  }

  const [bookmarksInputStr, setBookmarksInputStr] = useState<string>(
    arrOfBookmarksNames.join(", ")
  );


  useEffect(() => {
    if (wasCheckboxClicked || wasTabOpenClicked || wasItemsPerPageClicked) {
      setWasAnythingClicked(true);
    }
  }, [wasCheckboxClicked, wasTabOpenClicked, wasItemsPerPageClicked]);

  const [titleFormatErrorVis, setTitleFormatErrorVis] = useState<boolean>(
    false
  );
  const [textAreaErrorVis, setTextAreaErrorVis] = useState<boolean>(false);
  const [noDeletionErrorVis, setNoDeletionErrorVis] = useState<boolean>(false);

  const [bookmarksErrorVis, setBookmarksErrorVis] = useState<boolean>(false);
  const [
    bookmarksRepeatErrorVis,
    setBookmarksRepeatErrorVis,
  ] = useState<boolean>(false);
  const [
    bookmarksExistenceErrorVis,
    setBookmarksExistenceErrorVis,
  ] = useState<boolean>(false);

  // let regexForTitle = /^\w+$/;
  let regexForTitle = /^\w(\s?\w+)*$/;

  const [tabOpen, setTabOpen] = useState((currentTab as SingleTabData).opened);

  const [bookmarksListVis, setBookmarksListVis] = useState<boolean>(false);

  // ^  and $ -> beginning and end of the text!
  // let regexForTabs = /^\w+(,\s\w+)*$/;
  let regexForBookmarks = /^\w(\s?\w+)*(,\s\w(\s?\w+)*)*$/;

  function titleMarginRight() {
    if (tabType === "note" || tabID === "ALL_TAGS") {
      return "mr-2";
    }
    if (tabType === "rss") return "mr-9";
    if (tabType === "folder") return "mr-14";
  }

  return (
    <div className={`absolute z-40 bg-gray-100 pb-2 border w-full pl-1 pr-1`}>
      <div className="mb-3">
        <div className={`flex items-center mt-2 justify-between`}>
          <p
            className={`
              ${titleMarginRight()}
            `}
          >
            Title
          </p>
          <input
            type="text"
            // min-w-0 !!
            className="border w-full max-w-6xl pl-px"
            value={tabTitleInput}
            onChange={(e) => {
              setTabTitleInput(e.target.value);
              setWasAnythingClicked(true);
            }}
            onFocus={(e) => {
              setBookmarksListVis(false);
              setChevronDown(true);
            }}
          />
          {tabType === "folder" && tabID !== "ALL_TAGS" && (
            <div style={{ height: "18px" }} className="-mr-1">
              <ChevronDownSVG className="h-full invisible" />
            </div>
          )}
        </div>

        {tabType === "folder" && tabID !== "ALL_TAGS" && (
          <EditTab_folder
            chevronDown={chevronDown}
            setChevronDown={setChevronDown}
            bookmarksListVis={bookmarksListVis}
            setBookmarksListVis={setBookmarksListVis}
            setWasAnythingClicked={setWasAnythingClicked}
            bookmarksInputStr={bookmarksInputStr}
            setBookmarksInputStr={setBookmarksInputStr}
          />
        )}

        {titleFormatErrorVis && (
          <p className={`text-red-600 mt-1 -mb-2`}>{tabErrors.titleFormat}</p>
        )}

        {bookmarksErrorVis && tabType === "folder" && (
          <p className={`text-red-600 mt-1 -mb-2`}>
            {tabErrors.bookmarksFormat}
          </p>
        )}

        {bookmarksExistenceErrorVis && tabType === "folder" && (
          <p className={`text-red-600 mt-1 -mb-2`}>
            {tabErrors.bookmarkExistence}
          </p>
        )}

        {bookmarksRepeatErrorVis && tabType === "folder" && (
          <p className={`text-red-600 mt-1 -mb-2`}>
            {tabErrors.bookmarksRepeat}
          </p>
        )}

        {noDeletionErrorVis && (
          <p className={`text-red-600 mt-1 -mb-2`}>{tabErrors.noDeletion}</p>
        )}
      </div>

      {
        tabType === "note" && <EditTab_notes
          textAreaValue={textAreaValue}
          setTextAreaValue={setTextAreaValue}
          setWasAnythingClicked={setWasAnythingClicked}
        />
      }

      {textAreaErrorVis && tabType === "note" && (
        <p className={`text-red-600 -mt-2 mb-1`}>{tabErrors.textArea}</p>
      )}

      {tabType === "rss" && (
        <div className="mb-1">
          <div className="flex items-center mt-2 justify-between">
            <p className="whitespace-nowrap " style={{ marginRight: "10px" }}>
              RSS link
            </p>
            <input
              type="text"
              // min-w-0 !!
              className="border w-full max-w-6xl pl-px"
              value={rssLinkInput}
              onChange={(e) => {
                setRssLinkInput(e.target.value);
                setWasAnythingClicked(true);
              }}
            />
          </div>
          <div className="flex items-center mb-2 mt-2 justify-between">
            <p className="whitespace-nowrap w-32">Display</p>
            <div className="flex">
              <div className="flex items-center mr-2">
                <input
                  type="checkbox"
                  name="description"
                  // className="w-full border border-gray-500"
                  // className="border w-14 max-w-6xl min-w-0 mr-6 pl-1"
                  checked={descriptionCheckbox}
                  onChange={() => {
                    setDescriptionCheckbox((b) => !b);
                    setWasCheckboxClicked(true);
                  }}
                />
                <label className="ml-1" htmlFor="description">
                  Description
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="date"
                  checked={dateCheckbox}
                  onChange={() => {
                    setDateCheckbox((b) => !b);
                    setWasCheckboxClicked(true);
                  }}

                  // placeholder={"5-15"}
                />
                <label className="ml-1" htmlFor="date">
                  Date
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2 justify-between">
            <p className="whitespace-nowrap w-32">Items per page</p>
            <input
              type="number"
              min="5"
              max="15"
              // className="w-full border border-gray-500"
              className="border w-11 pl-1"
              value={rssItemsPerPage}
              onChange={(e) => {
                setRssItemsPerPage(parseInt(e.target.value));
                setWasItemsPerPageClicked(true);
              }}
              // placeholder={"5-15"}
            />
          </div>
          {/* <p className="text-center">RESET to default</p> */}
          <p className="text-center">
            {" "}
            <span
              className="text-red-600 hover:underline cursor-pointer"
              onClick={() => {
                // setResetColorsData(true);
                setDescriptionCheckbox(rssSettingsData.description);
                setDateCheckbox(rssSettingsData.date);
                setRssItemsPerPage(rssSettingsData.itemsPerPage);
                setWasAnythingClicked(false);
                setWasCheckboxClicked(false);
                setWasItemsPerPageClicked(false);
                setWasTabOpenClicked(false);

                setTabsData((previous) =>
                  produce(previous, (updated) => {
                    let currentTab = updated.find((obj) => obj.id == tabID);
                    if (currentTab) {
                      // let tabIndex = updated.indexOf(tabToDelete);
                      // updated.splice(tabIndex, 1);
                      currentTab.date = null;
                      currentTab.description = null;
                      currentTab.itemsPerPage = null;
                    }
                  })
                );
              }}
            >
              RESET
            </span>{" "}
            to default
          </p>
        </div>
      )}

      <div className={`pt-2`} style={{ borderTop: "solid lightGray 1px" }}>
        <div className="flex justify-between items-center">
          <p>Lock as always-open</p>

          {tabOpen ? (
            <LockClosedSVG
              className="h-6 text-gray-700 transition-colors duration-75 hover:text-black cursor-pointer"
              onClick={() => {
                setTabOpen((b) => !b);
                setWasTabOpenClicked(true);
                setBookmarksListVis(false);
                setChevronDown(true);
              }}
            />
          ) : (
            <LockOpenSVG
              className="h-6 text-gray-700 transition-colors duration-75 hover:text-black cursor-pointer"
              onClick={() => {
                setTabOpen((b) => !b);
                setWasTabOpenClicked(true);
                setBookmarksListVis(false);
                setChevronDown(true);
              }}
            />
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <p>Delete</p>

          <TrashSVG
            className="h-6 text-gray-500 transition-colors duration-75 hover:text-black cursor-pointer"
            onClick={() => {
              if (!currentTab?.deletable) {
                setNoDeletionErrorVis(true);
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
          />
        </div>
      </div>

      <div className="flex justify-start mt-2">
        <p className="w-8"></p>
        <div className="w-full flex justify-center">
          <SaveSVG
            className={`h-5 fill-current mr-3 transition-colors duration-75 ${
              wasAnythingClicked
                ? "text-gray-900 hover:text-green-600 cursor-pointer"
                : "text-blueGray-400 cursor-default"
            }`}
            onClick={(e) => {
              e.preventDefault();

              setTitleFormatErrorVis(false);
              setTextAreaErrorVis(false);
              setNoDeletionErrorVis(false);
              setBookmarksErrorVis(false);
              setBookmarksRepeatErrorVis(false);
              setBookmarksExistenceErrorVis(false);

              let bookmarksInputArr = bookmarksInputStr.split(", ");

              if (!wasAnythingClicked) {
                return;
              }

              setWasCheckboxClicked(false);
              setWasItemsPerPageClicked(false);

              if (!regexForTitle.test(tabTitleInput)) {
                setTitleFormatErrorVis(true);
                setBookmarksListVis(false);
                setChevronDown(true);
                return;
              }

              if (tabType === "note") {
                if ((textAreaValue as string).length === 0) {
                  setTextAreaErrorVis(true);
                  return;
                }
              }

              if (tabType === "folder") {
                if (!regexForBookmarks.test(bookmarksInputStr)) {
                  setBookmarksErrorVis(true);
                  setBookmarksListVis(false);
                  setChevronDown(true);
                  return;
                }

                if (!bookmarkExistenceCheck()) {
                  setBookmarksExistenceErrorVis(true);
                  setBookmarksListVis(false);
                  setChevronDown(true);
                  return;
                }

                if (!bookmarksUniquenessCheck()) {
                  setBookmarksRepeatErrorVis(true);
                  setBookmarksListVis(false);
                  setChevronDown(true);
                  return;
                }
              }

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

              setTabsData((previous) =>
                produce(previous, (updated) => {
                  let tabToUpdate = updated.find((obj) => obj.id === tabID);

                  if (tabToUpdate) {
                    tabToUpdate.title = tabTitleInput;
                    // updated[tabIndex].deletable = currentTab[0].deletable
                    if (wasTabOpenClicked) {
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
                // changing tags in links
                setBookmarksData((previous) =>
                  produce(previous, (updated) => {
                    updated.forEach((obj) => {
                      let bookmarksInputArr = bookmarksInputStr.split(", ");

                      // all initial links inside a folder
                      // make array of missing links
                      // if this links' title is inside missing bookmarks
                      // cut out tabID (current folder) from tags

                      let missingBookmarks: string[] = [];

                      arrOfBookmarksNames.forEach((el, i) => {
                        if (bookmarksInputArr.indexOf(el) === -1) {
                          missingBookmarks.push(el);
                        }
                      });

                      if (missingBookmarks.indexOf(obj.title) > -1) {
                        obj.tags.splice(obj.tags.indexOf(tabID), 1);
                      }

                      //  if link title is present in folder's new input for tabs & if folder title wasn't already in tags
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

              // setEditTabVis((b) => !b);
              if (tabOpen) {
                visDispatch({ type: "TAB_CONTENT_OPEN_AFTER_LOCKING" });
              } else {
                visDispatch({ type: "EDIT_TOGGLE" });
              }
            }}
          />

          <CancelSVG
            className="h-5 fill-current text-gray-900 ml-3 hover:text-red-600 cursor-pointer transition-colors duration-75"
            onClick={(e) => {
              e.preventDefault();
              // setEditTabVis((b) => !b);
              visDispatch({ type: "EDIT_TOGGLE" });
            }}
          />
        </div>
      </div>
      {/* </form> */}
    </div>
  );
}

export default EditTab;