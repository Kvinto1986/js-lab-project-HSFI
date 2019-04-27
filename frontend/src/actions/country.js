import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_COUNTRY} from './types';

export const registerCountry = (country) => dispatch => {
    axios.post('/api/countries/registration', country)
        .then(res => res)
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getCountry = () => dispatch => {
    axios.post('/api/countries/getCountry')
        .then(res => {
            dispatch({
                type: SET_CURRENT_COUNTRY,
                payload: res.data
            });
        });
};

