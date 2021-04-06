import React from "react";

interface Props {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  // to change types?
  descriptionVis: boolean | null | undefined;
  dateVis: boolean | null | undefined;
}

function SingeRssNews({
  title,
  link,
  pubDate,
  description,
  descriptionVis,
  dateVis,
}: Props): JSX.Element {
  // if (title === "loading data...") {
  //   return <div>{title}</div>;
  // }
  // const [tabsData, setTabsData] = tabsDataState.use();

  // let currentTab = tabsData.filter((obj) => obj.id === tabID);

  function renderDescription(descripion: string) {
    let descriptionSplitted = descripion.split(" ");

    let newArr: string[] = [];

    for (let i = 0; i < 25; i++) {
      newArr.push(descriptionSplitted[i]);
    }

    return newArr.join(" ") + "...";
  }

  return (
    <div className="bg-gray-50 py-1 px-2 border-b border-l border-r">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline text-lightBlue-700 "
      >
        {title}
      </a>
      <p>{descriptionVis && renderDescription(description)}</p>
      <p>{dateVis && pubDate}</p>
    </div>
  );
}

export default SingeRssNews;
