import React, { useEffect, useState, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskDetailsForm from "../tasks/TaskDetailsForm";
import { Modal, responsiveFontSizes } from "@material-ui/core";
import Pin from "../../assets/pin";
import Comments from "../../assets/comments";
const ColumnTaskItem = ({ task, index }) => {
  const [openTaskDetailForm, setOpenTaskDetailForm] = useState(false);

  const openTaskDetailFormModal = () => {
    setOpenTaskDetailForm(true);
  };

  const closeTaskDetailFormModal = () => {
    setOpenTaskDetailForm(false);
  };

  return (
    <div key={task.id}>
      <Draggable
        draggableId={`${task.id.toString()}`}
        type="task"
        key={`${task.id}`}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="task-project-item"
            onClick={openTaskDetailFormModal}
          >
            <div className="task-project-container">
              <div className="task-project-name">{task.name}</div>
              <div className="task-project-icons">
                <div>
                  <Pin /> 8
                </div>
                <div>
                  <Comments /> 9
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
      <div>
        <Modal
          open={openTaskDetailForm}
          onClose={closeTaskDetailFormModal}
          style={{ backgroundColor: "white" }}
        >
          <div className="modal-container">
            <TaskDetailsForm
              // setTasks={setTasks}
              // setTasklistTasks={setTasklistTasks}
              task={task}
              closeModal={closeTaskDetailFormModal}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ColumnTaskItem;
