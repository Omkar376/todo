import React from "react";
import { Route } from "react-router-dom";

import TodoList from "./containers/TodoListView";
import TodoDetail from "./containers/TodoDetailView";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

const BaseRouter = () => (
  <div>
    <Route exact path="/todos" component={TodoList } />{" "}
    <Route exact path="/todos/:todoid/" component={TodoDetail} />{" "}
    <Route exact path="/" component={Login} />{" "}
    <Route exact path="/signup/" component={Signup} />{" "}
  </div>
);

export default BaseRouter;
