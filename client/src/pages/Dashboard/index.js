import React, { Fragment } from "react";

import { isAuth } from "../../hoc/isAuth";
import GetUsers from "../../components/Staticstics/GetUsers";
import GetTasks from "../../components/Staticstics/GetTasks";

const Main = () => (
  <Fragment>
    <GetUsers />
    <GetTasks />
  </Fragment>
);

export default isAuth(Main);
