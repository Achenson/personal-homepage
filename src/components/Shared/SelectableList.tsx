import React, { useState, useEffect } from "react";





interface Props {
  selectablesInputStr: string;
  setSelectablesInputStr: React.Dispatch<React.SetStateAction<string>>;
  visibleSelectables: string[];
  width: string;
  marginLeft: string;
}

function SelectableList({
  setSelectablesInputStr,
  selectablesInputStr,
  visibleSelectables,
  width,
  marginLeft
}: Props): JSX.Element {
  

  return (
    <div
      className="absolute z-50 bg-white -mt-2"
      // style={{ width: "271px", marginLeft: "42px" }}
      style={{ width: width, marginLeft: marginLeft }}
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
