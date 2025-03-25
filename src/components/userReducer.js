// src/redux/userReducer.js

const initialState = {
    studentId: '',
    role: '',
    token: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                ...action.payload,
            };
        case 'LOG_OUT':
            return initialState; // Reset state on logout
        default:
            return state;
    }
};

export default userReducer;
