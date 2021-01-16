import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import RegisterPage from "./RegisterPage";
import Onboard from "./Onboard";
import NotFoundPage from "../Pages/NotFoundPage";
const LandingRoutes = () => {
  // console.log("LandingRoutes");
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/register/onboard" component={Onboard} />
        <Route exact path="/" component={LandingPage} />
        {/* <Route
          path="/*"
          render={() => {
            return <Redirect to="/" />;
          }}
        /> */}
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
};

export default LandingRoutes;
