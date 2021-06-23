import React from "react";

import { globalSettingsState } from "../../state/defaultSettings";

import { UpperVisState } from "../../utils/interfaces";

interface Props {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  // to change types?
  descriptionVis: boolean | null | undefined;
  dateVis: boolean | null | undefined;
  upperVisState: UpperVisState;
}

function SingeRssNews({
  title,
  link,
  pubDate,
  description,
  descriptionVis,
  dateVis,
  upperVisState,
}: Props): JSX.Element {
  // if (title === "loading data...") {
  //   return <div>{title}</div>;
  // }
  // const [tabsData, setTabsData] = tabsDataState.use();

  // let currentTab = tabsData.filter((obj) => obj.id === tabID);

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  function renderDescription(descripion: string) {
    if (!description) {
      return "short description unavailable";
    }

    let descriptionSplitted = descripion.split(" ");

    let newArr: string[] = [];

    for (let i = 0; i < 25; i++) {
      newArr.push(descriptionSplitted[i]);
    }

    return newArr.join(" ") + "...";
  }



  return (
    <div
      className={`bg-gray-50 py-1 px-2
    border border-t-0
    ${globalSettingsData.picBackground ? "" : "border-black border-opacity-10"}
     `}
    >
    {/*   {areButtonsDisabled() ? (
        <p className="text-lightBlue-700">{title}</p>
      ) : ( */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-lightBlue-700 focus:outline-none focus:ring-1 focus:ring-blueGray-300"
          // style={{lineHeight: "-50px"}}
        >
          {title}
        </a>
      {/* )} */}

      <p className="text-sm mt-0.5 leading-snug">
        {descriptionVis && renderDescription(description)}
      </p>
      <p className="text-xs mt-0.5 text-gray-700">{dateVis && pubDate}</p>
    </div>
  );
}

export default SingeRssNews;
