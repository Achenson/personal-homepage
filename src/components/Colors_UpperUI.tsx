import React, { useState } from "react";

import DefaultColorsToChoose from "./DefaultColorsToChoose";

import { noteColorState } from "../state/colorsState";
import { folderColorState } from "../state/colorsState";
import { columnsColorsState } from "../state/colorsState";

interface Props {
  colorsVis: boolean;
  setColorsVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function Test({ setColorsVis, colorsVis }: Props): JSX.Element {
  const [defaultColorsFor, setDefaultColorsFor] = useState<
    "folders" | "notes" | "columns" | "unselected"
  >("unselected");

  const [colorsToChooseVis, setColorsToChooseVis] = useState<boolean>(false);

  const [foldersSelected, setFoldersSelected] = useState<boolean>(false);
  const [notesSelected, setNotesSelected] = useState<boolean>(false);
  const [columnsSelected, setColumnsSelected] = useState<boolean>(false);

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [columnsColorData, setColumnsColorData] = columnsColorsState.use();

  return (
    <div
      className="flex flex-col z-50 absolute h-screen w-screen justify-center items-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
    >
      <div className="md:mb-40 relative">
        <div
          className="bg-gray-200 pb-3 pt-6 border-2 border-teal-500 rounded-sm"
          style={{ width: "350px", height: "200px" }}
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
                onClick={() => {
                  setDefaultColorsFor("folders");

                  if (defaultColorsFor === "folders") {
                    setColorsToChooseVis((b) => !b);
                  } else {
                    setColorsToChooseVis(true);
                  }

                  setNotesSelected(false);
                  setColumnsSelected(false);

                  setFoldersSelected((b) => !b);
                }}
                className={`h-4 w-8 bg-${folderColorData} cursor-pointer ${
                  foldersSelected ? "border-2" : "border"
                } border-black hover:border-gray-500`}
              ></div>
            </div>
            <div className="flex justify-around items-center mb-2 mt-2">
              <p className="w-32">Notes</p>
              <div
                onClick={() => {
                  setDefaultColorsFor("notes");

                  if (defaultColorsFor === "notes") {
                    setColorsToChooseVis((b) => !b);
                  } else {
                    setColorsToChooseVis(true);
                  }

                  setFoldersSelected(false);
                  setColumnsSelected(false);

                  setNotesSelected((b) => !b);
                }}
                className={`h-4 w-8 bg-${noteColorData} cursor-pointer ${
                  notesSelected ? "border-2" : "border"
                } border-black hover:border-gray-500`}
              ></div>
            </div>
            <div className="flex justify-around items-center mb-2 mt-2">
              <p className="w-32">Columns</p>
              <div
                onClick={() => {
                  setDefaultColorsFor("columns");

                  if (defaultColorsFor === "columns") {
                    setColorsToChooseVis((b) => !b);
                  } else {
                    setColorsToChooseVis(true);
                  }

                  setFoldersSelected(false);
                  setNotesSelected(false);

                  setColumnsSelected((b) => !b);
                }}
                className={`h-4 w-8 bg-${columnsColorData.column1} cursor-pointer ${
                  columnsSelected ? "border-2" : "border"
                } border-black hover:border-gray-500`}
              ></div>
            </div>

            <p className="text-center mt-5">
              {" "}
              <span className="text-red-600 hover:underline cursor-pointer">
                RESET
              </span>{" "}
              all colours to default
            </p>
          </div>
        </div>

        <div
          className="absolute"
          style={{
            top: "200px",
            left: `${defaultColorsFor === "columns" ? "93px" : "157px"}`,
          }}
        >
          {colorsToChooseVis ? (
            <DefaultColorsToChoose defaultColorsFor={defaultColorsFor} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Test;
