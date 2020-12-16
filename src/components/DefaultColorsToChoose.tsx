import React from "react";

import DefaultSingleColor from "./DefaultSingleColor";

interface Props {
  // setIconsVisibility: (value: React.SetStateAction<boolean>) => void;

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

const colors: string[][] = [
  ["white", "gray-400", "gray-500", "gray-600", "gray-700", "black"],
  [
    "yellow-300",
    "yellow-400",
    "yellow-500",
    "yellow-600",
    "yellow-700",
    "yellow-800",
  ],
  [
    "orange-300",
    "orange-400",
    "orange-500",
    "orange-600",
    "orange-700",
    "orange-800",
  ],
  ["red-300", "red-400", "red-500", "red-600", "red-700", "red-800"],
  [
    "green-300",
    "green-400",
    "green-500",
    "green-600",
    "green-700",
    "green-800",
  ],
  ["teal-300", "teal-400", "teal-500", "teal-600", "teal-700", "teal-800"],
  ["blue-300", "blue-400", "blue-500", "blue-600", "blue-700", "blue-800"],
  [
    "indigo-300",
    "indigo-400",
    "indigo-500",
    "indigo-600",
    "indigo-700",
    "indigo-800",
  ],
  [
    "purple-300",
    "purple-400",
    "purple-500",
    "purple-600",
    "purple-700",
    "purple-800",
  ],
  ["pink-300", "pink-400", "pink-500", "pink-600", "pink-700", "pink-800"],
];
// colors for columns
const colors2: string[][] = [
  [
    "white",
    "white",
    "white",
    "gray-50",
    "gray-100",
    "gray-200",
    // "blueGray-50",
    // "blueGray-100",
    // "blueGray-200",
    // "warmGray-50",
    // "warmGray-100",
    // "warmGray-200",
  ],
  [
    "yellow-50",
    "yellow-100",
    "yellow-200",
    "amber-50",
    "amber-100",
    "amber-200",
  ],
  ["orange-50", "orange-100", "orange-200", "red-50", "red-100", "red-200"],
  ["rose-50", "rose-100", "rose-200", "pink-50", "pink-100", "pink-200"],

  [
    "green-50",
    "green-100",
    "green-200",
    "emerald-50",
    "emerald-100",
    "emerald-200",
  ],
  ["teal-50", "teal-100", "teal-200", "cyan-50", "cyan-100", "cyan-200"],

  [
    "lightBlue-50",
    "lightBlue-100",
    "lightBlue-200",
    "blue-50",
    "blue-100",
    "blue-200",
  ],

  [
    "indigo-50",
    "indigo-100",
    "indigo-200",
    "violet-50",
    "violet-100",
    "violet-200",
  ],

  [
    "purple-50",
    "purple-100",
    "purple-200",
    "fuchsia-50",
    "fuchsia-100",
    "fuchsia-200",
  ],
];

function ColorsToChoose({ defaultColorsFor }: Props): JSX.Element {
  function mappingColors(colors: string[][]) {
    return colors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <DefaultSingleColor
                color={el}
                defaultColorsFor={defaultColorsFor}
                key={j}
              />
            );
          })}
        </div>
      );
    });
  }

  return (
    <div
      className="bg-gray-100 z-50"

      // onMouseEnter={() => {
      //   setIconsVisibility(true);
      // }}

      // onMouseLeave={() => {
      //   setIconsVisibility(false)
      // }}
    >
      {defaultColorsFor === "column_1" ||
      defaultColorsFor === "column_2" ||
      defaultColorsFor === "column_3" ||
      defaultColorsFor === "column_4"
        ? mappingColors(colors2)
        : mappingColors(colors)}
    </div>
  );
}

export default ColorsToChoose;
