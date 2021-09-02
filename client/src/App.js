import React, { Component, lazy, Suspense } from "react";
import { withRouter, Switch, Route } from "react-router";

import * as path from "../src/constants/routes";
import Main from "./components/Main";
import Loader from "./components/Loader";

import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import SignUp from "./pages/SignUp/index";
import PageNotFound from "./components/PageNotFound";

import "./App.css";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Dashboard/Profile"));
const Tasks = lazy(() => import("./pages/Dashboard/Tasks"));
const ConfirmEmail = lazy(() => import("./pages/ConfirmEmail"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={path.HOME} component={Home} />
        <Route exact path={path.SIGN_IN} component={Login} />
        <Route exact path={path.SIGN_UP} component={SignUp} />
        <Main {...this.props}>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route
                exact
                path={path.DASHBOARD}
                render={props => <Dashboard {...props} />}
              />
              <Route
                exact
                path={path.TASKS}
                render={props => <Tasks {...props} />}
              />
              <Route
                exact
                path={path.PROFILE}
                render={props => <Profile {...props} />}
              />
              <Route
                exact
                path={path.CONFIRM_EMAIL}
                render={props => <ConfirmEmail {...props} />}
              />
              <Route
                exact
                path={path.RESET_PASSWORD}
                render={props => <ResetPassword {...props} />}
              />
              <Route render={props => <PageNotFound {...props} />} />
            </Switch>
          </Suspense>
        </Main>
      </Switch>
    );
  }
}

export default withRouter(App);
