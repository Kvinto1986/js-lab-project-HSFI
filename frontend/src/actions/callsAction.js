import axios from 'axios';
import {GET_ERRORS} from './types';

export const registerCall = (call,reset) => dispatch => {
    axios.post('https://hsfi-back.herokuapp.com/api/calls/registration', call)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then (res =>reset())
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};


