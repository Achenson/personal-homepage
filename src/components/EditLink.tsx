import React from "react";

import { ReactComponent as SaveSVG } from "../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../svgs/alphabet-x.svg";

interface Props {
  setEditLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditLink({ setEditLinkVis }: Props): JSX.Element {
  return (
    <div className="absolute z-40 bg-gray-100 w-full pb-3 border">
      <form action="" className="pl-2 pr-4">
        <div className="flex justify-around mb-2 mt-2">
          <p className="w-8">URL</p>
          <div className="w-full pl-4">
            <input type="text" className="w-full  border" />
          </div>
        </div>
        <div className="flex justify-around mb-2">
          <p className="w-8">Title</p>
          <div className="w-full pl-4">
            <input type="text" className="w-full  border" />
          </div>
        </div>
        <div className="flex justify-start mb-2">
          <p className="w-8">Tags</p>
          <div className="w-full pl-4">
            <input type="text" className="w-full border" />
          </div>
        </div>

        <div className="flex justify-start mt-3">
          <p className="w-8"></p>
          <div className="w-full pl-4 flex justify-center">
            <button>
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

        {/* <div className="flex justify-center">
          <button >
            <SaveSVG className="h-5 fill-current text-gray-900" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setEditLinkVis((b) => !b);
            }}
            className="ml-5"
          >
            <CancelSVG className="h-5 fill-current text-gray-900" />
          </button>
        </div> */}
      </form>
    </div>
  );
}

export default EditLink;
