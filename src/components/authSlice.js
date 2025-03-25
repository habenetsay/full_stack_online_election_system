// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    token: null,
    role: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.token = null;
            state.role = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
