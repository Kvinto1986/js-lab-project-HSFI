import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import organizationsReducer from './organizationsReducer'
import countryReduser from './countryReducer'
import foodReduser from './foodReducer'
import sellersReduser from './sellersReducer'
import cardsReduser from './cardsReducer'
import callsReduser from './callsReducer'
import emptyErrorsReduser from './callsReducer'
import inspectionReducer from './inspectionReducer'
import inspectionQuestionsReducer from './inspectionQuestionsReducer'


export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    organizations:organizationsReducer,
    countries:countryReduser,
    food:foodReduser,
    sellers:sellersReduser,
    cards:cardsReduser,
    calls:callsReduser,
    empty:emptyErrorsReduser,
    inspection:inspectionReducer,
    inspectionQuestions:inspectionQuestionsReducer
});