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

  // useEffect(() => {
  //   console.log(selectableToHighlight);
  // }, [selectableToHighlight]);

  function handleKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case "ArrowUp":
        highlightHigher();
        return;
      case "ArrowDown":
        highlightLower();
        return;
      // case "ArrowRight":
      //   if (selectableToHighlight !== null) {
      //     chooseCurrent(
      //       visibleSelectables_sorted[selectableToHighlight],
      //       "keyboard"
      //     );
      //   }
      //   return;
      case "Enter":
        if (selectableToHighlight !== null) {
          chooseCurrent(
            visibleSelectables_sorted[selectableToHighlight],
            "keyboard"
          );
        }
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

      if (selectableToHighlight === null) {
        setSelectableToHighlight(0);
        return;
      }

      if (selectableToHighlight === 0) {
        setSelectableToHighlight(visibleSelectables_sorted.length - 1);
        return;
      }

      // if (selectableToHighlight > visibleSelectables_sorted.length - 1) {
      //   setSelectableToHighlight(0);
      // } else {
      setSelectableToHighlight((nr) => (nr as number) - 1);
      // }
    }

    function highlightLower() {
      if (visibleSelectables_sorted.length === 0) {
        return;
      }

      if (selectableToHighlight === null) {
        setSelectableToHighlight(0);
        return;
      }

      if (selectableToHighlight === visibleSelectables_sorted.length - 1) {
        setSelectableToHighlight(0);
        return;
      }

      // if (selectableToHighlight < visibleSelectables_sorted.length - 1) {
      setSelectableToHighlight((nr) => (nr as number) + 1);
      // } else {
      //   setSelectableToHighlight(0);
      //  }
    }
  }

  function chooseCurrent(el: string, eventType: "mouse" | "keyboard") {
    if (visibleSelectables_sorted.length === 0) {
      return;
    }

    if (selectableToHighlight === null) {
      return;
    }

    if (setWasAnythingClicked) {
      (setWasAnythingClicked as React.Dispatch<React.SetStateAction<boolean>>)(
        true
      );
    }

    if (selectablesInputStr.length === 0) {
      setSelectablesInputStr(el);
    } else {
      setSelectablesInputStr(selectablesInputStr.concat(", " + el));
    }

    if (eventType === "keyboard") {
      // return if the array will be empty on the next render
      if (visibleSelectables_sorted.length === 1) {
        return;
      }

      // if the array will be shorter on the next render, highlight last item in the array
      if (selectableToHighlight === visibleSelectables_sorted.length - 1) {
        setSelectableToHighlight((nr) => (nr as number) - 1);
      }
    }
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
              }  pl-px truncate`}
              onClick={() => {
                if (selectableToHighlight !== i) {
                  return;
                }

                chooseCurrent(el, "mouse");
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
