import axios from 'axios';
import {GET_ERRORS, GET_CURRENT_COUNTRY} from './types';
import server from '../utils/serverConfig'

export const registerCountry = (country, reset) => dispatch => {
    console.log(country)
    axios.post(`${server}api/countries/registration`, country)
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

export const getCountry = () => dispatch => {
    axios.post(`${server}api/countries/getCountry`)
        .then(res => {
            dispatch({
                type: GET_CURRENT_COUNTRY,
                payload: res.data
            });
        });
};

export const deleteCountry = (country, reset) => dispatch => {
    axios.post(`${server}api/countries/deleteCountry`, country)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(res => reset())
};

