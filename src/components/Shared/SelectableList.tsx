import React, { useState, useEffect } from "react";

interface Props {
  selectablesInputStr: string;
  setSelectablesInputStr: React.Dispatch<React.SetStateAction<string>>;
  visibleSelectables: string[];

  marginTop: string;
  setWasAnythingClicked?: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectableList({
  setSelectablesInputStr,
  selectablesInputStr,
  visibleSelectables,

  marginTop,
  setWasAnythingClicked,
}: Props): JSX.Element {
  let visibleSelectables_sorted = visibleSelectables.sort();

  const [selectableToHighlight, setSelectableToHighlight] = useState<
    null | number
  >(null);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // !!!! without this everything will be recalculated from start - lag
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  function handleKeyDown(event: KeyboardEvent) {
    // if (visibleSelectables_sorted.length === 0) {
    //   return;
    // }

    switch (event.code) {
      case "ArrowUp":
        highlightHigher();
        return;
      case "ArrowDown":
        highlightLower();
        return;
      case "ArrowRight":
        chooseCurrent();
        return;

      case "Enter":
        chooseCurrent();
        return;
      case "Delete":
        setSelectablesInputStr("");
        return;

      default:
        return;
    }

    function highlightHigher() {
      if (visibleSelectables_sorted.length === 0) {
        return;
      }

      if (selectableToHighlight === 0) {
        return;
      }

      if (selectableToHighlight === null) {
        setSelectableToHighlight(0);
        return;
      }

      setSelectableToHighlight((nr) => (nr as number) - 1);
    }

    function highlightLower() {}

    function chooseCurrent() {}
  }

  return (
    <div
      className="absolute z-50 bg-white w-full border border-t-0"
      // style={{ width: "271px", marginLeft: "42px" }}
      style={{ marginTop: marginTop }}
    >
      {visibleSelectables_sorted.length === 0 ? (
        <p className="invisible">[empty]</p>
      ) : (
        visibleSelectables_sorted.map((el, i) => {
          return (
            <p
              className={`cursor-pointer ${
                selectableToHighlight === i ? "bg-blueGray-200" : ""
              } pl-px truncate`}
              onClick={() => {
                if (visibleSelectables_sorted.length === 0) {
                  return;
                }

                if (selectableToHighlight !== i) {
                  return;
                }

                if (setWasAnythingClicked) {
                  (setWasAnythingClicked as React.Dispatch<
                    React.SetStateAction<boolean>
                  >)(true);
                }

                if (selectablesInputStr.length === 0) {
                  setSelectablesInputStr(el);
                  return;
                }

                setSelectablesInputStr(selectablesInputStr.concat(", " + el));
              }}
              onMouseEnter={() => {
                setSelectableToHighlight(i);
              }}
              onMouseLeave={() => {
                setSelectableToHighlight(null);
              }}
              key={i}
            >
              {el}
            </p>
          );
        })
      )}
    </div>
  );
}

export default SelectableList;
