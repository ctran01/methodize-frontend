import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RiCloseLine } from "react-icons/ri";
import { Context as TaskContext } from "../../context/store/TaskStore";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import moment from "moment";
import UserAvatar from "../NavigationBar/UserAvatar";
import apiServer from "../../config/apiServer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PopOutTask = ({ showSideMenu, sideMenu }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [taskState, taskdispatch] = useContext(TaskContext);
  const { selectedTask: task } = taskState;
  const [projectState, projectdispatch] = useContext(ProjectContext);
  const [teamDescription, setTeamDescription] = useState(task.description);
  const [projectUsers, setProjectUsers] = useState(task.Project.Users);
  const [assigneeUser, setAssigneeUser] = useState(task.User);

  const [dueDate, setDueDate] = useState(new Date(task.due_date));

  const date = moment(
    task.due_date.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );

  console.log(task.due_date, "task.due_date DB");
  console.log(date, "moment date convert from db");
  console.log(dueDate, "dueDate state new Date convert ");

  const { register, handleSubmit, clearErrors } = useForm();

  //This doesn't do anything for initial
  const getProjectUsers = async (event) => {
    var projectSelect = document.getElementById("project-select");
    // var assigneeSelect = document.getElementById("assignee-select");
    clearErrors(projectSelect.name);
    // clearErrors(assigneeSelect.name);
    const res = await apiServer.get(`/project/${projectSelect.value}/team`);
    const userList = res.data.Users.filter((user) => {
      return user.id !== task.User.id;
    });
    console.log(userList, "userList");
    setProjectUsers(userList);
    updateProject();
  };

  const updateProject = async (e) => {
    var projectId = document.getElementById("project-select").value;
    const userId = localStorage.getItem("userId");
    console.log(projectId);
    await apiServer.put(`/task/${task.id}/project/${projectId}`);
    const res = await apiServer.get(`/task/user/${userId}`);
    await taskdispatch({ type: "get_user_tasks", payload: res.data });
  };

  const updateAssignee = async (e) => {
    var assigneeId = document.getElementById("assignee-select").value;

    await apiServer.put(`/task/${task.id}/assignee/${assigneeId}`);
    const assignee = await apiServer.get(`/task/${task.id}`);
    setAssigneeUser(assignee.data.User);
    //updates tasks
    const userId = localStorage.getItem("userId");
    const res = await apiServer.get(`/task/user/${userId}`);
    await taskdispatch({ type: "get_user_tasks", payload: res.data });
  };

  const updateDescription = async (e) => {
    const description = e.target.value;
    await apiServer.put(`/task/${task.id}/description`, { description });

    console.log(e.target.value);
  };

  const handleDescriptionUpdate = (e) => {
    setTeamDescription(e.target.value);
  };
  useEffect(() => {}, []);

  const renderedProjects = projectState.projects
    .filter((project) => {
      return project.id !== task.Project.id;
    })
    .map((project, i) => {
      return (
        <option key={i} id={project.id} value={project.id}>
          {project.name}
        </option>
      );
    });

  const renderedUsers = projectUsers
    .filter((user) => {
      return user.id !== task.User.id;
    })
    .map((user, i) => {
      return (
        <option key={i} value={user.id}>
          {user.name}
        </option>
      );
    });

  const DateButton = ({ value, onClick }) => {
    const date = moment(value).format("MMM D");
    console.log(date);
    return (
      <button style={{ color: "blue" }} onClick={onClick}>
        {value}
      </button>
    );
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
          <div style={{ height: "90%" }}>
            <form className="task-detail-menu-main-content">
              <div className="task-detail-title">
                <h2>{task.name}</h2>
              </div>
              <div className="task-details-container">
                <div className="task-details-subtitles">
                  <p>Assignee</p>
                  <p>Due Date</p>
                  <p>Project</p>
                  <p>Description</p>
                </div>
                <div className="task-details-data">
                  <div
                    className="assignee-select-container"
                    style={{ display: "flex" }}
                  >
                    <div
                      className="user-avatar"
                      style={{
                        width: "25px",
                        height: "25px",
                        marginRight: "10px",
                      }}
                    >
                      {(
                        assigneeUser.name[0] + assigneeUser.name[1]
                      ).toUpperCase()}
                    </div>
                    <select
                      id="assignee-select"
                      name="assigneeId"
                      className="form-input"
                      ref={register({ required: true })}
                      onChange={updateAssignee}
                      style={{ width: "150px" }}
                    >
                      <option value={task.User.id} id={task.User.id} selected>
                        {task.User.name}
                      </option>
                      {renderedUsers}
                    </select>
                  </div>
                  <div
                    className="dueDate-container"
                    style={{ marginTop: "20px" }}
                  >
                    <DatePicker
                      selected={dueDate}
                      onChange={(date) => setDueDate(date)}
                      customInput={<DateButton />}
                    />
                    {/* <p style={{ marginTop: "20px" }}> {date.format("MMM D")}</p> */}
                  </div>

                  <div
                    className="project-select-container"
                    style={{
                      height: "25px",
                      borderRadius: "20px",

                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "15px",
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

                  {/* <p style={{ marginTop: "17px" }}> {task.description}</p> */}
                  <div className="task-detail-description-container">
                    <textarea
                      className="task-detail-edit-description"
                      placeholder="Click to add team description..."
                      value={teamDescription}
                      onChange={handleDescriptionUpdate}
                      onBlur={updateDescription}
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
            <div className="task-detail-user-comments-container">
              <div>comment</div>
            </div>
          </div>
          <div className="task-detail-comment-container">
            <div
              className="task-detail-user-comment"
              style={{ display: "flex", marginLeft: "40px", marginTop: "20px" }}
            >
              <div
                className="task-detail-comment-avatar"
                style={{ width: "25px", height: "25px", fontSize: "10px" }}
              >
                <UserAvatar id={localStorage.getItem("userId")} />
              </div>
              <div className="task-detail-comment-box">
                <form className="task-detail-comment-form">
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
