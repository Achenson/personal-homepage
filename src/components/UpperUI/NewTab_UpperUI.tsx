import React from "react";

import { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { ReactComponent as SaveSVG } from "../../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";
import { ReactComponent as ChevronDownSVG } from "../../svgs/chevron-down.svg";
import { ReactComponent as ChevronUpSVG } from "../../svgs/chevron-up.svg";

import TagsList_UpperUI from "./TagsList_UpperUI";

import {
  createTabFolder,
  createNote,
  createRSS,
} from "../../utils/objCreators";

import { produce } from "immer";

import { tabsDataState } from "../../state/tabsAndLinks";
import { linksDataState } from "../../state/tabsAndLinks";

interface Props {
  setNewTabVis: React.Dispatch<React.SetStateAction<boolean>>;
  tabType: "folder" | "note" | "rss";
}

function NewTab_UpperUI({
  setNewTabVis,
  tabType,
}: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();

  const [linksData, setLinksData] = linksDataState.use();

  const [tabTitleInput, setTabTitleInput] = useState<string>("");
  const [rssLinkInput, setRssLinkInput] = useState<string>("");

  const [tabColumnInput, setTabColumnInput] = useState<number>(1);
  // const [tabLinksInput, setTabLinksInput] = useState<string[]>([]);

  const [tabsErrorVis, setTabsErrorVis] = useState<boolean>(false);
  const [
    tabsRepeatErrorVis,
    setTabsRepeatErrorVis,
  ] = useState<boolean>(false);
  const [
    tabsExistenceErrorVis,
    setTabsExistenceErrorVis,
  ] = useState<boolean>(false);

  const [titleFormatErrorVis, setTitleFormatErrorVis] = useState<boolean>(
    false
  );
  const [
    titleUniquenessErrorVis,
    setTitleUniquenessErrorVis,
  ] = useState<boolean>(false);
  // for notes
  const [textAreaErrorVis, setTextAreaErrorVis] = useState<boolean>(false);

  const [tabsListVis, setTabsListVis] = useState<boolean>(false);

  const [visibleTabs, setVisibleTabs] = useState<string[]>(
    makeInitialTabs()
  );

  const [tabsInputStr, setTabsInputStr] = useState<string>("");

  // ^  and $ -> beginning and end of the text!
  let regexForTabs = /^\w+(,\s\w+)*$/;
  let regexForTitle = /^\w+$/;

  const [textAreaValue, setTextAreaValue] = useState<string | null>("");

  const [chevronDown, setChevronDown] = useState(true);

  const [initialTabs, setInitialTabs] = useState(
    makeInitialTabs()
  );

  // tags won't be visible on first render even though visibleTags length won't be 0 (see useEffect)
  const [isThisTheFirstRender, setIsThisTheFirstRender] = useState(true);

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

    linksData.forEach((obj) => {
      tabs.push(obj.title);
    });

    return tabs;
  }

  return (
    // opacity cannot be used, because children will inherit it and the text won't be readable
    <div
      className="flex z-50 absolute h-screen w-screen items-center justify-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
    >
      <div
        className="bg-gray-200 pb-3 pt-6 pl-2 pr-1 border-2 border-teal-500 rounded-sm md:mb-48"
        style={{ width: "350px" }}
      >
        <div className="flex justify-around mb-2 mt-2">
          <p className="w-32">Title</p>
          {/* <div className="w-full pl-2"> */}
          <input
            type="text"
            className="w-full border border-gray-500"
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
          />
          {/* </div> */}
          <ChevronDownSVG className="h-6 invisible" />
        </div>
        <div className="flex justify-around mb-2 mt-2">
          <p className="w-32">Column</p>
          {/* <div className="w-full pl-2"> */}
          <input
            type="number"
            min="1"
            max="4"
            className="w-full border border-gray-500"
            value={tabColumnInput}
            onChange={(e) => setTabColumnInput(parseInt(e.target.value))}
            placeholder={"Enter number between 1 and 4"}
          />
          {/* </div> */}
          <ChevronDownSVG className="h-6 invisible" />
        </div>

        {tabType === "folder" ? (
          <div className="flex justify-around mb-2 mt-2">
            <p className="w-32">Tabs</p>
            {/* <div className="w-full pl-2"> */}
            <input
              type="text"
              className="w-full border border-gray-500"
              // value={tabLinksInput.join(", ")}
              value={tabsInputStr}
              // onChange={(e) =>
              //   setTabLinksInput([...e.target.value.split(", ")])
              // }

              onChange={(e) => {
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
              placeholder={"Choose at least one"}
            />
            {/* </div> */}
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
        ) : null}

        {tabType === "note" ? (
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
        ) : null}

        {tabType === "rss" ? (
          <div className="flex justify-around mb-2 mt-2">
            <p className="w-32">RSS link</p>
            <div className="w-full pl-2">
              <input
                type="text"
                className="w-full border border-gray-500"
                value={rssLinkInput}
                placeholder="enter RSS link"
                onChange={(e) => setRssLinkInput(e.target.value)}
              />
            </div>
          </div>
        ) : null}

        {tabsListVis ? (
          <TagsList_UpperUI
            setTagsInputStr={setTabsInputStr}
            tagsInputStr={tabsInputStr}
            visibleTags={visibleTabs}
            width="228px"
            marginLeft="89px"
          />
        ) : null}

        {titleFormatErrorVis ? (
          <p className={`text-red-600`}>
            Folder title can contain letters, numbers or underscore
          </p>
        ) : null}

        {titleUniquenessErrorVis ? (
          <p className={`text-red-600`}>
            Folder with that title already exists
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

        <div className="flex justify-start mt-6">
          <p className="w-8"></p>
          {/* !!! pl-4 in NewLink */}
          <div className="w-full flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();

                // if(tagsInput.join(", "))

                setTabsErrorVis(false);
                setTabsRepeatErrorVis(false);
                setTitleFormatErrorVis(false);
                setTitleUniquenessErrorVis(false);
                setTabsExistenceErrorVis(false);
                setTextAreaErrorVis(false);

                let tabsInputArr = tabsInputStr.split(", ");

                if (!regexForTitle.test(tabTitleInput)) {
                  setTitleFormatErrorVis(true);

                  return;
                }

                if (!titleUniquenessCheck()) {
                  setTitleUniquenessErrorVis(true);
                  return;
                }

                if (tabType === "folder") {
                  // if (!regexForTabs.test(tabLinksInput.join(", "))) {
                  if (!regexForTabs.test(tabsInputArr.join(", "))) {
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

                if (tabType === "note") {
                  setTabsData((previous) =>
                    produce(previous, (updated) => {
                      updated.push({
                        ...createNote(
                          tabTitleInput,
                          tabColumnInput,
                          0,
                          textAreaValue
                        ),
                      });
                    })
                  );
                }

                if (tabType === "folder") {
                  setTabsData((previous) =>
                    produce(previous, (updated) => {
                      updated.push({
                        ...createTabFolder(
                          tabTitleInput,
                          tabColumnInput,
                          0
                        ),
                      });
                    })
                  );

                  // updating links data (tags array)
                  setLinksData((previous) =>
                    produce(previous, (updated) => {
                      updated.forEach((obj) => {
                        if (
                          tabsInputArr.indexOf(obj.title) > -1 &&
                          obj.tags.indexOf(tabTitleInput) === -1
                        ) {
                          obj.tags.push(tabTitleInput);
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
                          0,
                          rssLinkInput
                        ),
                      });
                    })
                  );
                }

                setNewTabVis((b) => !b);

                function tabExistenceCheck() {
                  let tabsArr: string[] = [];

                  linksData.forEach((obj) => {
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
            >
              <SaveSVG className="h-5 fill-current text-black mr-3 hover:text-green-600" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setNewTabVis((b) => !b);
              }}
            >
              <CancelSVG className="h-5 fill-current text-black ml-3 hover:text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTab_UpperUI;
