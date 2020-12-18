import React, { useState, useContext } from "react";
import { RiCloseLine, RiMenuFoldLine } from "react-icons/ri";
import { Context as TaskContext } from "../../context/store/TaskStore";
import moment from "moment";
import UserAvatar from "../NavigationBar/UserAvatar";

const PopOutTask = ({ showSideMenu, sideMenu }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [taskState, taskdispatch] = useContext(TaskContext);
  const { selectedTask: task } = taskState;
  const date = moment(
    task.due_date.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );

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
              <div className="task-details-data">
                <div style={{ display: "flex" }}>
                  <UserAvatar id={taskState.selectedTask.User.id} />
                  <p
                    style={{ margin: "0px 0px 0px 10px", alignSelf: "center" }}
                  >
                    {taskState.selectedTask.User.name}
                  </p>
                </div>
                <p style={{ marginTop: "20px" }}> {date.format("MMM D")}</p>
                <div
                  className={` task-project-${task.Project.id}`}
                  style={{
                    height: "25px",
                    borderRadius: "20px",
                    display: "flex",
                    width: "130px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ margin: 0 }}> {task.Project.name}</p>
                </div>

                <p style={{ marginTop: "17px" }}> {task.description}</p>
              </div>
            </div>
          </div>
          <div className="task-detail-comment-container">
            <div
              style={{ display: "flex", marginLeft: "40px", marginTop: "50px" }}
            >
              <div className="task-detail-comment-avatar">
                <UserAvatar id={localStorage.getItem("userId")} />
              </div>
              <div className="task-detail-comment-box">
                <form className="task-detail-description-form">
                  <textarea
                    className="comment-text"
                    placeholder="Ask a question or post an update..."
                  ></textarea>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default PopOutTask;
