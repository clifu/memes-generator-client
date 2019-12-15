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
  }
};

export default initialState;
