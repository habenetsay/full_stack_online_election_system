// actions/userActions.js

export const setUser = (userData) => ({
    type: 'SET_USER',
    payload: userData
});

export const logoutUser = () => ({
    type: 'LOG_OUT' // Updated to match 'LOG_OUT' in the reducer
});
