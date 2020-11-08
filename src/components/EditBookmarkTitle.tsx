import React from 'react'
import {useState} from 'react'

import { ReactComponent as SaveSVG } from "../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../svgs/alphabet-x.svg";

import { bookmarksDataState } from "../state/bookmarksAndLinks";

interface Props {
    bookmarkTitle: string;
}

function EditBookmarkTitle ({bookmarkTitle}: Props): JSX.Element{

   

    const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

    const [bookmarkTitleInput, setBookmarkTitleInput] = useState<string>(
        bookmarkTitle
      );

    return (
        <div className="absolute z-40 bg-gray-100 w-full pb-3 border">
        <form action="" className="pl-2 pr-4">
          <div className="flex justify-around mb-2 mt-2">
            <p className="w-8">Title</p>
            <div className="w-full pl-4">
              <input
                type="text"
                className="w-full  border"
                value={bookmarkTitleInput}
                onChange={(e) => setBookmarkTitleInput(e.target.value)}
              />
            </div>
          </div>
      
      
          {/* {tagErrorVis ? (
            <p className={`text-red-600`}>
              Tags should consist of words separated by coma and space
            </p>
          ) : null} */}
  
          {/* <div className="flex justify-start mt-3">
            <p className="w-8"></p>
            <div className="w-full pl-4 flex justify-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
  
                  // if(tagsInput.join(", "))
  
                  if (!regexForTags.test(tagsInput.join(", "))) {
                    setTagErrorVis(true);
                    return;
                  }
  
                  setTagErrorVis(false);
  
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
          </div> */}


        </form>
      </div>
    )
}

export default EditBookmarkTitle;