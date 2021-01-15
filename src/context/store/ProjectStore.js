import React, { createContext, useReducer } from "react";
import Reducer from "../reducer/ProjectReducer";

const initialState = {
  projects: [],
  userProject: [],
};

const ProjectStore = ({ children }) => {
  const [projectState, projectdispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[projectState, projectdispatch]}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);
export default ProjectStore;
