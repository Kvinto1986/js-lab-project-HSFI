import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import organizationsReducer from './organizationsReducer'
import countryReduser from './countryReducer'
import foodReduser from './foodReducer'
import sellersLicensesReducer from './sellersLicensesReducer'
import cardsReduser from './cardsReducer'
import callsReduser from './callsReducer'
import emptyErrorsReduser from './callsReducer'
import inspectionReducer from './inspectionReducer'
import inspectionQuestionsReducer from './inspectionQuestionsReducer'
import usersReducer from './usersReduser'
import sellerReducer from './sellerReduser'
import sellersReducer from './sellersReduser'
import cityReducer from './cityReduser'
import reportReducer from './reportReduser'


export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    organizations:organizationsReducer,
    countries:countryReduser,
    food:foodReduser,
    sellersLicenses:sellersLicensesReducer,
    seller:sellerReducer,
    cards:cardsReduser,
    calls:callsReduser,
    empty:emptyErrorsReduser,
    inspection:inspectionReducer,
    inspectionQuestions:inspectionQuestionsReducer,
    users:usersReducer,
    sellers:sellersReducer,
    cities:cityReducer,
    report:reportReducer
});