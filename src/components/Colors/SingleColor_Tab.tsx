import React from "react";
import { tabsDataState } from "../../state/tabsAndBookmarks";
import { produce } from "immer";
import {folderColorState} from "../../state/colorsState"

interface Props {
  color: string;
  // tabTitle: string;
  tabID: number | string;
}

function SingleColor_Tab({ color, tabID }: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();

  const [folderColorData, setFolderColorData] = folderColorState.use()


  function borderMaker() {
  

      let currentTab = tabsData.find(obj => obj.id === tabID)

      
      //@ts-ignore
  if(currentTab.color) {
    //@ts-ignore
    if (color == currentTab.color) {
      return "border-2 border-white";
    }
  } else {
    if(color === folderColorData) {
      return "border-2 border-white";
    }
  }
      

    


      return "border border-black";
    
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
