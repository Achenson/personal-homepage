import React from 'react';

import { tabBeingDraggedColor_State } from "../state/colorsState";

interface Props {
  colNumber: number;
  tabID: number | string | null;
  picBackground: boolean;
}

function GapLast({
colNumber,
tabID,
picBackground

}: Props): JSX.Element{

  const [
    tabBeingDraggedColor_Data,
    setTabBeingDraggedColor_Data,
  ] = tabBeingDraggedColor_State.use();


  function calcOpacityOnDrop(picBackground: boolean) {
    if (picBackground) {
      return "bg-black opacity-50";
    }

    // console.log(draggedTabColor);

    return `bg-${tabBeingDraggedColor_Data.tabColor} opacity-60`;
  }

  /* 
        //         <div className={`bg-blue-200
      //         ${isOver ? calcOpacityOnDrop(picBackground) : ""}
      //         `}
      // style={{height: "calc(100%)"}}
      // ref={drop}
      // >
       
      // </div>
  
  */

    return (
      <div>
        null
      </div>
        

       
    )
};

export default GapLast;