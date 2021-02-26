import React from "react";
import { tabsDataState } from "../../state/tabsAndBookmarks";
import { produce } from "immer";

interface Props {
  color: string;
  tabTitle: string;
}

function SingleColor({ color, tabTitle }: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();

  let tabIndex: number;

  tabsData.forEach( (obj, i) => {
    if (obj.title === tabTitle) {
      tabIndex = i
    }
  })

  return (
    <div
      className={`h-4 w-8 bg-${color} cursor-pointer border border-black hover:border-gray-500`}
      onClick={() => {
        setTabsData((previous) =>
          produce(previous, (updated) => {
            updated[tabIndex].color = `${color}`;
          })
        );
      }}
    ></div>
  );
}

export default SingleColor;
