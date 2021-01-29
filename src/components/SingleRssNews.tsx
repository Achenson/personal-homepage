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
  // const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  // let currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkID);

  function renderDescription(descripion: string) {
    let descriptionSplitted = descripion.split(" ");

    let newArr: string[] = [];

    for (let i = 0; i < 25; i++) {
      newArr.push(descriptionSplitted[i]);
    }

    return newArr.join(" ") + "...";
  }

  return (
    <div className="bg-gray-50 py-1 px-2 border-b">
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
