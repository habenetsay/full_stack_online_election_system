import { createStore, combineReducers } from 'redux';
import userReducer from './userReducer'; // Ensure this path is correct

const rootReducer = combineReducers({
    user: userReducer, // Attach userReducer under the "user" key
});

const store = createStore(rootReducer);

export default store;
