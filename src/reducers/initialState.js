const initialState = {
  auth: {
    isSignedIn: null,
    userId: null,
    userToken: null,
    userTokenExpirationTime: null
  },
  notifications: [], //{ content: null, visible: false }
  userProfileData: {
    username: null,
    firstName: null,
    lastName: null,
    profileImageUrl: null,
    thumbnailImageUrl: null
  },
  activeBookmarkId: {
    activeBookmarkId: 0
  }

};

export default initialState;
