import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import organizationsReducer from './organizationsReduser'
import countryReduser from './countryReducer'
import foodReduser from './foodReduser'
import sellersReduser from './sellersReduser'
import cardsReduser from './cardsReduser'



export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    organizations:organizationsReducer,
    countries:countryReduser,
    food:foodReduser,
    sellers:sellersReduser,
    cards:cardsReduser
});