import axios from 'axios';
import {GET_ERRORS, GET_CURRENT_SELLERS} from './types';

export const registerSeller = (user, reset) => dispatch => {
    axios.post('/api/sellers/registration', user)
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

export const getSellers = () => dispatch =>{
    axios.post('/api/sellers/getSellers')
        .then(res => {
            dispatch({
                type: GET_CURRENT_SELLERS,
                payload: res.data
            });
        });
};