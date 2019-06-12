import axios from 'axios';
import {GET_ERRORS, GET_CURRENT_COUNTRY} from './types';

export const registerCountry = (country,reset) => dispatch => {
    console.log(country)
    axios.post('https://hsfi-back.herokuapp.com/api/countries/registration', country)
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

export const getCountry = () => dispatch => {
    axios.post('https://hsfi-back.herokuapp.com/api/countries/getCountry')
        .then(res => {
            dispatch({
                type: GET_CURRENT_COUNTRY,
                payload: res.data
            });
        });
};

