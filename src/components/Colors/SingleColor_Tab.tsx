import React from "react";
import { tabsDataState } from "../../state/tabsAndBookmarks";
import { produce } from "immer";

interface Props {
  color: string;
  // tabTitle: string;
  tabID: number | string;
}

function SingleColor_Tab({ color, tabID }: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();


  return (
    <div
      className={`h-4 w-8 bg-${color} cursor-pointer border border-black hover:border-gray-500`}
      onClick={() => {
        setTabsData((previous) =>
          produce(previous, (updated) => {
            let tabToChange = updated.find(obj => obj.id === tabID)

            if (tabToChange) {
              tabToChange.color = `${color}`;
            }
          })
        );
      }}
    ></div>
  );
}

export default SingleColor_Tab;
