import React, { useState } from "react";

interface Props {}

function Test({}: Props): JSX.Element {
  const [inputHover, setInputHover] = useState(false);

  /* 
  @layer components {
  .input-profile {
    @apply pl-px border border-gray-200 h-7;
  }
}
  */

  return (
    <input
      type="text"
      className="pl-px border border-gray-200 h-7 hover:border-gray-300 transition-colors duration-150"
      style={{
        // borderTopColor: `${inputHover ? "#D1D5DB" : "#9CA3AF"}`,
        borderTopColor: `${inputHover ? "#9CA3AF" : "#D1D5DB"}`,
        transitionProperty:
          "background-color, border-color, color, fill, stroke",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "150ms",
      }}
      onMouseEnter={() => {
        setInputHover(true);
      }}
      onMouseLeave={() => {
        setInputHover(false);
      }}
    />
  );
}

export default Test;
