import React from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import { loginFromCache, processReceivedNotification } from "../actions";
import { connect } from "react-redux";
import history from "../history";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Header from "./Header";
import Profile from "./Profile/Profile";
import PostsList from "./Memes/MemeList";
import PostCreate from "./Memes/MemeCreate";
import _ from "lodash";
import PostDelete from "./Memes/MemeDelete";
import PostEdit from "./Memes/MemeEdit";
import Cookies from "js-cookie";
import { HubConnectionBuilder } from "@aspnet/signalr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends React.Component {
  state = {
    connetionHub: null,
    messages: []
  };

  componentWillMount() {
    var id = Cookies.get("userId");
    var token = Cookies.get("userToken");
    var expirationTime = Cookies.get("userTokenExpirationTime");
    var profileId = Cookies.get("profileId");

    if (id && token && expirationTime && profileId) {
      this.props.loginFromCache({ id, token, expirationTime, profileId });
    }
  }

  sendMessageToConnect = () => {
    this.state.hubConnection
      .invoke("registerConId", Cookies.get("userId"))
      .catch(err => console.error(err));

    this.setState({ message: "" });
  };

  componentDidMount() {
    const hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:44353/notification")
      .build();

    this.setState({ hubConnection }, () => {
      this.state.hubConnection
        .start()
        .then(() => this.sendMessageToConnect())
        .catch(err => console.log("Error while establishing connection :("));

      this.state.hubConnection.on("sendNotification", message => {
        this.props.processReceivedNotification(message);
      });
    });
  }

  render() {
    return (
      <div>
        <Router basename={"/list"} history={history}>
          <Header />
          <div className="ui main container">
            <div className="main container">
              <ToastContainer position={toast.POSITION.TOP_RIGHT} />
              <Switch>
                <Route path="/login" exact component={LoginForm} />
                <Route path="/profile/:id" exact component={Profile} />
                <Route path="/register" exact component={RegisterForm} />
                <Route path="/list" exact component={PostsList} />
                <Route path="/list/delete/:id" exact component={PostDelete} />
                <Route path="/list/edit/:id" exact component={PostEdit} />
                <Route path="/postCreate" exact component={PostCreate} />
                <Redirect to="/list" />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    notifications: Object.values(state.notifications)
  };
};

export default connect(mapStateToProps, {
  loginFromCache,
  processReceivedNotification
})(App);
