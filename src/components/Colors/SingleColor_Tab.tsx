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



  function borderMaker() {
  

      let currentTab = tabsData.find(obj => obj.id === tabID)

  //@ts-ignore
      if (color !== currentTab.color) {
        return "border border-black";
      }

      return "border-2 border-white";
    
  }


  return (
    <div
      className={`h-4 w-8 bg-${color} cursor-pointer ${borderMaker()} hover:border-gray-500`}
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
