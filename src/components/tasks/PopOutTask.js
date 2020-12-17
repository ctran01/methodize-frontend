import React, { useState, useContext } from "react";
import { RiCloseLine, RiMenuFoldLine } from "react-icons/ri";
import { Context as TaskContext } from "../../context/store/TaskStore";
import moment from "moment";
import Loader from "../Loader";

const PopOutTask = ({ showSideMenu, sideMenu }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [taskState, taskdispatch] = useContext(TaskContext);
  const { selectedTask: task } = taskState;

  return (
    <>
      {/* <div className="task-detail-menu-container"> */}
      <div
        className={
          sideMenu ? "task-detail-menu active" : "task-detail-menu collapsed"
        }
      >
        <div className="task-detail-menu-container">
          <div className="task-detail-collapse-icon">
            <RiCloseLine
              style={{
                color: "black",
                fontSize: "24px",
                cursor: "pointer",
              }}
              onClick={showSideMenu}
            />
          </div>
          <div className="task-detail-menu-main-content">
            <div className="task-detail-title">
              <h2>{taskState.selectedTask.name}</h2>
            </div>
            <div className="task-details-container">
              <div className="task-details-subtitles">
                <p>Assignee</p>
                <p>Due Date</p>
                <p>Project</p>
                <p>Description</p>
              </div>
              <div className="task-details-data" style={{ marginLeft: "25px" }}>
                {/* <p> {taskState.selectedTask.User.name}</p> */}
                {/* <p> {date.format("MMM D")}</p> */}
                {/* <div
                  className={`task-project-name-container task-project-${task.Project.id}`}
                > */}
                {/* <p> {task.Project.name}</p> */}
              </div>

              {/* <p> {task.description}</p> */}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default PopOutTask;
