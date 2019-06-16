import axios from 'axios';
import {GET_ERRORS, GET_CURRENT_INSPECTION_QUESTIONS} from './types';
import server from '../utils/serverConfig'

export const registerInspectionQuestion = (inspection, reset) => dispatch => {
    axios.post(`${server}api/inspectionQuestions/registration`, inspection)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(res => reset())
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            }
        });
};

export const getInspectionQuestions = (radioStatus) => dispatch => {
    axios.post(`${server}api/inspectionQuestions/getQuestions`)
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

export const deleteInspectionQuestion = (question,reset) => dispatch => {
    axios.post(`${server}api/inspectionQuestions/deleteQuestion`,question)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(res => reset())

};