import React from "react";
import SingleColor from "./SingleColor";

interface Props {
  setIconsVisibility: (value: React.SetStateAction<boolean>) => void;
  bookmarkTitle: string;
}

const colors = [
  // [
  //   "blueGray-303",

  //   "blueGray-400",
  //   "blueGray-600",

  //   "gray-300",
  //   "gray-500",
  //   // "warmGray-400",

  //   "gray-800",
  // ],
  [
    "blueGray-303",
    // "gray-300",
    "gray-404",
    // "gray-400",
    // "blueGray-400",
    "blueGray-600",

    // "gray-300",
    // "gray-500",
    // "warmGray-303",
    "warmGray-404",
    "warmGray-600",
    "gray-800",
    // "warmGray-300",
    // "warmGray-400",
    // "warmGray-500",
    // "warmGray-600",
    // "warmGray-700",
  ],
  [
    // "yellow-303",
    "yellow-300",
    "yellow-330",
    // "amber-300",
    "yellow-400",
    "amber-400",
    "amber-500",
    "amber-600",
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
  ["red-300", "red-400", "red-500", "red-600", "red-700", "red-800"],




  [
    "lime-400",
    "green-303",
    "lime-500",
    // "lime-600",

    "green-400",
    "green-500",
    // "green-600",
    "green-505",
    // "lime-300",
    // "lime-700",
    // "lime-800",
    // "green-700",
  ],
  [
    "emerald-300",
    "emerald-400",
    "emerald-500",
    "emerald-600",
    "emerald-700",
    "emerald-800",
  ],
  ["teal-300", "teal-400", "teal-500", "teal-600", "teal-700", "teal-800"],
  ["cyan-300", "cyan-400", "cyan-500", "cyan-600", "cyan-700", "cyan-800"],
  ["blue-300", "blue-400", "blue-500", "blue-600", "blue-700", "blue-800"],
  [
    "lightBlue-400",
    "lightBlue-600",
    "lightBlue-700",
    "blue-707",
    "blue-770",
    "blue-777",
  ],
  [
    "violet-300",
    "violet-400",
    //  "violet-500",
    "violet-600",

    "indigo-400",
    "indigo-600",
    "indigo-800",

    //  "purple-700",
    //  "purple-800",
  ],
  [
    // "purple-300",
    "purple-400",
    // "purple-500",
    "purple-600",
    // "purple-700",
    "purple-800",
    "fuchsia-400",
    "fuchsia-600",
    "fuchsia-700",

  ],
  [
    "rose-400",
    // "rose-500",
    "rose-600",
    "rose-700",
    "pink-300",
    "pink-400",
    "pink-600",
    // "rose-300",
 

    // "rose-800",
  ],

];

// const colorsBackup2 = [
//   [
//     "blueGray-303",
//     // "blueGray-300",
//     "blueGray-400",
//     "blueGray-600",
//     // "blueGray-500",
//     "gray-300",
//     "gray-500",
//     // "gray-500",
//     // "blueGray-700",
//     "gray-800",
//   ],
//   [
//     "yellow-300",
//     "yellow-330",
//     // "amber-300",
//     "yellow-400",
//     "amber-400",
//     "amber-500",
//     "amber-600",
//   ],
//   [
//     "yellow-303",
//     // "lime-300",
//     "lime-400",
//     "green-303",
//     "green-400",
//     "green-500",
//     "green-505",
//   ],

//   [
//     "orange-300",
//     "orange-400",
//     "orange-500",
//     "orange-600",
//     "orange-700",
//     "orange-800",
//   ],
//   ["red-404", "orange-404", "orange-606", "red-606", "amber-700", "amber-900"],
//   [
//     "red-300",
//     "red-400",
//     "red-500",
//     "red-600",
//     "red-700",
//     "red-800",
//   ],
//   [
//     "rose-300",
//     "rose-400",
//     "rose-500",
//     "rose-600",
//     "rose-700",
//     "rose-800",
//   ],

//   [
//     "emerald-300",
//     "emerald-400",
//     "emerald-500",
//     "emerald-600",
//     "emerald-700",
//     "emerald-800",
//   ],
//   [
//     "teal-300",
//     "teal-400",
//     "teal-500",
//     "teal-600",
//     "teal-700",
//     "teal-800",
//   ],
//   [
//     "cyan-300",
//     "cyan-400",
//     "cyan-500",
//     "cyan-600",
//     "cyan-700",
//     "cyan-800",
//   ],
//   [
//     "blue-300",
//     "blue-400",
//     "blue-500",
//     "blue-600",
//     "blue-700",
//     "blue-800",
//   ],
//   [
//     "lightBlue-400",
//     "lightBlue-600",
//     "lightBlue-700",
//     "blue-707",
//     "blue-770",
//     "blue-777",
//   ],
//   [
//     "pink-300",
//     "pink-400",
//     "pink-600",
//     "indigo-400",
//     "indigo-600",
//     "indigo-800",
//   ],
//   [
//     "fuchsia-400",
//     "fuchsia-600",
//     "fuchsia-700",
//     "purple-400",
//     // "purple-500",
//     "purple-600",
//     // "purple-700",
//     "purple-800",
//   ],
// ];
// const colorsBackUp = [
//   ["white", "gray-400", "gray-500", "gray-600", "gray-700", "black"],
//   [
//     "blueGray-300",
//     "blueGray-400",
//     "blueGray-500",
//     "blueGray-600",
//     "blueGray-700",
//     "blueGray-800",
//   ],
//   [
//     "warmGray-300",
//     "warmGray-400",
//     "warmGray-500",
//     "warmGray-600",
//     "warmGray-700",
//     "warmGray-800",
//   ],
//   [
//     "yellow-300",
//     "yellow-400",
//     "yellow-500",
//     "yellow-600",
//     "yellow-700",
//     "yellow-800",
//   ],
//   [
//     "amber-300",
//     "amber-400",
//     "amber-500",
//     "amber-600",
//     "amber-700",
//     "amber-800",
//   ],
//   [
//     "orange-300",
//     "orange-400",
//     "orange-500",
//     "orange-600",
//     "orange-700",
//     "orange-800",
//   ],
//   ["red-300", "red-400", "red-500", "red-600", "red-700", "red-800"],
//   ["rose-300", "rose-400", "rose-500", "rose-600", "rose-700", "rose-800"],
//   ["lime-300", "lime-400", "lime-500", "lime-600", "lime-700", "lime-800"],
//   [
//     "green-300",
//     "green-400",
//     "green-500",
//     "green-600",
//     "green-700",
//     "green-800",
//   ],
//   [
//     "emerald-300",
//     "emerald-400",
//     "emerald-500",
//     "emerald-600",
//     "emerald-700",
//     "emerald-800",
//   ],
//   ["teal-300", "teal-400", "teal-500", "teal-600", "teal-700", "teal-800"],
//   ["cyan-300", "cyan-400", "cyan-500", "cyan-600", "cyan-700", "cyan-800"],
//   [
//     "lightBlue-300",
//     "lightBlue-400",
//     "lightBlue-500",
//     "lightBlue-600",
//     "lightBlue-700",
//     "lightBlue-800",
//   ],

//   ["blue-300", "blue-400", "blue-500", "blue-600", "blue-700", "blue-800"],
//   [
//     "indigo-300",
//     "indigo-400",
//     "indigo-500",
//     "indigo-600",
//     "indigo-700",
//     "indigo-800",
//   ],

//   [
//     "violet-300",
//     "violet-400",
//     "violet-500",
//     "violet-600",
//     "violet-700",
//     "violet-800",
//   ],
//   [
//     "purple-300",
//     "purple-400",
//     "purple-500",
//     "purple-600",
//     "purple-700",
//     "purple-800",
//   ],
//   [
//     "fuchsia-300",
//     "fuchsia-400",
//     "fuchsia-500",
//     "fuchsia-600",
//     "fuchsia-700",
//     "fuchsia-800",
//   ],
//   ["pink-300", "pink-400", "pink-500", "pink-600", "pink-700", "pink-800"],
// ];

function ColorsToChoose({
  setIconsVisibility,
  bookmarkTitle,
}: Props): JSX.Element {
  function mappingColors(colors: string[][]) {
    return colors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor color={el} bookmarkTitle={bookmarkTitle} key={j} />
            );
          })}
        </div>
      );
    });
  }

  return (
    <div
      className="bg-gray-100 absolute right-0 z-50"
      onMouseEnter={() => {
        setIconsVisibility(true);
      }}
      // onMouseLeave={() => {
      //   setIconsVisibility(false)
      // }}
    >
      {mappingColors(colors)}
    </div>
  );
}

export default ColorsToChoose;
