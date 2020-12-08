import React, { useState } from "react";

import DefaultColorsToChoose from "./DefaultColorsToChoose";
import SingleColumnsColor from "./SingleColumnsColor";

import { noteColorState } from "../state/colorsState";
import { folderColorState } from "../state/colorsState";
import { columnsColorsState } from "../state/colorsState";

interface Props {
  colorsVis: boolean;
  setColorsVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function Test({ setColorsVis, colorsVis }: Props): JSX.Element {
  const [defaultColorsFor, setDefaultColorsFor] = useState<
    | "folders"
    | "notes"
    | "column_1"
    | "column_2"
    | "column_3"
    | "column_4"
    | "unselected"
  >("unselected");

  const [colorsToChooseVis, setColorsToChooseVis] = useState<boolean>(false);

  const [foldersSelected, setFoldersSelected] = useState<boolean>(false);
  const [notesSelected, setNotesSelected] = useState<boolean>(false);
  // const [columnsSelected, setColumnsSelected] = useState<boolean>(false);
  const [columnSelected, setColumnSelected] = useState<number | null>(null);

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [columnsColorData, setColumnsColorData] = columnsColorsState.use();

  function columnsRendering(howMany: number) {
    let arrOfColumns = [];
    for (let i = 1; i <= howMany; i++) {
      arrOfColumns.push(i);
    }

    return arrOfColumns.map((el, index) => {
      return (
        <SingleColumnsColor
          colNumber={el}
          // colSelected={false}
          defaultColorsFor={defaultColorsFor}
          setColorsToChooseVis={setColorsToChooseVis}
          columnSelected={columnSelected}
          setColumnSelected={setColumnSelected}
          setDefaultColorsFor={setDefaultColorsFor}
          setFoldersSelected={setFoldersSelected}
          setNotesSelected={setNotesSelected}
          key={index}
        />
      );
    });
  }

  return (
    <div
      className="flex flex-col z-50 absolute h-screen w-screen justify-center items-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
    >
      <div className="md:mb-40 relative">
        <div
          className="bg-gray-200 pb-3 pt-6 border-2 px-4 border-teal-500 rounded-sm"
          style={{ width: "350px", height: "200px" }}
        >
          <p className="text-center">Color settings</p>
          <div className="flex justify-between items-center mb-2 mt-2">
            <p
              className="w-32"
              onClick={() => {
                if (colorsVis) {
                  setColorsVis(false);
                }
              }}
            >
              Folder default
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
                setColumnSelected(null);

                setFoldersSelected((b) => !b);
              }}
              className={`h-4 w-8 bg-${folderColorData} cursor-pointer ${
                foldersSelected ? "border-2" : "border"
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

                setFoldersSelected(false);
                setColumnSelected(null);

                setNotesSelected((b) => !b);
              }}
              className={`h-4 w-8 bg-${noteColorData} cursor-pointer ${
                notesSelected ? "border-2" : "border"
              } border-black hover:border-gray-500`}
            ></div>
          </div>

          <div className="flex justify-between items-center mb-2 mt-2">
            <p className="w-32">Columns</p>
            <div className="flex">{columnsRendering(4)}</div>
          </div>

          <p className="text-center mt-5">
            {" "}
            <span
              className="text-red-600 hover:underline cursor-pointer"
              onClick={() => {
                setFolderColorData("teal-500");
                setNoteColorData("yellow-500");
                setColumnsColorData({
                  column_1: "yellow-200",
                  column_2: "orange-200",
                  column_3: "red-200",
                  column_4: "green-200",
                });
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
            top: "200px",
            left: `${
              defaultColorsFor === "column_1" ||
              "column_2" ||
              "column_3" ||
              "column_4"
                ? "93px"
                : "157px"
            }`,
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
