import axios from 'axios';
import {GET_ERRORS} from './types';
import server from '../utils/serverConfig'

export const registerCall = (call, reset) => dispatch => {
    axios.post(`${server}api/calls/registration`, call)
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


