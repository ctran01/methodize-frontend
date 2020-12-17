import React, { useState, useContext } from "react";
import { RiMenuFill, RiMenuFoldLine } from "react-icons/ri";
import { Context as TaskContext } from "../../context/store/TaskStore";
const PopOutTask = ({ showSideMenu, sideMenu }) => {
  const [open, setOpen] = useState(true);

  const [taskState, taskdispatch] = useContext(TaskContext);

  return (
    <>
      {/* <div className="task-detail-menu-container"> */}
      <div
        className={
          sideMenu ? "task-detail-menu active" : "task-detail-menu collapsed"
        }
      >
        {taskState.selectedTask.name}
        <div className="collapse-menu-icon-container">
          <RiMenuFoldLine
            style={{
              color: "black",
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={showSideMenu}
          />
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default PopOutTask;
