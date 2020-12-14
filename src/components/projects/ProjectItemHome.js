import React,{useState} from 'react'
import "../../css/Project.css";

const ProjectItemHome = ({project}) => {
  
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  //import component as body such as forms, details, etc
  // const body = (
  //   <div className="modal-container">
  //     {/* <h2 id="modal-title">Task Detail</h2>
  //     <p id="modal-description">
  //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
  //     </p> */}
  //     <TaskDetailsForm task={task} closeModal={closeModal} />
  //   </div>
  // );
  return (
    
      <div className="project-home-item" onClick={openModal}>
        <div style={{ display: "flex", alignItems: "center" }}>
          
          <p style={{ paddingLeft: "5px" }}>{project.name}</p>
        </div>
        
      </div>
      
    
  )
}

export default ProjectItemHome
