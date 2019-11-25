import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Header from "./Header";
import ObjectsList from "./Objects/ObjectsList";
import ObjectCreate from "./Objects/ObjectCreate";
import _ from "lodash";
import ObjectDelete from "./Objects/ObjectDelete";
import ObjectEdit from "./Objects/ObjectEdit";

class App extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Header />
          <Switch>
            <Route path="/login" exact component={LoginForm} />
            <Route path="/register" exact component={RegisterForm} />
            <Route path="/list" exact component={ObjectsList} />
            <Route path="/objects/delete/:id" exact component={ObjectDelete} />
            <Route path="/objects/edit/:id" exact component={ObjectEdit} />
            <Route path="/objectCreate" exact component={ObjectCreate} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
