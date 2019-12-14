const initialState = {
  auth: {
    isSignedIn: null,
    userId: null,
    userToken: null,
    userTokenExpirationTime: null
  },
  notifications: [] //{ content: null, visible: false }
};

export default initialState;
