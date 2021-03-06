import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import "../../css/LoginPage.css";
import apiServer from "../../config/apiServer";
import { useHistory } from "react-router-dom";
const LoginForm = () => {
  const { register, handleSubmit, errors, clearErrors } = useForm();
  // console.log("LoginForm");
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuth, setEmail, setUserId, setUser } = useContext(AuthContext);
  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  let history = useHistory();
  const onSubmit = async ({ email, password }) => {
    // if (!email && !password) {
    //   email = "demo@email.com";
    //   password = "password";
    //   setFormEmail(email);
    //   setPassword(password);
    // }
    setLoading(true);
    try {
      const res = await apiServer.post("/login", { email, password });

      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("token", res.data.token);
      history.push("/");
      setErrorMessage("");
      setAuth(res.data.token);
      // setUserId(res.data.id);
      // setEmail(res.data.email);
      // setUser(res.data);
    } catch (err) {
      setLoading(false);
      setErrorMessage("The provided credentials were invalid");
    }
  };

  const handleEmailChange = (e) => {
    setErrorMessage("");
    setFormEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const clearError = (e) => {
    setErrorMessage("");
    clearErrors();
  };
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
      history.push("/");
      setErrorMessage("");
      setAuth(res.data.token);
      setUserId(res.data.id);
      setEmail(res.data.email);
      setUser(res.data);
    } catch (err) {
      setDemoLoading(false);
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <form className="login-page--form" onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          type="email"
          value={formEmail}
          onFocus={clearError}
          onChange={handleEmailChange}
          ref={register({ required: true })}
        ></input>
        {errors.email?.type === "required" && (
          <p style={{ color: "red", margin: "1px" }}>
            Please enter an email address
          </p>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onFocus={clearError}
          ref={register({ required: true })}
        ></input>
        {errors.password?.type === "required" && (
          <p style={{ color: "red", margin: "1px" }}>Please enter a password</p>
        )}
      </div>
      <button type="submit">{loading ? "Logging in.." : "Login"}</button>
      {errorMessage ? (
        <p style={{ color: "red", margin: "1px" }}>{errorMessage}</p>
      ) : null}
      <button onClick={demoLogin}>
        {demoLoading ? "Logging in as demo user" : "Demo User"}
      </button>
    </form>
  );
};

export default LoginForm;
