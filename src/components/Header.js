import React from "react";
import _ from "lodash";
import history from "../history";
import {connect} from "react-redux";
import {signIn, signOut} from "../actions";

const navItems = [
    {
        itemName: <i className="home icon"></i>,
        path: "/list"
    },
    {
        itemName: "Stwórz mema",
        path: "/postCreate"
    }
];

class Header extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) || this.state !== nextState;
    }

    state = {
        activeIndex: 0
    };

    renderWelcome = () => {
        if (this.props.isSignedIn )
        {
            return <div style={{color: 'white', margin: 'auto'}}>{`Witaj, ${this.props.username}`}</div>
        }
    };

    renderAuthButton = () => {
        if (this.props.isSignedIn === null || !this.props.isSignedIn)
            return (
                <a className="item"
                   onClick={this.onSignInClick}
                   style={{
                       marginTop: "3px",
                       marginRight: "3px",
                       marginLeft: "3px",
                       marginBottom: "3px"
                   }}><i className="icon user"/> Zaloguj </a>
            );
        else if (this.props.isSignedIn)
            return (
                <button
                    className="ui negative button"
                    onClick={this.onSignOutClick}
                    style={{
                        marginTop: "3px",
                        marginRight: "3px",
                        marginLeft: "3px",
                        marginBottom: "3px"
                    }}> Wyloguj </button>
            );
    }

    onSignInClick = () => {
        history.push("/login");
    };

    onSignOutClick = () => {
        this.props.signOut();
    };

    activateItemOnClick = path => {
        //place to add paths for clicking next header buttons
        if (path === "/postCreate") {
            history.push("/postCreate");
            this.setState({activeIndex: 1});
        } else {
            history.push("/list");
            this.setState({activeIndex: 0});
        }
    };

    generateNavItems() {
        return navItems.map((item, idx) => (
            <a className={`item${idx === this.state.activeIndex ? " active" : ""}`}
               onClick={() => this.activateItemOnClick(item.path)}
               key={idx}> {item.itemName}
            </a>
        ));
    }

    render() {
        return (
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    {this.generateNavItems()}
                    <div className="right menu"> {this.renderWelcome()} {this.renderAuthButton()}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {isSignedIn: state.auth.isSignedIn,
            username: state.auth.username};
};

export default connect(mapStateToProps, {signIn, signOut})(Header);
