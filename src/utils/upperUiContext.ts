import React from "react";

import { UpperVisState, UpperVisAction } from "./interfaces";

interface UpperUiContext {
  upperVisState: UpperVisState;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
}

// undefined, so it can be initialised with no specific value
export const UpperUiContext = React.createContext<UpperUiContext | undefined>(
  undefined
);

// use in place of useContext in children (because Typescript)
export function useUpperUiContext() {
  const context = React.useContext(UpperUiContext);

  if (context === undefined) {
    throw new Error(
      "useUpperUiContext must be used within a UpperUiContext.Provider"
    );
  }

  return context;
}
