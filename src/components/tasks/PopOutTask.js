import React, { useState } from "react";
import { RiMenuFill, RiMenuFoldLine } from "react-icons/ri";
const PopOutTask = ({ showSideMenu, sideMenu }) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="task-detail-menu-container">
        <div
          className={
            sideMenu ? "task-detail-menu active" : "task-detail-menu collapsed"
          }
        >
          PopOutTask
          <div className="collapse-menu-icon-container">
            <RiMenuFoldLine
              style={{
                color: "black",
                fontSize: "24px",
                cursor: "pointer",
              }}
              onClick={showSideMenu}
            />
          </div>
        </div>
      </div>
      {sideMenu ? null : (
        <div
          className="menu-icon"
          style={{
            paddingTop: "25px",
            paddingLeft: "20px",
            paddingBottom: "22px",
            backgroundColor: "white",
          }}
        >
          <RiMenuFill
            style={{
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={showSideMenu}
          />
        </div>
      )}
    </>
  );
};

export default PopOutTask;
