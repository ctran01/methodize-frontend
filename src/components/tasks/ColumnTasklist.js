import React, { useEffect, useState, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Modal, responsiveFontSizes } from "@material-ui/core";
import AddTaskProjectForm from "../Forms/AddTaskProjectForm";
import ColumnTaskItem from "./ColumnTaskItem";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Menu, MenuItem } from "@material-ui/core";

const ColumnTasklist = ({ tasklist, index, setTasklists }) => {
  const [openTaskProjectForm, setOpenTaskProjectForm] = useState(false);
  const [tasklistTasks, setTasklistTasks] = useState();
  const [titleSelect, setTitleSelect] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openTaskProjectFormModal = () => {
    setOpenTaskProjectForm(true);
  };

  const closeTaskProjectFormModal = () => {
    setOpenTaskProjectForm(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTitleChange = (e) => {
    setTitleSelect(true);
  };

  const closeTitleChange = (e) => {
    setTitleSelect(false);
  };
  return (
    <div key={tasklist.id}>
      <Draggable
        type="tasklist"
        draggableId={`Column-${tasklist.column_index.toString()}`}
        index={index}
        key={`Column-${tasklist.id.toString()}`}
      >
        {(provided) => (
          <div
            className="tasklist-container"
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <div className="tasklist-header">
              <div className="tasklist-title" onClick={handleTitleChange}>
                {/* {tasklist.name} */}
                {titleSelect ? (
                  <form>
                    <textarea
                      id="title-textarea"
                      placeholder="Click to add team description..."
                      value={tasklist.name}
                      onBlur={closeTitleChange}
                      autoFocus
                    ></textarea>
                  </form>
                ) : (
                  tasklist.name
                )}
              </div>

              <div className="tasklist-more-menu" onClick={handleMenuClick}>
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

            <Droppable
              type="task"
              droppableId={`${tasklist.id.toString()}-${index.toString()}`}
            >
              {(provided) => (
                <div
                  className="tasklist-task--list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasklist.Tasks.map((task, index) => {
                    return (
                      <ColumnTaskItem
                        task={task}
                        index={index}
                        setTasklistTasks={setTasklistTasks}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <div
              className="tasklist-new-task--button"
              onClick={openTaskProjectFormModal}
            >
              + Add task
            </div>
          </div>
        )}
      </Draggable>
      <div>
        <Modal
          className="modal"
          style={{ backgroundColor: "white" }}
          open={openTaskProjectForm}
          onClose={closeTaskProjectFormModal}
        >
          <div className="modal-container">
            <AddTaskProjectForm
              setTasklists={setTasklists}
              setTasklistTasks={setTasklistTasks}
              tasklistId={tasklist.id}
              projectId={tasklist.project_id}
              clickClose={closeTaskProjectFormModal}
              open={openTaskProjectForm}
            ></AddTaskProjectForm>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ColumnTasklist;
