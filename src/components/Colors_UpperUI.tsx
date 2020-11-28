import React from "react";

interface Props {
  colorsVis: boolean;
  setColorsVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function Test({ setColorsVis, colorsVis }: Props): JSX.Element {
  return (
    <div
      className="flex z-50 absolute h-screen w-screen items-center justify-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}

      //   onClick={ () => {
      //     if(colorsVis) {
      //         setColorsVis(false)
      //     }
      //   }}
    >
      <div
        className="bg-gray-200 pb-3 pt-6 border-2 border-teal-500 rounded-sm md:mb-48"
        style={{ width: "350px" }}
      >
        <div className="pl-2 pr-4">
          <p className="text-center">Default color settings</p>
          <div className="flex justify-around items-center mb-2 mt-2">
            <p
              className="w-32"
              onClick={() => {
                if (colorsVis) {
                  setColorsVis(false);
                }
              }}
            >
              Folders
            </p>
            <div
              className={`h-4 w-8 bg-teal-500 cursor-pointer border border-black hover:border-gray-500`}
            ></div>
          </div>
          <div className="flex justify-around items-center mb-2 mt-2">
            <p
              className="w-32"
              onClick={() => {
                if (colorsVis) {
                  setColorsVis(false);
                }
              }}
            >
              Notes
            </p>
            <div
              className={`h-4 w-8 bg-teal-500 cursor-pointer border border-black hover:border-gray-500`}
            ></div>
          </div>
          <div className="flex justify-around items-center mb-2 mt-2">
            <p
              className="w-32"
              onClick={() => {
                if (colorsVis) {
                  setColorsVis(false);
                }
              }}
            >
              Columns
            </p>
            <div
              className={`h-4 w-8 bg-teal-500 cursor-pointer border border-black hover:border-gray-500`}
            ></div>
          </div>

          <p className="text-center mt-5"> <span className="text-red-600 hover:underline cursor-pointer">RESET</span> all colours to default</p>








        </div>



      </div>
    </div>
  );
}

export default Test;
