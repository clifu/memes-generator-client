import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import LoginForm from "./LoginForm.js";
import RegisterForm from "./RegisterForm.js";
import _ from "lodash";

class App extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/login" exact component={LoginForm} />
            <Route path="/register" exact component={RegisterForm} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
