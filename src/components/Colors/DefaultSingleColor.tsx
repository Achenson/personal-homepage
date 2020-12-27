import React from "react";
import { folderColorState } from "../../state/colorsState";
import { noteColorState } from "../../state/colorsState";
// import { uiColorState } from "../../state/colorsState";
import { columnsColorsState } from "../../state/colorsState";
import { uiColorState } from "../../state/colorsState";

import { produce } from "immer";

interface Props {
  color: string;
  // bookmarkTitle: string;
  defaultColorsFor:
    | "folders"
    | "notes"
    | "column_1"
    | "column_2"
    | "column_3"
    | "column_4"
    | "unselected";
}

function DefaultSingleColor({ color, defaultColorsFor }: Props): JSX.Element {
  // const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  // let bookmarkIndex: number;

  // bookmarksData.forEach( (obj, i) => {
  //   if (obj.title === bookmarkTitle) {
  //     bookmarkIndex = i
  //   }
  // })

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();
  const [uiColorData, setUiColorData] = uiColorState.use();

  function borderMaker(
    defaultColorsFor:
      | "folders"
      | "notes"
      | "column_1"
      | "column_2"
      | "column_3"
      | "column_4"
      | "unselected"
  ) {
    if (defaultColorsFor === "unselected") {
      return "border border-black";
    }

    // const arrForLightSelect = ["blueGray-303", "blueGray-404", "gray-404", "yellow-300", "yellow-330", "yellow-400", "lime-400", "orange-300"];

    if (defaultColorsFor === "folders") {
      if (color !== folderColorData) {
        return "border border-black";
      }

      return "border-2 border-white";
    }

    if (defaultColorsFor === "notes") {
      if (color !== noteColorData) {
        return "border border-black";
      }

      return "border-2 border-white";
    }

    // return color === columnsColorsData[defaultColorsFor] ? true : false;

    if (defaultColorsFor === "column_1") {
      if (color !== columnsColorsData.column_1) {
        return "border border-black";
      }

      return "border-2 border-black";
    }

    if (defaultColorsFor === "column_2") {
      if (color !== columnsColorsData.column_2) {
        return "border border-black";
      }

      return "border-2 border-black";
    }

    if (defaultColorsFor === "column_3") {
      if (color !== columnsColorsData.column_3) {
        return "border border-black";
      }

      return "border-2 border-black";
    }

    if (defaultColorsFor === "column_4") {
      if (color !== columnsColorsData.column_4) {
        return "border border-black";
      }

      return "border-2 border-black";
    }
  }

  function setComplementaryUiColor(color: string) {
    let grayRgx = /gray/i;

    let yellowRgx = /yellow/;
    let amberRgx = /amber/;

    let orangeRgx = /orange/;

    let redRgx = /red/;

    let tealRgx = /teal/;
    let greenRgx = /green/;
    let limeRgx = /lime/;
    let emeraldRgx = /emerald/;

    let cyanRgx = /cyan/;
    let lightBlueRgx = /lightBlue/;

    let blueRgx = /blue/;
    let indigoRgx = /indigo/;

    let violetRgx = /violet/;
    let purpleRgx = /purple/;
    let fuchsiaRgx = /fuchsia/;

    let roseRgx = /rose/;
    let pinkRgx = /pink/;

    if (grayRgx.test(color)) {
      setUiColorData("blueGray-400");
    }

    if (yellowRgx.test(color) || amberRgx.test(color)) {
      setUiColorData("yellow-500");
    }

    if (orangeRgx.test(color)) {
      setUiColorData("orange-500");
    }

    if (redRgx.test(color)) {
      setUiColorData("red-400");
    }

    if (
      tealRgx.test(color) ||
      greenRgx.test(color) ||
      limeRgx.test(color) ||
      emeraldRgx.test(color)
    ) {
      setUiColorData("teal-500");
    }

    if (cyanRgx.test(color) || lightBlueRgx.test(color)) {
      setUiColorData("lightBlue-500");
    }

    if (blueRgx.test(color) || indigoRgx.test(color)) {
      setUiColorData("blue-500");
    }

    if (violetRgx.test(color) || purpleRgx.test(color)) {
      setUiColorData("violet-500");
    }

    if (fuchsiaRgx.test(color)) {
      setUiColorData("fuchsia-500");
    }

    if (roseRgx.test(color)) {
      setUiColorData("rose-400");
    }

    if (pinkRgx.test(color)) {
      setUiColorData("pink-400");
    }
  }

  return (
    <div
      className={`h-4 w-8 bg-${color} cursor-pointer ${
        // isThisSelected(defaultColorsFor) ? "border-2" : "border"
        borderMaker(defaultColorsFor)
      } hover:border-gray-400`}
      onClick={() => {
        if (defaultColorsFor === "folders") {
          setFolderColorData(color);

          setComplementaryUiColor(color);
        }

        if (defaultColorsFor === "notes") {
          setNoteColorData(color);
        }

        if (
          defaultColorsFor === "column_1" ||
          "column_2" ||
          "column_3" ||
          "column_4"
        ) {
          setColumnsColorsData((previous) =>
            produce(previous, (updated) => {
              updated[
                defaultColorsFor as
                  | "column_1"
                  | "column_2"
                  | "column_3"
                  | "column_4"
              ] = color;
            })
          );
        }

        // setBookmarksData((previous) =>
        //   produce(previous, (updated) => {
        //     updated[bookmarkIndex].color = `bg-${color}`;
        //   })
        // );
      }}
    ></div>
  );
}

export default DefaultSingleColor;
