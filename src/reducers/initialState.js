const initialState = {
    auth: {
        isSignedIn: null,
        userId: null,
        userToken: null,
        userTokenExpirationTime: null,
        profileId: null
    },
    notifications: [], //{ content: null, visible: false }
    memes: [],
    generatedMeme: {
        title: null,
        description: null,
        imageUrl: null
    },
    userProfileData: {
        username: null,
        firstName: null,
        lastName: null,
        profileImageUrl: null,
        thumbnailImageUrl: null,
        friends: [],
        myMemes: []
    },
    viewedProfileData: {
        userProfileId: null,
        username: null,
        firstName: null,
        lastName: null,
        profileImageUrl: null,
        thumbnailImageUrl: null,
        friends: [],
        friendsRequests: [],
        userMemes: []
    },
    activeBookmarkId: {
        activeBookmarkId: 0
    }
};

export default initialState;
