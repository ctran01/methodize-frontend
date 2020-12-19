import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { RiCloseLine } from "react-icons/ri";
import { Context as TaskContext } from "../../context/store/TaskStore";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import moment from "moment";
import UserAvatar from "../NavigationBar/UserAvatar";
import apiServer from "../../config/apiServer";

const PopOutTask = ({ showSideMenu, sideMenu }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [projectState, projectdispatch] = useContext(ProjectContext);
  const [projectUsers, setProjectUsers] = useState([]);
  const { selectedTask: task } = taskState;
  const date = moment(
    task.due_date.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );

  const { register, handleSubmit, clearErrors } = useForm();

  const renderedProjects = projectState.projects.map((project, i) => {
    return (
      <option key={i} id={project.id} value={project.id}>
        {project.name}
      </option>
    );
  });

  const renderedUsers = projectUsers.map((user, i) => {
    return (
      <option key={i} value={user.id}>
        {user.name}
      </option>
    );
  });

  const getProjectUsers = async (event) => {
    var projectSelect = document.getElementById("project-select");
    // var assigneeSelect = document.getElementById("assignee-select");
    clearErrors(projectSelect.name);
    // clearErrors(assigneeSelect.name);
    const res = await apiServer.get(`/project/${projectSelect.value}/team`);
    setProjectUsers(res.data.Users);
    updateProject();
  };

  const updateProject = async (e) => {
    var projectId = document.getElementById("project-select").value;
    const id = localStorage.getItem("userId");
    console.log(projectId);
    await apiServer.put(`/task/${task.id}/project/${projectId}`);
    const res = await apiServer.get(`/task/user/${id}`);
    await taskdispatch({ type: "get_user_tasks", payload: res.data });
  };

  return (
    <>
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
          <form className="task-detail-menu-main-content">
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
                  <select
                    id="assignee-select"
                    name="assigneeId"
                    className="form-input"
                    ref={register({ required: true })}
                  >
                    {renderedUsers}
                  </select>
                  {/* <p
                    style={{ margin: "0px 0px 0px 10px", alignSelf: "center" }}
                  >
                    {taskState.selectedTask.User.name}
                  </p> */}
                </div>
                <p style={{ marginTop: "20px" }}> {date.format("MMM D")}</p>
                <div
                  // className={` task-project-${task.Project.id}`}
                  style={{
                    height: "25px",
                    borderRadius: "20px",
                    // display: "flex",
                    // width: "130px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <select
                    id="project-select"
                    name="projectId"
                    className={`form-input `}
                    onChange={getProjectUsers}
                    defaultValue={task.Project.name}
                    ref={register({ required: true })}
                    onBlur={updateProject}
                    style={{
                      height: "25px",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      background: "transparent",
                      justifyContent: "center",
                    }}
                  >
                    <option
                      value={task.Project.id}
                      id={task.Project.id}
                      selected
                    >
                      {task.Project.name}
                    </option>
                    {renderedProjects}
                  </select>
                  {/* <p style={{ margin: 0 }}> {task.Project.name}</p> */}
                </div>

                <p style={{ marginTop: "17px" }}> {task.description}</p>
              </div>
            </div>
          </form>
          <div className="task-detail-comment-container">
            <div
              style={{ display: "flex", marginLeft: "40px", marginTop: "50px" }}
            >
              <div
                className="task-detail-comment-avatar"
                style={{ width: "25px", height: "25px", fontSize: "10px" }}
              >
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
    </>
  );
};

export default PopOutTask;
