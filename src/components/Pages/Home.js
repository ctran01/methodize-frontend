import React, { useContext } from "react";

import { Context as UserContext } from "../../context/store/UserStore";
import { Context as TaskContext } from "../../context/store/TaskStore";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import TaskItemHome from "../tasks/TaskItemHome";
import TopNavBarHome from "../NavigationBar/TopNavBarHome";
import ProjectTile from "../projects/ProjectTile";
import NewProjectTile from "../projects/NewProjectTile";
import homeImage from "../../assets/codeVersion.png";
import Add from "../../assets/Add";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProjectItemHome from "../projects/ProjectItemHome";

const HomePage = () => {
  const [userState] = useContext(UserContext);
  const [taskState] = useContext(TaskContext);
  const [projectState] = useContext(ProjectContext);

  const uncompletedTasklist = taskState.tasks.filter(
    (task) => task.completed === false
  );

  const sortedTaskList = uncompletedTasklist.sort(function (a, b) {
    return new Date(b.due_date) - new Date(a.due_date);
  });

  // const upcomingTasklist = sortedTaskList
  //   .slice(sortedTaskList.length - 4)
  //   .reverse();

  const taskList = sortedTaskList.map((task, i) => {
    return !task.completed && <TaskItemHome task={task} key={i} />;
  });

  const projectLists = projectState.projects.slice(0, 4);

  const projectTiles = projectLists.map((project, i) => {
    return <ProjectItemHome project={project} key={i} id={project.id} />;
    // return <ProjectTile project={project} key={i} id={project.id} />;
  });

  return (
    <>
      <TopNavBarHome />
      <section className="home-container">
        {/* <div className="home-container"> */}
        <div className="home-welcome-header">
          <div>
            <p className="home-welcome-message">Hi, {userState.user.name}!</p>
            <p style={{ display: "flex", alignSelf: "center" }}>
              Welcome to your dashboard.
            </p>
          </div>
        </div>
        <div className="home-main-content-container">
          <div className="home-tasks-container">
            <div className="home-tasks-header">
              <div>
                <h2
                  style={{
                    color: "#151b26",
                    fontWeight: 500,
                    fontSize: "20px",
                  }}
                >
                  Tasks Due Soon
                </h2>
              </div>
              <div>
                <Link
                  to="/tasks"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  <p style={{ fontSize: "14px" }}>See all my tasks</p>
                </Link>
              </div>
            </div>
            <div className="home-tasks--list">
              {/* call get all tasks for specific user route */}
              {taskList}
              <div className="new-home-item-container">
                <div className="new-home-icon-container">
                  <Add className="new-home-item-icon" />
                </div>
                <div className="new-home-item-name">Create Task</div>
              </div>
            </div>
          </div>
          <div className="home-projects-container">
            <div className="home-projects-header">
              <div>
                <h2
                  style={{
                    color: "#151b26",
                    fontWeight: 500,
                    fontSize: "20px",
                  }}
                >
                  Projects
                </h2>
              </div>
              <div>
                <Link
                  to="/tasks"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  <p style={{ fontSize: "14px" }}>See all my projects</p>
                </Link>
              </div>
            </div>
            <div className="home-projects--list">
              {/* call get all projects for specific user route */}
              {projectTiles}
              <div className="new-home-item-container">
                <div className="new-home-icon-container">
                  <Add className="new-home-item-icon" />
                </div>
                <div className="new-home-item-name">Create Project</div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>
    </>
  );
};

export default HomePage;
