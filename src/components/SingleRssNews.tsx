import React from "react";

interface Props {
  title: string;
  link: string;
  pubDate: string;
  descripion: string;
}

function SingeRssNews({ title, link, pubDate, descripion }: Props): JSX.Element {
  if (title === "loading data...") {
    return <div>{title}</div>;
  }
  // const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  // let currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkID);

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
      <p>
        {descripion}
      </p>
      <p>{pubDate}</p>
    </div>
  );
}

export default SingeRssNews;
