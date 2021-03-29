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
  setWasAnythingClicked
}: Props): JSX.Element {
  

  return (
    <div
      className="absolute z-50 bg-white w-full border border-t-0"
      // style={{ width: "271px", marginLeft: "42px" }}
      style={{  marginTop: marginTop }}
    >
      {visibleSelectables.length === 0 ? (
        <p className="invisible">[empty]</p>
      ) : (
        visibleSelectables.map((el, i) => {
          return (
            <p
              className="cursor-pointer hover:bg-blueGray-200 pl-px"
              onClick={() => {
                if (selectablesInputStr.length === 0) {
                  setSelectablesInputStr(el);
                  return;
                }

                (setWasAnythingClicked as React.Dispatch<React.SetStateAction<boolean>>)(true);

                setSelectablesInputStr(selectablesInputStr.concat(", " + el));
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
