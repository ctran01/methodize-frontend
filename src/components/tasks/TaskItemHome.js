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
import { Menu, MenuItem } from "@material-ui/core";
//Task item list for home and task page

const TaskItemHome = ({ task }) => {
  const date = moment(
    task.due_date.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
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
      <div className="task-home-item">
        <div className="task-home-item-inner-container">
          <div className="task-home-item-inner-left" onClick={openModal}>
            <div className="task-home-item-icon-container">
              {/* {task.completed ? (
                <RiCheckboxCircleLine
                  style={{ color: "green", fontSize: "16px" }}
                />
              ) : (
                <RiCheckboxBlankCircleLine style={{ fontSize: "16px" }} />
              )} */}
              <span className={`dot-task-${task.id}`}></span>
            </div>
            <div className="task-home-item-name-container">
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  margin: "0px",
                }}
              >
                {task.name}
              </p>
              <p style={{ color: "grey", margin: "0" }}>
                {date.format("MMM D")}
              </p>
            </div>
          </div>
          <div
            className="task-home-item-more-menu"
            style={{ height: "100%" }}
            onClick={handleMenuClick}
          >
            <AiOutlineEllipsis style={{ fontSize: "24px" }} />
          </div>
          <Menu
            style={{}}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
          </Menu>
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
