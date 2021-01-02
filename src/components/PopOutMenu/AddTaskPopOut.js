import React from "react";
import AddTaskProjectForm from "../Forms/AddTaskProjectForm";
import "../../css/PopOutForms.css";
import { RiCloseLine } from "react-icons/ri";
const AddTaskPopOut = ({ showSideTaskForm, title }) => {
  return (
    <>
      <div className={"popout-form"}>
        <div
          style={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            minHeight: "1px",
            overflow: "hidden",
          }}
        >
          <div className="popout-form-container">
            <div className="popout-form-top">
              <div className="popout-form-header">{title}</div>
              <div className="popout-form-close-icon">
                <RiCloseLine
                  style={{
                    color: "black",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                  onClick={showSideTaskForm}
                />
              </div>
            </div>
            <AddTaskProjectForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTaskPopOut;
