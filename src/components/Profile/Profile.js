import React from "react";
import MemeList from "../Memes/MemeList";
import Meme from "../Memes/Meme";
import { connect } from "react-redux";
import {
  fetchUserProfile,
  fetchFriendsForSpecificUser,
  fetchMemesForSpecificUser,
  fetchAllPendingFriendRequests
} from "../../actions";

class Profile extends React.Component {
  state = {
    activeTabIndex: 0,
    sameAsLoggedUser: null,
    userId: null
  };

  componentWillMount() {
    this.setState({
      sameAsLoggedUser:
        this.props.match.params.id === this.props.loggedUserProfileId,
      userId: this.props.match.params.id
    });
  }

  componentDidMount() {
    this.props.fetchUserProfile(this.state.userId);
    this.props.fetchFriendsForSpecificUser(this.state.userId);
    this.props.fetchMemesForSpecificUser(this.state.userId);
    if (this.state.sameAsLoggedUser) {
      this.props.fetchAllPendingFriendRequests(this.state.userId);
    }
  }

  tabItems = [
    {
      tabName: "Memy",
      tabIndex: 0
    },
    {
      tabName: "Znajomi",
      tabIndex: 1
    },
    {
      tabName: "Zaproszenia do znajomych",
      tabIndex: 2
    }
  ];

  renderUserData = () => {
    return (
      <div className="ui internally celled grid">
        <div className="six wide column">
          <div className="ui medium circular image">
            <img src={this.props.profileImageUrl} alt="image url" />
          </div>
        </div>
        <div className="ten wide column">
          <div style={{ margin: "auto" }}>
            <div
              className="row"
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              {this.props.username}
              <button className="ui button">Edytuj profil</button>
              <button className="circular ui icon button">
                <i className="icon settings"></i>
              </button>
            </div>
            <div className="row" style={{ textAlign: "center" }}>
              Memy:0 Liczba znajomych 0
            </div>
            <div className="row" style={{ textAlign: "center" }}>
              Imie i nazwisko
            </div>
          </div>
        </div>
      </div>
    );
  };

  activateItemOnClick = id => {
    this.setState({ activeTabIndex: id });
  };

  renderMenu = () => {
    return (
      <div
        className={`ui ${
          this.state.sameAsLoggedUser ? "three" : "two"
        } item menu`}
      >
        {this.tabItems.map((item, idx) => {
          if (idx === 2 && this.state.sameAsLoggedUser) {
            return (
              <a
                className={`item${
                  idx === this.state.activeTabIndex ? " active" : ""
                }`}
                onClick={() => this.activateItemOnClick(item.tabIndex)}
                key={idx}
              >
                {item.tabName}
                <div className="floating ui red label">22</div>
              </a>
            );
          }
          if (idx !== 2)
            return (
              <a
                className={`item${
                  idx === this.state.activeTabIndex ? " active" : ""
                }`}
                onClick={() => this.activateItemOnClick(item.tabIndex)}
                key={idx}
              >
                {item.tabName}
              </a>
            );
        })}
      </div>
    );
  };

  renderData = () => {
    if (this.state.activeTabIndex === 0) {
      //memes
      return <MemeList />;
    } else if (this.state.activeTabIndex === 1) {
    } else if (this.state.activeTabIndex === 2) {
      //friends requests TEMPORARY TODO
      return (
        <div className="ui cards">
          <div className="card">
            <div className="content">
              <img className="right floated mini ui image" src="" />
              <div className="header">Elliot Fu</div>
              <div className="meta">Friends of Veronika</div>
              <div className="description">
                Elliot requested permission to view your contact details
              </div>
            </div>
            <div className="extra content">
              <div className="ui two buttons">
                <div className="ui basic green button">Approve</div>
                <div className="ui basic red button">Decline</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="content">
              <img className="right floated mini ui image" src="" />
              <div className="header">Jenny Hess</div>
              <div className="meta">New Member</div>
              <div className="description">
                Jenny wants to add you to the group <b>best friends</b>
              </div>
            </div>
            <div className="extra content">
              <div className="ui two buttons">
                <div className="ui basic green button">Approve</div>
                <div className="ui basic red button">Decline</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    if (this.props.username !== null)
      return (
        <div>
          {this.renderUserData()}
          <div className="ui divider" />
          {this.renderMenu()}
          {this.renderData()}
        </div>
      );
    else return <div>Dane profilu sie ładują...</div>;
  }
}

const mapStateToProps = state => {
  return {
    loggedUserProfileId: state.auth.profileId,
    loggedUser: state.userProfileData,
    username: state.viewedProfileData.username,
    firstName: state.viewedProfileData.firstName,
    lastName: state.viewedProfileData.lastName,
    userProfileId: state.viewedProfileData.userProfileId,
    profileImageUrl: state.viewedProfileData.profileImageUrl,
    friends: state.viewedProfileData.friends,
    memes: state.viewedProfileData.userMemes,
    pendingFriendRequests: state.viewedProfileData.pendingFriendRequests
  };
};

export default connect(mapStateToProps, {
  fetchUserProfile,
  fetchFriendsForSpecificUser,
  fetchMemesForSpecificUser,
  fetchAllPendingFriendRequests
})(Profile);
