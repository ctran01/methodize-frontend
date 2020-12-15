import React, { useState } from "react";
import moment from "moment";
import { Modal } from "@material-ui/core";
import "../../css/Modal.css";
import TaskDetailsForm from "./TaskDetailsForm";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { AiOutlineEllipsis } from "react-icons/ai";
//Task item list for home and task page

const TaskItemHome = ({ task }) => {
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

  const openMenu = () => {
    console.log("Open");
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
      <div className="task-home-item" onClick={openModal}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div>
            {task.completed ? (
              <RiCheckboxCircleLine
                style={{ color: "green", fontSize: "16px" }}
              />
            ) : (
              <RiCheckboxBlankCircleLine style={{ fontSize: "16px" }} />
            )}
          </div>
          <div className="task-home-item-name-container">
            <p
              style={{
                fontSize: "15px",
                fontWeight: "500",
                margin: "15px 0px 0px",
              }}
            >
              {task.name}
            </p>
            <p style={{ color: "grey", margin: "0" }}>{date.format("MMM D")}</p>
          </div>
          <div>
            <AiOutlineEllipsis
              onClick={openMenu}
              style={{ fontSize: "24px" }}
            />
          </div>
        </div>
      </div>
      <Modal open={open} onClose={closeModal}>
        {body}
      </Modal>
      {/* <TaskDetailsForm task={task} closeModal={closeModal} open={open} /> */}
    </>
  );
};

export default TaskItemHome;
