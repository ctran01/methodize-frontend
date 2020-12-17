import React, { useState, useContext } from "react";
import moment from "moment";
import { Modal } from "@material-ui/core";
import "../../css/Modal.css";
import TaskDetailsForm from "../tasks/TaskDetailsForm";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { Context as TaskContext } from "../../context/store/TaskStore";
import apiServer from "../../config/apiServer";

//Task item list for home and task page

const TaskItemTask = ({ task, showSideMenu, sideMenu }) => {
  const [taskState, taskDispatch] = useContext(TaskContext);

  const date = moment(
    task.due_date.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const setTaskPopOut = async () => {
    if (sideMenu === false) {
      showSideMenu();
    }
    const res = await apiServer.get(`/task/${task.id}`);
    await taskDispatch({ type: "get_selected_task", payload: res.data });
  };

  //import component as body such as forms, details, etc
  const body = (
    <div className="modal-container">
      {/* <h2 id="modal-title">Task Detail</h2>
      <p id="modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p> */}
      <TaskDetailsForm task={task} closeModal={closeModal} />
    </div>
  );
  return (
    <>
      <li className="task-task-item" onClick={setTaskPopOut}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {task.completed ? (
            <RiCheckboxCircleLine
              style={{ color: "green", fontSize: "16px" }}
            />
          ) : (
            <RiCheckboxBlankCircleLine style={{ fontSize: "16px" }} />
          )}
          <p style={{ paddingLeft: "5px" }}>{task.name}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className={`task-project-name-container task-project-${task.Project.id}`}
          >
            <p
              style={{
                margin: "0px",
                padding: "5px",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {task.Project.name}
            </p>
          </div>
          <div>{date.format("MMM D YYYY")}</div>
        </div>
      </li>
      <Modal open={open} onClose={closeModal}>
        {body}
      </Modal>
    </>
  );
};

export default TaskItemTask;
