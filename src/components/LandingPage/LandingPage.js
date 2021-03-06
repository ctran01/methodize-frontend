import React, { useState, useContext } from "react";
import "../../css/LandingPage.css";
import AuthContext from "../../context/AuthContext";
import apiServer from "../../config/apiServer";

import Logo from "../../assets/Logo";

const LandingPage = () => {
  const [demoLoading, setDemoLoading] = useState(false);
  const { setAuth, setEmail, setUserId, setUser } = useContext(AuthContext);
  // console.log("LandingPage");
  const demoLogin = async (e) => {
    e.preventDefault();

    setDemoLoading(true);
    const email = "demo@email.com";
    const password = "password";
    try {
      const res = await apiServer.post("/login", { email, password });

      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("token", res.data.token);
      setAuth(res.data.token);
      setUserId(res.data.id);
      setEmail(res.data.email);
      setUser(res.data);
    } catch (err) {
      setDemoLoading(false);
    }
  };

  return (
    <div className="landing-page-background" style={{}}>
      <div className="landing-page-background-circle-layer" style={{}}></div>
      <div className="landing-container">
        <div className="landing-nav-container">
          <div className="landing-nav-logo" style={{ paddingTop: "7px" }}>
            <a href="/">
              <Logo />
            </a>
          </div>
          <div className="landing-nav-sessions">
            <div className="login-button-container">
              <a href="/login">
                <button className="landing-nav-login--button">Login</button>
              </a>
            </div>

            <div>
              <a href="/register">
                <button className="landing-nav-register--button">
                  Register
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="landing-main">
          <div className="landing-message-container">
            <h2 className="landing-message">
              The easiest way to manage team, projects, and tasks
            </h2>
            <h3 className="landing-submessage">
              Why use Methodize? Methodize gives you everything you need to stay
              in sync, hit deadlines, and reach your goals
            </h3>
            <div className="landing-message-button--div">
              <button className="landing-message--button" onClick={demoLogin}>
                {demoLoading ? "Starting demo.." : "Try Demo"}{" "}
              </button>
            </div>
          </div>
          <div className="landing-main-picture">
            <img
              src="https://projectimagebucket.s3-us-west-2.amazonaws.com/Product-screenshot.png"
              alt="landing"
              className="landing-picture"
            />
          </div>
          {/* <div className="landing-main-bottom">
            <div className="landing-main-bottom-icons-container">
              <div className="icon-container">
                <AiOutlineTeam
                  style={{ fontSize: "75px", color: "rgb(59, 182, 170)" }}
                />
                <p>
                  Establish Teams with other colleagues and work together to
                  accomplish tasks.
                </p>
              </div>
              <div className="icon-container">
                <MdAssignment
                  style={{ fontSize: "75px", color: "rgb(59, 182, 170)" }}
                />
                <p>
                  Create multiple projects within a team categorize tasks based
                  on different types of projects.
                </p>
              </div>
              <div className="icon-container">
                <BsCardChecklist
                  style={{ fontSize: "75px", color: "rgb(59, 182, 170)" }}
                />
                <p>
                  Keep track of tasks via tasklists in individual projects and
                  check them off when they are completed.
                </p>
              </div>
            </div>
            <div className="guest-login-button">
              <a href="/login">
                <button className="landing-message--button">
                  Guest Login!
                </button>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
