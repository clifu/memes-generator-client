import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import {loginFromCache} from "../actions";
import {connect} from "react-redux";
import history from "../history";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Header from "./Header";
import Profile from "./Profile/Profile"
import PostsList from "./Memes/MemeList";
import PostCreate from "./Memes/MemeCreate";
import _ from "lodash";
import PostDelete from "./Memes/MemeDelete";
import PostEdit from "./Memes/MemeEdit";
import FloatingMessage from "./AdditionalComponents/FloatingMessage";
import Cookies from "js-cookie";

class App extends React.Component {

    componentWillMount() {
        var id = Cookies.get("userId");
        var token = Cookies.get("userToken");
        var expirationTime = Cookies.get("userTokenExpirationTime");

        if (id && token && expirationTime) {
            this.props.loginFromCache({id, token, expirationTime});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) || this.state !== nextState;
    }

    render() {
        //let background = location.state && location.state.background;

        return (
            <div>
                <Router history={history}>
                    <Header />
                    <div className="ui main container">
                        <div className="main container">
                            {this.props.notifications.map((notification, i) => (
                                <FloatingMessage notification={notification} key={i} id={i}/>
                            ))}
                            <Switch>
                                <Route path="/login" exact component={LoginForm}/>
                                <Route path="/profile" exact component={Profile}/>
                                <Route path="/register" exact component={RegisterForm}/>
                                <Route path="/list" exact component={PostsList}/>
                                <Route path="/list/delete/:id" exact component={PostDelete}/>
                                <Route path="/list/edit/:id" exact component={PostEdit}/>
                                <Route path="/postCreate" exact component={PostCreate}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {notifications: Object.values(state.notifications)}
};

export default connect(
    mapStateToProps,
    {loginFromCache}
)(App);