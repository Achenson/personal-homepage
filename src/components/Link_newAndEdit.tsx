import React from "react";
import { useState, useEffect } from "react";

import { linksDataState, bookmarksDataState } from "../state/bookmarksAndLinks";

import Link_upper_JSX from "./Link_upper_JSX";
import Link_lower_JSX from "./Link_lower_JSX";

import { SingleLinkData } from "../utils/interfaces";

interface Props {
  setLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
  linkComponentType: "new_upperUI" | "new_lowerUI" | "edit";
  // for "edit" type only
  linkId?: string | number | undefined;
}

function Link_newAndEdit({
  setLinkVis,
  linkComponentType,
  linkId,
}: Props): JSX.Element {
  const [linksData, setLinksData] = linksDataState.use();

  let currentLink: SingleLinkData | undefined;

  if (linkComponentType === "edit") {
    currentLink = linksData.filter((obj) => obj.id === linkId)[0];
  }

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  let bookmarkFolders = bookmarksData.filter((obj) => obj.type === "folder");

  const [titleInput, setTitleInput] = useState<string>(
    linkComponentType === "edit" ? (currentLink as SingleLinkData).title : ""
  );

  //  !!! diff in editLink
  const [urlInput, setUrlInput] = useState<string>(
    linkComponentType === "edit" ? (currentLink as SingleLinkData).URL : ""
  );

  //  !!! diff in editLink
  const [tagsInputStr, setTagsInputStr] = useState<string>(
    linkComponentType === "edit" ? generateTagNames() : ""
  );

  //   ? (currentLink as SingleLinkData).tags.join(", ")

  function generateTagNames() {
    let arrOut: string[] = [];

    bookmarksData.forEach((obj) => {
      if ((currentLink as SingleLinkData).tags.indexOf(obj.id) > -1) {
        arrOut.push(obj.title);
      }
    });

    return arrOut.join(", ");
  }

  // const [tagsInputArr, setTagsInputArr] = useState<string[]>([]);

  const [tagsListVis, setTagsListVis] = useState<boolean>(false);

  const [visibleTags, setVisibleTags] = useState<string[]>(makeInitialTags());

  const [initialTags, setInitialTags] = useState(makeInitialTags());

  // tags won't be visible on first render even though visibleTags length won't be 0 (see useEffect)
  const [isThisTheFirstRender, setIsThisTheFirstRender] = useState(true);

  let notesTitlesArr: string[] = [];

  bookmarksData.forEach((obj) => {
    if (obj.type === "note") {
      notesTitlesArr.push(obj.title);
    }
  });

  // for editingLink only !!!
  //  shouldn't be 0, but got error otherwise
  let linkIndex: number = 0;

  if (linkComponentType === "edit") {
    linksData.forEach((obj, i) => {
      if (obj.title === (currentLink as SingleLinkData).title) {
        linkIndex = i;
      }
    });
  }

  useEffect(() => {
    let newVisibleTags: string[] = [];

    initialTags.forEach((el) => {
      // in new RegExp the \ needs to be escaped!
      let tagRegex = new RegExp(`\\b${el}\\b`);

      if (!tagRegex.test(tagsInputStr)) {
        newVisibleTags.push(el);
      }
    });

    setVisibleTags([...newVisibleTags]);

    if (newVisibleTags.length === 0) {
      setTagsListVis(false);
    }

    if (newVisibleTags.length > 0 && !isThisTheFirstRender) {
      setTagsListVis(true);
    }

    setIsThisTheFirstRender(false);
  }, [tagsInputStr, initialTags, setVisibleTags, setTagsListVis]);

  function makeInitialTags(): string[] {
    let tags: string[] = [];

    bookmarkFolders.forEach((obj) => {
      tags.push(obj.title);
    });

    return tags;
  }

  const linkJSX_props = {
    titleInput,
    setTitleInput,
    urlInput,
    setUrlInput,
    tagsInputStr,
    setTagsInputStr,
    visibleTags,
    setVisibleTags,
    tagsListVis,
    setTagsListVis,
    notesTitlesArr,
    linkComponentType,
    linkIndex,
    setLinkVis,
    // !!! for lower JSX only, change?
    // currentLink: currentLink,
  };

  return (
    <>
      {linkComponentType === "new_upperUI" ? (
        <Link_upper_JSX {...linkJSX_props} />
      ) : (
        <Link_lower_JSX {...linkJSX_props} currentLink={currentLink} />
      )}
    </>
  );
}

export default Link_newAndEdit;
