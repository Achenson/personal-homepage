import React from "react";
import Grid from "./Grid";
import UpperUI from "./UpperUI";


interface Props {}

function Main({}: Props): JSX.Element {
  return (
    <div>
      <UpperUI/>
      <Grid />
    </div>
  );
}

export default Main;
