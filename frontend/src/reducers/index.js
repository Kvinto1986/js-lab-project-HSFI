import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import organizationsReducer from './organizationsReduser'


export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    organizations:organizationsReducer
});