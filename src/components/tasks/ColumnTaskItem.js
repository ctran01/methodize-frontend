import React, { useEffect, useState, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskDetailsForm from "../tasks/TaskDetailsForm";
import { Modal, responsiveFontSizes } from "@material-ui/core";

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
        //this index needs to pull from tasksArray
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
            {task.name}
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
