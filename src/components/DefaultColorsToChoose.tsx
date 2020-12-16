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

const colors = [
  [
    "blueGray-303",
    // "blueGray-300",
    "blueGray-400",
    "blueGray-600",
    // "blueGray-500",
    "gray-300",
    "gray-500",
    // "gray-500",
    // "blueGray-700",
    "gray-800",
  ],
  [
    "yellow-300",
    "yellow-330",
    // "amber-300",
    "yellow-400",
    "amber-400",
    "amber-500",
    "amber-600",
  ],
  [
    "yellow-303",
    // "lime-300",
    "lime-400",
    "green-303",
    "green-400",
    "green-500",
    "green-505",
  ],

  [
    "orange-300",
    "orange-400",
    "orange-500",
    "orange-600",
    "orange-700",
    "orange-800",
  ],
  ["red-404", "orange-404", "orange-606", "red-606", "amber-700", "amber-900"],
  [
    "red-300",
    "red-400",
    "red-500",
    "red-600",
    "red-700",
    "red-800",
  ],
  [
    "rose-300",
    "rose-400",
    "rose-500",
    "rose-600",
    "rose-700",
    "rose-800",
  ],

  [
    "emerald-300",
    "emerald-400",
    "emerald-500",
    "emerald-600",
    "emerald-700",
    "emerald-800",
  ],
  [
    "teal-300",
    "teal-400",
    "teal-500",
    "teal-600",
    "teal-700",
    "teal-800",
  ],
  [
    "cyan-300",
    "cyan-400",
    "cyan-500",
    "cyan-600",
    "cyan-700",
    "cyan-800",
  ],
  [
    "blue-300",
    "blue-400",
    "blue-500",
    "blue-600",
    "blue-700",
    "blue-800",
  ],
  [
    "lightBlue-400",
    "lightBlue-600",
    "lightBlue-700",
    "blue-707",
    "blue-770",
    "blue-777",
  ],
  [
    "pink-300",
    "pink-400",
    "pink-600",
    "indigo-400",
    "indigo-600",
    "indigo-800",
  ],
  [
    "fuchsia-400",
    "fuchsia-600",
    "fuchsia-700",
    "purple-400",
    // "purple-500",
    "purple-600",
    // "purple-700",
    "purple-800",
  ],
];
// colors for columns
const colors2: string[][] = [
  ["white", "white", "white", "gray-50", "gray-100", "gray-200"],
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
