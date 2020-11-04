import React from "react";
import Bookmark from "./Bookmark";

interface Props {}

function Grid({}: Props): JSX.Element {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-4">
      <div className="bg-yellow-200">
        <Bookmark/>  1
      </div>
      <div className="hidden sm:block bg-orange-200">2</div>
      <div className="hidden md:block bg-red-200">3</div>
      <div className="hidden lg:block bg-green-200">4</div>
    </div>
  );
}

export default Grid;
