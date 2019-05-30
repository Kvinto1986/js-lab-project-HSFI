import axios from 'axios';
import {GET_ERRORS} from './types';

export const registerInspection = (inspection, reset) => dispatch => {
    axios.post('/api/inspection/registration', inspection)
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
