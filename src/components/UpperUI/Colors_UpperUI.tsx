import React, { useState } from "react";

import ColorsToChoose_Default from "../Colors/ColorsToChoose_Default";

import {
  noteColorState,
  folderColorState,
  rssColorState,
  uiColorState,
  resetColorsState,
} from "../../state/colorsState";

import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";

import {UpperVisAction} from "../../utils/interfaces"

interface Props {
  // colorsVis: boolean;
  // setColorsVis: React.Dispatch<React.SetStateAction<boolean>>;
  upperVisDispatch: React.Dispatch<UpperVisAction>
}

function Colors_UpperUI({ upperVisDispatch }: Props): JSX.Element {
  const [defaultColorsFor, setDefaultColorsFor] = useState<
    | "folders"
    | "notes"
    | "rss"
    // | "column_1"
    // | "column_2"
    // | "column_3"
    // | "column_4"
    | "unselected"
  >("unselected");

  const [colorsToChooseVis, setColorsToChooseVis] = useState<boolean>(false);

  const [tabsSelected, setTabsSelected] = useState<boolean>(false);
  const [notesSelected, setNotesSelected] = useState<boolean>(false);
  const [rssSelected, setRssSelected] = useState<boolean>(false);
  // const [columnsSelected, setColumnsSelected] = useState<boolean>(false);
  // const [columnSelected, setColumnSelected] = useState<number | null>(null);

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [rssColorData, setRssColorData] = rssColorState.use();
  const [uiColorData, setUiColorData] = uiColorState.use();
  const [resetColorsData, setResetColorsData] = resetColorsState.use();
  // const [columnsColorData, setColumnsColorData] = columnsColorsState.use();

  function calcColorTop(
    defaultColorsFor: "folders" | "notes" | "rss" | "unselected"
  ) {
    if (defaultColorsFor === "folders") {
      return "90px";
    }

    if (defaultColorsFor === "notes") {
      return "122px";
    }

    if (defaultColorsFor === "rss") {
      return "154px";
    }

    if (defaultColorsFor === "unselected") {
      return "0px";
    }
  }

  return (
    <div
      className="flex flex-col z-50 absolute h-screen w-screen justify-center items-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
    >
      <div className="md:mb-40 relative">
        <div
          className={`bg-gray-200 pb-3 pt-5 border-2 px-4 border-${uiColorData} rounded-sm relative`}
          style={{ width: "417px", height: "200px" }}
        >
          <div className="absolute right-0 top-0 mt-1 mr-1">
            <CancelSVG
              className="h-5 fill-current text-gray-600 cursor-pointer hover:text-gray-900"
              onClick={() => {
                // if (colorsVis) {
                //   setColorsVis(false);
                // }
                upperVisDispatch({type: "COLORS_SETTINGS_TOGGLE"})
              }}
            />
          </div>

          <p className="text-center">Color settings</p>
          <div className="flex justify-between items-center mb-2 mt-2">
            <p className="w-32">Folder default</p>
            <div
              onClick={() => {
                setDefaultColorsFor("folders");

                if (defaultColorsFor === "folders") {
                  setColorsToChooseVis((b) => !b);
                } else {
                  setColorsToChooseVis(true);
                }

                setNotesSelected(false);
                setRssSelected(false);
                // setColumnSelected(null);

                setTabsSelected((b) => !b);
              }}
              className={`h-4 w-8 bg-${folderColorData} cursor-pointer ${
                tabsSelected ? "border-2" : "border"
              } border-black hover:border-gray-500`}
            ></div>
          </div>
          <div className="flex justify-between items-center mb-2 mt-2">
            <p className="w-32">Notes default</p>
            <div
              onClick={() => {
                setDefaultColorsFor("notes");

                if (defaultColorsFor === "notes") {
                  setColorsToChooseVis((b) => !b);
                } else {
                  setColorsToChooseVis(true);
                }

                setTabsSelected(false);
                setRssSelected(false);
                // setColumnSelected(null);

                setNotesSelected((b) => !b);
              }}
              className={`h-4 w-8 bg-${noteColorData} cursor-pointer ${
                notesSelected ? "border-2" : "border"
              } border-black hover:border-gray-500`}
            ></div>
          </div>
          <div className="flex justify-between items-center mb-2 mt-2">
            <p className="w-32">RSS default</p>
            <div
              onClick={() => {
                setDefaultColorsFor("rss");

                if (defaultColorsFor === "rss") {
                  setColorsToChooseVis((b) => !b);
                } else {
                  setColorsToChooseVis(true);
                }

                setTabsSelected(false);
                setNotesSelected(false);

                // setColumnSelected(null);

                setRssSelected((b) => !b);
              }}
              className={`h-4 w-8 bg-${rssColorData} cursor-pointer ${
                rssSelected ? "border-2" : "border"
              } border-black hover:border-gray-500`}
            ></div>
          </div>

          {/* <div className="flex justify-between items-center mb-2 mt-2">
            <p className="w-32">Columns</p>
            <div className="flex">{columnsRendering(4)}</div>
          </div> */}

          <p className="text-center mt-5">
            {" "}
            <span
              className="text-red-600 hover:underline cursor-pointer"
              onClick={() => {
                // setFolderColorData("teal-500");
                // setNoteColorData("yellow-500");
              setResetColorsData(true);
              }}
            >
              RESET
            </span>{" "}
            all colours to default
          </p>
        </div>

        <div
          className="absolute"
          style={{
            // top: "200px",
            // left: "93px"

            top: calcColorTop(defaultColorsFor),
            left: "300px",
            // `${
            // defaultColorsFor === "column_1" ||
            // "column_2" ||
            // "column_3" ||
            // "column_4"
            //   ? "93px"
            //   :
            // "157px"
          }}
        >
          {colorsToChooseVis ? (
            <div className="absolute" style={{left: "67px"}}>
              <ColorsToChoose_Default defaultColorsFor={defaultColorsFor} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Colors_UpperUI;
