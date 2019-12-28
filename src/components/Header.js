import React from "react";
import _ from "lodash";
import history from "../history";
import { connect } from "react-redux";
import { signIn, signOut, setActiveBookmarkIndex } from "../actions";

const navItems = [
  {
    itemName: <i className="home icon"></i>,
    path: "/list"
  },
  {
    itemName: "Stwórz mema",
    path: "/postCreate"
  },
  {
    itemName: "Profil",
    path: "/profile"
  }
];

class Header extends React.Component {
  renderAuthButton = () => {
    if (this.props.isSignedIn === null || !this.props.isSignedIn)
      return (
        <a
          className="item"
          onClick={this.onSignInClick}
          style={{
            marginTop: "3px",
            marginRight: "3px",
            marginLeft: "3px",
            marginBottom: "3px"
          }}
        >
          <i className="icon user" /> Zaloguj{" "}
        </a>
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
          }}
        >
          {" "}
          Wyloguj{" "}
        </button>
      );
  };

  onSignInClick = () => {
    history.push("/login");
  };

  onSignOutClick = () => {
    this.props.signOut();
    history.push("/list");
  };

  activateItemOnClick = path => {
    //place to add paths for clicking next header buttons
    if (path === "/postCreate") {
      history.push("/postCreate");
      this.props.setActiveBookmarkIndex(1);
    } else if (path === "/list") {
      history.push("/list");
      this.props.setActiveBookmarkIndex(0);
    } else if (path === "/profile") {
      history.push("/profile");
      this.props.setActiveBookmarkIndex(2);
    }
  };

  generateNavItems() {
    return navItems.map((item, idx) => {
      if (idx === 2 && !this.props.isSignedIn) {
        return;
      }
      return (
        <a
          className={`item${idx === this.props.activeTabId ? " active" : ""}`}
          onClick={() => this.activateItemOnClick(item.path)}
          key={idx}
        >
          {" "}
          {item.itemName}
        </a>
      );
    });
  }

  render() {
    return (
      <div className="ui fixed inverted menu">
        <div className="ui container">
          {this.generateNavItems()}
          <div className="right menu">{this.renderAuthButton()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    username: state.auth.username,
    thumbnailImageUrl: state.auth.thumbnailImageUrl,
    activeBookmarkIndex: state.navigation.activeBookmarkId
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
  setActiveBookmarkIndex
})(Header);
