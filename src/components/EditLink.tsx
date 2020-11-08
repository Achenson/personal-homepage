import React from "react";
import { useState } from "react";
import { produce } from "immer";

import { linksDataState } from "../state/bookmarksAndLinks";
import { bookmarksDataState } from "../state/bookmarksAndLinks";

import { ReactComponent as SaveSVG } from "../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../svgs/alphabet-x.svg";

interface SingleLinkData {
  title: string;
  URL: string;
  tags: string[];
}

interface Props {
  setEditLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
  editSingleLinkData: SingleLinkData;
}

function EditLink({ setEditLinkVis, editSingleLinkData }: Props): JSX.Element {
  const [linksData, setLinksData] = linksDataState.use();
  const [bookmarksData, setBookmarksData] = linksDataState.use();

  const [titleInput, setTitleInput] = useState<string>(
    editSingleLinkData.title
  );

  const [urlInput, setUrlInput] = useState<string>(editSingleLinkData.URL);
  const [tagsInput, setTagsInput] = useState<string[]>([
    ...editSingleLinkData.tags,
  ]);




  let linkIndex: number;

  linksData.forEach((obj, i) => {
    if (obj.title === editSingleLinkData.title) {
      linkIndex = i;
    }
  });

  return (
    <div className="absolute z-40 bg-gray-100 w-full pb-3 border">
      <form action="" className="pl-2 pr-4">
        <div className="flex justify-around mb-2 mt-2">
          <p className="w-8">Title</p>
          <div className="w-full pl-4">
            <input
              type="text"
              className="w-full  border"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-around mb-2">
          <p className="w-8">Link</p>
          <div className="w-full pl-4">
            <input
              type="text"
              className="w-full  border"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-start mb-2">
          <p className="w-8">Tags</p>
          <div className="w-full pl-4">
            <input
              type="text"
              className="w-full border"
              value={tagsInput.join(", ")}
              onChange={(e) => setTagsInput([...e.target.value.split(", ")])}
            />
          </div>
        </div>

        <div className="flex justify-start mt-3">
          <p className="w-8"></p>
          <div className="w-full pl-4 flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();

                setLinksData((previous) =>
                  produce(previous, (updated) => {
                    updated[linkIndex].title = titleInput;
                    updated[linkIndex].URL = urlInput;
                    updated[linkIndex].tags = [...tagsInput];
                  })
                );


                

                setEditLinkVis((b) => !b);




              }}
            >
              <SaveSVG className="h-5 fill-current text-gray-900 mr-3 hover:text-green-600" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setEditLinkVis((b) => !b);
              }}
            >
              <CancelSVG className="h-5 fill-current text-gray-900 ml-3 hover:text-red-600" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditLink;
