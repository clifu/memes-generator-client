import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Header from "./Header";
import PostsList from "./Posts/PostsList";
import PostCreate from "./Posts/PostCreate";
import _ from "lodash";
import PostDelete from "./Posts/PostDelete";
import PostEdit from "./Posts/PostEdit";

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
            <Route path="/list" exact component={PostsList} />
            <Route path="/posts/delete/:id" exact component={PostDelete} />
            <Route path="/posts/edit/:id" exact component={PostEdit} />
            <Route path="/postCreate" exact component={PostCreate} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
