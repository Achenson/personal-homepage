import React from 'react';

import { backgroundColors} from "../../utils/backgroundColors";


import SingleColor_Background from './SingleColor_Background';

interface Props {

}

function BackgroundColorsToChoose({}: Props): JSX.Element{
   
  
  
  function mapBackgroundColors() {
    return backgroundColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor_Background
                // defaultColorsFor="column_4"
                color={el}
                key={j}
              />
            );
          })}
        </div>
      );
    });
  }
  
  
  return (
      <div className="z-50 relative">
      <div className="absolute bg-white" style={{ left: "-93px", top: "104px" }}>
          {mapBackgroundColors()}
      </div>
    </div>
    )
};

export default BackgroundColorsToChoose;