import React, { useEffect } from "react";
import { useState } from "react";

import { ReactComponent as SaveSVG } from "../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../svgs/alphabet-x.svg";
import { ReactComponent as TrashSmallSVG } from "../svgs/trashSmall.svg";
import { ReactComponent as TrashSVG } from "../svgs/trash.svg";
import { ReactComponent as LockClosedSVG } from "../svgs/lock-closed.svg";
import { ReactComponent as LockOpenSVG } from "../svgs/lock-open.svg";
import { ReactComponent as ChevronDownSVG } from "../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../svgs/chevron-up.svg";

import TagsList_UpperUI from "./UpperUI/TagsList_UpperUI";

import { produce } from "immer";

import {
  tabsDataState,
  bookmarksDataState,
  deletedTabState,
  bookmarksAllTagsState,
} from "../state/tabsAndBookmarks";

import { rssSettingsState } from "../state/defaultSettings";

interface Props {
  // tabTitle: string;
  tabType: "folder" | "note" | "rss";
  setEditTabVis: React.Dispatch<React.SetStateAction<boolean>>;
  // noteInput: string | null;
  tabID: string | number;
}

function EditTabTitle({
  tabID,

  tabType,
  setEditTabVis,
}: // noteInput,
Props): JSX.Element {
  const [deletedTab, setDeletedTab] = deletedTabState.use();

  const [tabsData, setTabsData] = tabsDataState.use();
  const [bookmarksAllTagsData, setBookmarksAllTagsData] = bookmarksAllTagsState.use();

  const [rssSettingsData, setRssSettingsData] = rssSettingsState.use();

  let currentTab = tabsData.filter((obj) => obj.id === tabID);
  let tabTitle = currentTab[0].title;

  let rssLink: string | null | undefined = "no bookmark";
  // let rssLink;

  if (tabType === "rss") {
    rssLink = currentTab[0].rssLink;
  }

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  // for note only
  const [textAreaValue, setTextAreaValue] = useState<string | null>(
    currentTab[0].noteInput as string | null
  );

  const [tabTitleInput, setTabTitleInput] = useState<string>(
    tabTitle
  );

  const [rssLinkInput, setRssLinkInput] = useState<string>(rssLink as string);

  const [descriptionCheckbox, setDescriptionCheckbox] = useState(() => {
    if (typeof currentTab[0].description === "boolean") {
      return currentTab[0].description;
    }

    return rssSettingsData.description;
  });
  const [dateCheckbox, setDateCheckbox] = useState(() => {
    if (typeof currentTab[0].date === "boolean") {
      return currentTab[0].date;
    }
    return rssSettingsData.date;
  });
  // checkboxes won't be saved on Save if there were not manipulated
  //  (so they will still respond to changing default setting (they will have null as a property))
  const [wasCheckboxClicked, setWasCheckboxClicked] = useState(false);

  const [rssItemsPerPage, setRssItemsPerPage] = useState(() => {
    if (typeof currentTab[0].itemsPerPage === "number") {
      return currentTab[0].itemsPerPage;
    }
    return rssSettingsData.itemsPerPage;
  });

  // items per page won't be saved on Save if there were not manipulated
  const [wasItemsPerPageClicked, setWasItemsPerPageClicked] = useState(false);

  const [wasTabOpenClicked, setWasTabOpenClicked] = useState(false);

  // for disabling save btn
  const [wasAnythingClicked, setWasAnythingClicked] = useState(false);

  const [chevronDown, setChevronDown] = useState(true);

  // const [tagsListVis, setTagsListVis] = useState<boolean>(false);

  const [arrOfBookmarksNames, setArrayOfBookmarksNames] = useState<string[]>(() => {
    return calcArrOfBookmarksNames();
  });

  function calcArrOfBookmarksNames() {
    // filtered lknks
    let filteredBookmarks = bookmarksData.filter(
      (obj) => obj.tags.indexOf(currentTab[0].id) > -1
    );

    let arrOfBookmarksNames: string[] = [];

    filteredBookmarks.forEach((obj) => {
      arrOfBookmarksNames.push(obj.title);
    });

    return arrOfBookmarksNames;
  }

  const [tabsInputStr, setTabsInputStr] = useState<string>(
    arrOfBookmarksNames.join(", ")
  );

  const [visibleTabs, setVisibleTabs] = useState<string[]>(
    makeInitialTabs()
  );

  useEffect(() => {
    if (wasCheckboxClicked || wasTabOpenClicked || wasItemsPerPageClicked) {
      setWasAnythingClicked(true);
    }
  }, [wasCheckboxClicked, wasTabOpenClicked, wasItemsPerPageClicked]);

  let tabIndex: number;

  tabsData.forEach((obj, i) => {
    if (obj.id === tabID) {
      tabIndex = i;
    }
  });

  const [tagErrorVis, setTagErrorVis] = useState<boolean>(false);
  const [textAreaErrorVis, setTextAreaErrorVis] = useState<boolean>(false);
  const [noDeletionErrorVis, setNoDeletionErrorVis] = useState<boolean>(false);

  const [tabsErrorVis, setTabsErrorVis] = useState<boolean>(false);
  const [
    tabsRepeatErrorVis,
    setTabsRepeatErrorVis,
  ] = useState<boolean>(false);
  const [
    tabsExistenceErrorVis,
    setTabsExistenceErrorVis,
  ] = useState<boolean>(false);

  // let regexForTitle = /^\w+$/;
  let regexForTitle = /^\w(\s?\w+)*$/;

  const [tabOpen, setTabOpen] = useState(currentTab[0].opened);

  // tags won't be visible on first render even though visibleTags length won't be 0 (see useEffect)
  const [isThisTheFirstRender, setIsThisTheFirstRender] = useState(true);

  const [initialTabs, setInitialTabs] = useState(
    makeInitialTabs()
  );

  const [tabsListVis, setTabsListVis] = useState<boolean>(false);

  useEffect(() => {
    let newVisibleTags: string[] = [];

    initialTabs.forEach((el) => {
      // in new RegExp the \ needs to be escaped!
      let tagRegex = new RegExp(`\\b${el}\\b`);

      if (!tagRegex.test(tabsInputStr)) {
        newVisibleTags.push(el);
      }
    });

    setVisibleTabs([...newVisibleTags]);

    if (newVisibleTags.length === 0) {
      setTabsListVis(false);
    }

    if (newVisibleTags.length > 0 && !isThisTheFirstRender) {
      setTabsListVis(true);
    }

    setIsThisTheFirstRender(false);
  }, [
    tabsInputStr,
    initialTabs,
    setVisibleTabs,
    setTabsListVis,
  ]);

  function makeInitialTabs(): string[] {
    let tabs: string[] = [];

    bookmarksData.forEach((obj) => {
      tabs.push(obj.title);
    });

    return tabs;
  }

  // ^  and $ -> beginning and end of the text!
  // let regexForTabs = /^\w+(,\s\w+)*$/;
  let regexForBookmarks = /^\w(\s?\w+)*(,\s\w(\s?\w+)*)*$/;
  return (
    <div className="absolute z-40 bg-gray-100 pb-3 border w-full pl-2 pr-2">
      <div className="flex items-center mt-2 justify-between">
        <p
          className={
            tabType === "folder"
              ? "mr-14"
              : tabType === "rss"
              ? "w-24"
              : "w-10"
          }
        >
          Title
        </p>
        <input
          type="text"
          // min-w-0 !!
          // className="border w-full max-w-6xl min-w-0"
          className="border w-full min-w-0"
          value={tabTitleInput}
          onChange={(e) => {
            setTabTitleInput(e.target.value);
            setWasAnythingClicked(true);
          }}
        />
        <ChevronDownSVG className="h-6 invisible" />
      </div>
      {tabType === "folder" && (
        <div className="flex items-center mt-2 justify-between">
          <p className={`mr-2`}>Bookmarks</p>
          <input
            type="text"
            // min-w-0 !!
            // className="border w-full max-w-6xl min-w-0"
            className="border w-full min-w-0"
            value={tabsInputStr}
            onChange={(e) => {
              // setTabTitleInput(e.target.value);
              setWasAnythingClicked(true);

              let target = e.target.value;

              setTabsInputStr(target);

              let tabsInputArr = target.split(", ");

              // setTagsInputArr(tagsInputStr.split(" ,"))

              // let newVisibleTags = [...visibleTags];
              let newVisibleTabs: string[] = [];

              visibleTabs.forEach((el) => {
                if (tabsInputArr.indexOf(el) === -1) {
                  newVisibleTabs.push(el);
                }
              });

              setVisibleTabs([...newVisibleTabs]);
            }}
          />
          {chevronDown ? (
            <ChevronDownSVG
              className="h-6 cursor-pointer hover:text-blueGray-500"
              onClick={() => {
                setChevronDown((b) => !b);
                setTabsListVis((b) => !b);
              }}
            />
          ) : (
            <ChevronUpSVG
              className="h-6 cursor-pointer hover:text-blueGray-500"
              onClick={() => {
                setChevronDown((b) => !b);
                setTabsListVis((b) => !b);
              }}
            />
          )}
        </div>
      )}

      {tabType === "folder" && tabsListVis ? (
        <TagsList_UpperUI
          setTagsInputStr={setTabsInputStr}
          tagsInputStr={tabsInputStr}
          visibleTags={visibleTabs}
          width="271px"
          marginLeft="42px"
        />
      ) : null}

      {tagErrorVis ? (
        <p className={`text-red-600`}>
          Tab title should consist of a single word without special
          characters
        </p>
      ) : null}

      {tabsErrorVis && tabType === "folder" ? (
        <p className={`text-red-600`}>
          Tabs should consist of words separated by coma and space
        </p>
      ) : null}

      {tabsExistenceErrorVis && tabType === "folder" ? (
        <p className={`text-red-600`}>
          You can choose from existing tabs only
        </p>
      ) : null}

      {tabsRepeatErrorVis && tabType === "folder" ? (
        <p className={`text-red-600`}>Each tab should be unique</p>
      ) : null}

      {textAreaErrorVis && tabType === "note" ? (
        <p className={`text-red-600`}>Note cannot be empty</p>
      ) : null}

      {noDeletionErrorVis ? (
        <p className={`text-red-600`}>
          Folder with all bookmarks cannot be deleted. You can hide it in the
          global settings instead
        </p>
      ) : null}

      {tabType === "note" ? (
        <div className="mt-2">
          <textarea
            value={textAreaValue as string}
            className="h-full w-full overflow-visible pl-1 pr-1 border font-mono"
            rows={(currentTab[0].noteInput as string).length / 30}
            onChange={(e) => {
              setTextAreaValue(e.target.value);
              setWasAnythingClicked(true);
            }}
          ></textarea>
        </div>
      ) : null}

      {tabType === "rss" ? (
        <div>
          <div className="flex items-center mb-2 mt-2 justify-between">
            <p className="w-24 whitespace-nowrap">RSS bookmark</p>
            <input
              type="text"
              // min-w-0 !!
              className="border w-full max-w-6xl min-w-0"
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
        </div>
      ) : null}

      <div className={`mt-3 pt-2`} style={{ borderTop: "solid lightGray 1px" }}>
        <div className="flex justify-between items-center">
          <p>Lock as always-open</p>
          <button>
            {tabOpen ? (
              <LockClosedSVG
                className="h-6 text-gray-700 hover:text-black cursor-pointer"
                onClick={() => {
                  setTabOpen((b) => !b);
                  setWasTabOpenClicked(true);
                }}
              />
            ) : (
              <LockOpenSVG
                className="h-6 text-gray-700 hover:text-black cursor-pointer"
                onClick={() => {
                  setTabOpen((b) => !b);
                  setWasTabOpenClicked(true);
                }}
              />
            )}
          </button>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p>Delete</p>
          <button>
            <TrashSVG
              className="h-6 text-gray-500 hover:text-black cursor-pointer"
              onClick={() => {
                if (!currentTab[0].deletable) {
                  setNoDeletionErrorVis(true);
                  return;
                }

                setDeletedTab(tabID);

                setTabsData((previous) =>
                  produce(previous, (updated) => {
                    updated.splice(tabIndex, 1);
                  })
                );

                setEditTabVis((b) => !b);
                // removing deleted tab(tag) for bookmarks
                bookmarksData.forEach((obj, i) => {
                  if (obj.tags.indexOf(tabTitle) > -1) {
                    setBookmarksData((previous) =>
                      produce(previous, (updated) => {
                        updated[i].tags.splice(
                          obj.tags.indexOf(tabTitle),
                          1
                        );
                      })
                    );
                  }
                });
              }}
            />
          </button>
        </div>
      </div>

      <div className="flex justify-start mt-2">
        <p className="w-8"></p>
        <div className="w-full pl-4 flex justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();

              setTagErrorVis(false);
              setTextAreaErrorVis(false);
              setNoDeletionErrorVis(false);
              setTabsErrorVis(false);
              setTabsRepeatErrorVis(false);
              setTabsExistenceErrorVis(false);

              let tabsInputArr = tabsInputStr.split(", ");

              if (!wasAnythingClicked) {
                return;
              }

              setWasCheckboxClicked(false);
              setWasItemsPerPageClicked(false);

              if (!regexForTitle.test(tabTitleInput)) {
                setTagErrorVis(true);
                return;
              }

              if (tabType === "note") {
                if ((textAreaValue as string).length === 0) {
                  setTextAreaErrorVis(true);
                  return;
                }
              }

              // setTagErrorVis(false);
              // setTextAreaErrorVis(false);
              // setNoDeletionErrorVis(false);
              // setTabsErrorVis(false);
              //   setTabsRepeatErrorVis(false);
              //   setTabsExistenceErrorVis(false);

              if (tabType === "folder") {
                if (!regexForBookmarks.test(tabsInputStr)) {
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

              function tabExistenceCheck() {
                let tabsArr: string[] = [];

                bookmarksData.forEach((obj) => {
                  tabsArr.push(obj.title);
                });

                for (let el of tabsInputArr) {
                  if (tabsArr.indexOf(el) === -1) {
                    return false;
                  }
                }

                return true;
              }

              function tagUniquenessCheck() {
                let isUnique: boolean = true;

                tabsInputArr.forEach((el, i) => {
                  let tagsInputCopy = [...tabsInputArr];
                  tagsInputCopy.splice(i, 1);

                  if (tagsInputCopy.indexOf(el) > -1) {
                    isUnique = false;
                    return;
                  }
                });

                return isUnique;
              }

              setTabsData((previous) =>
                produce(previous, (updated) => {
                  updated[tabIndex].title = tabTitleInput;
                  // updated[tabIndex].deletable = currentTab[0].deletable

                  if (wasTabOpenClicked) {
                    updated[tabIndex].opened = tabOpen;
                  }

                  if (tabType === "note") {
                    updated[tabIndex].noteInput = textAreaValue;
                  }
                  if (tabType === "rss") {
                    updated[tabIndex].rssLink = rssLinkInput;

                    if (wasCheckboxClicked) {
                      updated[tabIndex].date = dateCheckbox;
                    }

                    if (wasCheckboxClicked) {
                      updated[tabIndex].description = descriptionCheckbox;
                    }

                    if (wasItemsPerPageClicked) {
                      updated[tabIndex].itemsPerPage = rssItemsPerPage;
                    }
                  }
                })
              );

              if (tabType === "folder") {
                // changing tags in links
                setBookmarksData((previous) =>
                  produce(previous, (updated) => {
                    updated.forEach((obj) => {
                      let tabsInputArr = tabsInputStr.split(", ");

                      // all initial links inside a folder
                      // make array of missing links
                      // if this links' title is inside missing bookmarks
                      // cut out tabID (current folder) from tags

                      let missingBookmarks: string[] = [];

                      arrOfBookmarksNames.forEach((el, i) => {
                        if (tabsInputArr.indexOf(el) === -1) {
                          missingBookmarks.push(el);
                        }
                      });

                      if (missingBookmarks.indexOf(obj.title) > -1) {
                        obj.tags.splice(obj.tags.indexOf(tabID), 1);
                      }

                      //  if link title is present in folder's new input for tabs & if folder title wasn't already in tags
                      // add new tag
                      if (
                        tabsInputArr.indexOf(obj.title) > -1 &&
                        obj.tags.indexOf(tabID) === -1
                      ) {
                        obj.tags.push(tabID);
                      }
                    });
                  })
                );
              }

              setEditTabVis((b) => !b);
            }}
          >
            <SaveSVG
              className={`h-5 fill-current mr-3 ${
                wasAnythingClicked
                  ? "text-gray-900 hover:text-green-600"
                  : "text-blueGray-400 cursor-default"
              }`}
            />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setEditTabVis((b) => !b);
            }}
          >
            <CancelSVG className="h-5 fill-current text-gray-900 ml-3 hover:text-red-600" />
          </button>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
}

export default EditTabTitle;
