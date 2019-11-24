import React from "react";
import _ from "lodash";
import history from "../history";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class Header extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  state = {
    activeIndex: 0
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null || !this.props.isSignedIn)
      return (
        <button
          className="ui positive button"
          onClick={this.onSignInClick}
          style={{
            marginTop: "3px",
            marginRight: "3px",
            marginLeft: "3px",
            marginBottom: "3px"
          }}
        >
          Sign in
        </button>
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
            marginBottom: "3px",
            color: "red"
          }}
        >
          Sign out
        </button>
      );
  }

  onSignInClick = () => {
    history.push("/login");
  };

  onSignOutClick = () => {
    this.props.signOut();
  };

  activateItemOnClick = element => {};

  generateNavItems() {
    const navItems = ["Home"];

    return navItems.map((item, idx) => (
      <a
        className={`item${idx === this.state.activeIndex ? " active" : ""}`}
        onClick={this.activateItemOnClick}
        key={idx}
      >
        {item}
      </a>
    ));
  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        {this.generateNavItems()}
        <div className="right menu"> {this.renderAuthButton()} </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(Header);
