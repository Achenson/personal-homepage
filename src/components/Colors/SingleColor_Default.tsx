import React from "react";
import { folderColorState } from "../../state/colorsState";
import { noteColorState } from "../../state/colorsState";
import { rssColorState } from "../../state/colorsState";
// import { uiColorState } from "../../state/colorsState";
import { columnsColorsState } from "../../state/colorsState";
import { uiColorState } from "../../state/colorsState";

import { produce } from "immer";

interface Props {
  color: string;
  // tabTitle: string;
  defaultColorsFor:
    | "folders"
    | "notes"
    | "rss"
    | "column_1"
    | "column_2"
    | "column_3"
    | "column_4"
    | "unselected";
}

function SingleColor_Default({ color, defaultColorsFor }: Props): JSX.Element {
  // const [tabsData, setTabsData] = tabsDataState.use();



  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [rssColorData, setRssColorData] = rssColorState.use();
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();
  const [uiColorData, setUiColorData] = uiColorState.use();

  function borderMaker(
    defaultColorsFor:
      | "folders"
      | "notes"
      | "rss"
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

    if (defaultColorsFor === "rss") {
      if (color !== rssColorData) {
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

    function colorRgx(color: string) {
        return new RegExp(`${color}-`)
    }

    if (colorRgx("gray").test(color) || colorRgx("Gray").test(color)) {
      setUiColorData("blueGray-400");
    }

    if (colorRgx("yellow").test(color) || colorRgx("amber").test(color)) {
      setUiColorData("yellow-500");
    }

    if (colorRgx("orange").test(color)) {
      setUiColorData("orange-500");
    }

    if (colorRgx("red").test(color)) {
      setUiColorData("red-400");
    }

    if (
      colorRgx("lime").test(color) || colorRgx("green").test(color) ||
      colorRgx("emarald").test(color) ||
      colorRgx("teal").test(color)
    ) {
      setUiColorData("teal-500");
    }

    if (colorRgx("cyan").test(color) || colorRgx("lightBlue").test(color)) {
      setUiColorData("lightBlue-500");
    }

    if (colorRgx("blue").test(color) || colorRgx("indigo").test(color)) {
      setUiColorData("blue-500");
    }

    if (colorRgx("violet").test(color) || colorRgx("purple").test(color)) {
      setUiColorData("violet-500");
    }

    if (colorRgx("fuchsia").test(color)) {
      setUiColorData("fuchsia-500");
    }

    if (colorRgx("rose").test(color)) {
      setUiColorData("rose-400");
    }

    if (colorRgx("pink").test(color)) {
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

        if (defaultColorsFor === "rss") {
          setRssColorData(color)
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

     
      }}
    ></div>
  );
}

export default SingleColor_Default;
