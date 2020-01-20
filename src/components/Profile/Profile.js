import React from "react";
import MemeList from "../Memes/MemeList";
import { connect } from "react-redux";
import {
  fetchUserProfile,
  fetchFriendsForSpecificUser,
  fetchMemesForSpecificUser,
  fetchAllPendingFriendRequests,
  rejectFriendRequest,
  acceptFriendRequest,
  clearViewedProfile
} from "../../actions";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 0,
      sameAsLoggedUser:
        this.props.match.params.id === this.props.loggedUserProfileId,
      userId: this.props.match.params.id
    };
  }

  // shouldComponentUpdate() {
  //   if (
  //     this.props.viewedProfileId &&
  //     this.props.viewedProfileId !== this.props.match.params.id
  //   ) {
  //     this.props.clearViewedProfile();
  //     this.props.fetchUserProfile(this.props.match.params.id);
  //     this.props.fetchFriendsForSpecificUser(
  //       this.props.match.params.id
  //     );
  //     this.props.fetchMemesForSpecificUser(
  //       this.props.match.params.id
  //     );
  //     if (
  //       this.props.match.params.id ===
  //       this.props.loggedUserProfileId
  //     ) {
  //       this.props.fetchAllPendingFriendRequests(
  //         this.props.match.params.id
  //       );
  //     }
  //   }

  //   return true;
  // }

  componentWillMount() {
    this.props.fetchUserProfile(this.props.match.params.id);
    this.props.fetchFriendsForSpecificUser(this.props.match.params.id);
    this.props.fetchMemesForSpecificUser(this.props.match.params.id);
    if (this.state.sameAsLoggedUser) {
      this.props.fetchAllPendingFriendRequests(this.props.match.params.id);
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
            <img
              src={
                this.props.profileImageUrl !== ""
                  ? this.props.profileImageUrl
                  : "placeholderTODO"
              }
              alt="userProfileImage"
            />
          </div>
        </div>
        <div className="ten wide column">
          <div style={{ margin: "auto" }}>
            <div className="row">{this.renderEditButtonsWithUsernameRow()}</div>
            <div className="row" style={{ textAlign: "center" }}>
              Memy:{this.props.memes.length} Liczba znajomych:
              {this.props.friends.length}
            </div>
            <div className="row" style={{ textAlign: "center" }}>
              {this.props.firstName} {this.props.lastName}
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderEditButtonsWithUsernameRow() {
    if (
      this.props.match.params.id ===
      this.props.loggedUserProfileId
    )
      return (
        <div
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
      );
    else {
      return (
        <div
          style={{
            textAlign: "center",
            justifyContent: "space-between"
          }}
        >
          {this.props.username}
        </div>
      );
    }
  }

  activateItemOnClick = id => {
    this.setState({ activeTabIndex: id });
  };

  renderMenu = () => {
    return (
      <div
        className={`ui ${
          this.props.match.params.id ===
          this.props.loggedUserProfileId
            ? "three"
            : "two"
        } item menu`}
      >
        {this.tabItems.map((item, idx) => {
          if (
            idx === 2 &&
            this.props.match.params.id ===
              this.props.loggedUserProfileId
          ) {
            return (
              <a
                className={`item${
                  idx === this.state.activeTabIndex ? " active" : ""
                }`}
                onClick={() => this.activateItemOnClick(item.tabIndex)}
                key={idx}
              >
                {item.tabName}
                <div
                  className="floating ui red label"
                  style={{
                    visibility: `${
                      this.props.pendingFriendRequests.length < 1
                        ? "hidden"
                        : "visible"
                    }`
                  }}
                >
                  {this.props.pendingFriendRequests.length}
                </div>
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
      return <MemeList memes={this.props.memes}/>;
    } else if (this.state.activeTabIndex === 1) {
      return this.renderFriendsList();
    } else if (this.state.activeTabIndex === 2) {
      //friends requests
      return this.renderPendingFriendsRequests();
    }
  };

  renderPendingFriendsRequests() {
    
    return (
      <div className="ui cards">
        {this.props.pendingFriendRequests.map(friendRequest => {
          return (
            <div className="card" key={friendRequest.friendRequest.id}>
              <div className="content">
                <img
                  className="right floated mini ui image"
                  src={
                    friendRequest.friendRequestSenderProfile
                      .thumbnailImageUrl !== ""
                      ? friendRequest.friendRequestSenderProfile
                          .thumbnailImageUrl
                      : "placeholderTODO"
                  }
                  alt="userProfileThumbnail"
                />
                <div className="header">
                  {friendRequest.friendRequestSenderProfile.firstName}{" "}
                  {friendRequest.friendRequestSenderProfile.lastName}
                </div>
                <div className="meta">
                  {friendRequest.friendRequestSenderProfile.username}
                </div>
                <div className="description">
                  Użytkownik{" "}
                  {friendRequest.friendRequestSenderProfile.firstName}{" "}
                  zaprosił/zaprosiła Cie do grona znajomych!
                </div>
                <div className="extra content">
                  <div className="ui two buttons">
                    <div
                      className="ui basic green button"
                      onClick={() => this.props.acceptFriendRequest(
                        friendRequest.friendRequest.id,
                        friendRequest.friendRequest
                      )}
                    >
                      Zatwierdź
                    </div>
                    <div
                      className="ui basic red button"
                      onClick={() => this.props.rejectFriendRequest(
                        friendRequest.friendRequest.id,
                        friendRequest.friendRequest
                      )}
                    >
                      Odrzuć
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  renderFriendsList() {
    return (
      <div className="ui cards">
        {this.props.friends.map(friendProfile => {
          return (
            <div className="ui card">
              <div className="image">
                <img
                  src={
                    friendProfile.profileImageUrl !== ""
                      ? friendProfile.profileImageUrl
                      : "placeholderTODO"
                  }
                  alt="userProfileImage"
                />
              </div>
              <div className="content">
                <div className="header">{friendProfile.username}</div>
                <div className="meta">
                  <span>
                    {friendProfile.firstName} {friendProfile.lastName}
                  </span>
                </div>
                <div className="extra content">
                  <Link
                    className="ui basic button"
                    to={`/profile/${friendProfile.id}`}
                  >
                    Wyświetl profil
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

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
    viewedProfileId: state.viewedProfileData.userProfileId,
    firstName: state.viewedProfileData.firstName,
    lastName: state.viewedProfileData.lastName,
    userProfileId: state.viewedProfileData.userProfileId,
    profileImageUrl: state.viewedProfileData.profileImageUrl,
    friends: state.viewedProfileData.friends,
    memes: state.viewedProfileData.userMemes,
    pendingFriendRequests: state.viewedProfileData.friendsRequests
  };
};

export default connect(mapStateToProps, {
  fetchUserProfile,
  fetchFriendsForSpecificUser,
  fetchMemesForSpecificUser,
  fetchAllPendingFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  clearViewedProfile
})(Profile);
