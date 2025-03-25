// actions.js

// Define action types
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER'; // Define the logout action type

// Action to set user
export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

// Action to log out user
export const logoutUser = () => {
    return {
        type: LOGOUT_USER, // Use the defined action type
    };
};
