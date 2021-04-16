import React, { useState } from "react";

import { produce } from "immer";

import { SingleTabData } from "../../utils/interfaces";

import { rssSettingsState } from "../../state/defaultSettings";
import { tabsDataState } from "../../state/tabsAndBookmarks";

interface Props {
  currentTab: SingleTabData;
  setWasAnythingClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setWasTabOpenClicked: React.Dispatch<React.SetStateAction<boolean>>;
  descriptionCheckbox: boolean;
  setDescriptionCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
  dateCheckbox: boolean;
  setDateCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
  setWasCheckboxClicked: React.Dispatch<React.SetStateAction<boolean>>;
  rssItemsPerPage: number;
  setRssItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setWasItemsPerPageClicked: React.Dispatch<React.SetStateAction<boolean>>;
  tabID: string | number;
  rssLinkInput: string
  setRssLinkInput: React.Dispatch<React.SetStateAction<string>>
}

function EditTab_RSS({
  currentTab,
  setWasAnythingClicked,
  setWasTabOpenClicked,
  descriptionCheckbox,
  setDescriptionCheckbox,
  dateCheckbox,
  setDateCheckbox,
  setWasCheckboxClicked,
  rssItemsPerPage,
  setRssItemsPerPage,
  setWasItemsPerPageClicked,
  tabID,
  rssLinkInput,
  setRssLinkInput
}: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();

  const [rssSettingsData, setRssSettingsData] = rssSettingsState.use();

  let rssLink: string | null | undefined = "no bookmark";

  rssLink = currentTab?.rssLink;

  return (
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
          className="border w-8 text-center border-gray-300"
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
  );
}

export default EditTab_RSS;
