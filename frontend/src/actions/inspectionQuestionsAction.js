import axios from 'axios';
import {GET_ERRORS, GET_CURRENT_INSPECTION_QUESTIONS} from './types';

export const registerInspectionQuestion = (inspection, reset) => dispatch => {
    axios.post('https://hsfi-back.herokuapp.com/api/inspectionQuestions/registration', inspection)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(res => reset())
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getInspectionQuestions = (radioStatus) => dispatch => {
    axios.post('https://hsfi-back.herokuapp.com/api/inspectionQuestions/getQuestions')
        .then(res => {
            dispatch({
                type: GET_CURRENT_INSPECTION_QUESTIONS,
                payload: res.data
            });
        })
        .then(res => {
            if (radioStatus)
                radioStatus()
        });
};