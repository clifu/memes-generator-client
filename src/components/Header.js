import React from "react";
import history from "../history";
import {connect} from "react-redux";
import { signIn, signOut, setActiveBookmarkIndex, fetchSearchUsers } from "../actions";
import {Search} from 'semantic-ui-react';

const navItems = [
    {
        itemName: <i className="home icon"/>,
        path: "/list"
    },
    {
        itemName: "Stwórz mema",
        path: "/postCreate"
    },
    {
        itemName: "Profil",
        path: `/profile`
    }
];

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.state = ({
          results: []
        });
    }

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
                   }}>
                    <i className="icon user"/> Zaloguj{" "}
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
        } else if (path === `/profile`) {
            history.push(`/profile/${this.props.userProfileId}`);
            this.props.setActiveBookmarkIndex(2);
        }
    };

    generateNavItems() {
        return navItems.map((item, idx) => {
            if (!this.props.isSignedIn && (item.path === "/postCreate" || item.path === "/profile"))
                return;

            return (
                <a className={`item${idx === this.props.activeTabId ? " active" : ""}`}
                   onClick={() => this.activateItemOnClick(item.path)}
                   key={idx}>
                    {" "}
                    {item.itemName}
                </a>
            );
        });
    }

    handleSearchChange() {
      let searchString = document.getElementById('usersSearch').value;
      if (searchString.length >= 3) {
        this.props.fetchSearchUsers(searchString);
        this.setState({
          results: this.props.searchUsersProfiles.map(function(uProf) {
            let result = {
              "title": uProf.firstName + ' ' + uProf.lastName,
              "profileId": uProf.id
            };
            return result;
          })
        });
      }
    }

    handleResultSelect(e, {result}) {
      history.push(`/profile/` + result.profileId);
    }

    render() {
        var searchProps = {
          input: <input id="usersSearch" className='ui search transparent' placeholder="Wyszukaj znajomych"/>,
          // open: this.state.open,
          // onFocus: this.handleFocusSearch,
          // onBlur: this.handleBlurSearch,
          onSearchChange: this.handleSearchChange,
          results: this.state.results,
          onResultSelect: this.handleResultSelect,
        };

        return (
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    {this.generateNavItems()}
                    <div className="right menu">
                        {this.props.isSignedIn ? <div className="item">
                            <Search {...searchProps} />
                        </div> : null}

                        {/* nice styling: <div className="item">
                              <div className="ui search" onChange={() => this.handleSearchChange()}>
                                <div className="ui transparent inverted icon input">
                                  <i className="search icon"></i>
                                  <input type="text" placeholder="Wyszukaj znajomych"/>
                                </div>
                                <div className="results"></div>
                              </div>            
                            </div> */}

                        {this.renderAuthButton()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        username: state.auth.username,
        userProfileId: state.auth.profileId,
        thumbnailImageUrl: state.auth.thumbnailImageUrl,
        activeBookmarkIndex: state.navigation.activeBookmarkId,
        userProfile: state.userProfileData,
        searchUsersProfiles: state.userProfileData.searchUsersProfiles
    };
};

export default connect(mapStateToProps, {
    signIn,
    signOut,
    setActiveBookmarkIndex,
    fetchSearchUsers
})(Header);
