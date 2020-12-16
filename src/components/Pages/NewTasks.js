import React, { useContext, useEffect, useState } from "react";
import TopNavBarTask from "../NavigationBar/TopNavBarTask";
import { Context as TaskContext } from "../../context/store/TaskStore";
import apiServer from "../../config/apiServer";
import TaskSection from "../tasks/TaskSection";
import PopOutTask from "../tasks/PopOutTask";
const NewTasks = () => {
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [sideMenu, setSideMenu] = useState(true);
  const showSideMenu = () => setSideMenu(!sideMenu);

  const getUserTasks = async () => {
    const id = localStorage.getItem("userId");
    const res = await apiServer.get(`/task/user/${id}`);
    await taskdispatch({ type: "get_user_tasks", payload: res.data });
    // setTasks(res.data);
    setLoading(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUserTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <TopNavBarTask />
      <div className="tasks-container">
        {/* <div className="tasks-container-header"></div> */}
        <div className="tasks-main-content">
          <div className="tasks-inner-container">
            <div>
              <button className="add-task-button" onClick={openModal}>
                Add Task
              </button>
            </div>

            {/* <TaskSection title={"Recently Added"} tasks={recentlyAdded} />
          <TaskSection title={"Today"} tasks={todaysTasks} />
          <TaskSection title={"Upcoming"} tasks={upcomingTasks} />
          <TaskSection title={"Later"} tasks={laterTasks} /> */}
          </div>
          <PopOutTask showSideMenu={showSideMenu} sideMenu={sideMenu} />
        </div>
      </div>
    </>
  );
};

export default NewTasks;
