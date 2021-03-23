import React, { useState, useEffect } from "react";



import { tabsDataState } from "../../state/tabsAndBookmarks";

interface Props {
  tagsInputStr: string;
  setTagsInputStr: React.Dispatch<React.SetStateAction<string>>;
  visibleTags: string[];
  width: string;
  marginLeft: string;
}

function SelectableList({
  setTagsInputStr,
  tagsInputStr,
  visibleTags,
  width,
  marginLeft
}: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();

  return (
    <div
      className="absolute z-50 bg-white -mt-2"
      // style={{ width: "271px", marginLeft: "42px" }}
      style={{ width: width, marginLeft: marginLeft }}
    >
      {visibleTags.length === 0 ? (
        <p className="invisible">[empty]</p>
      ) : (
        visibleTags.map((el, i) => {
          return (
            <p
              className="cursor-pointer hover:bg-blueGray-200 pl-px"
              onClick={() => {
                if (tagsInputStr.length === 0) {
                  setTagsInputStr(el);
                  return;
                }

                setTagsInputStr(tagsInputStr.concat(", " + el));
              }}
              key={i}
            >
              {el}
            </p>
          );
        })
      )}

    
    </div>
  );
}

export default SelectableList;
