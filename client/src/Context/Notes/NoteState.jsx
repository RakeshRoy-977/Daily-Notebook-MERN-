import React from "react";
import NoteContext from "./NoteContext";

const NoteStateProvider = ({ children }) => {
  const state = {
    name: "Rakesh",
  };
  return <NoteContext.Provider value={state}>{children}</NoteContext.Provider>;
};

export default NoteStateProvider;
