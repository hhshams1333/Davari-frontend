import React, { Component } from "react";

import { Route, Redirect, Switch } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import SupervisorLog from "./components/supervisorLog";
import CustomerLog from "./components/customersLog";
import AdminPanel from "./components/login/adminPanel";
import Login from "./components/login/login";
class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/customer" component={CustomerLog} />
          <ProtectedRoute
            path="/admin"
            render={(props) => <AdminPanel {...props} />}
          />
          <Route path="/supervisor" component={SupervisorLog} />
          <Redirect from="/" exact to="/login" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
