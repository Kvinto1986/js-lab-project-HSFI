import axios from 'axios';
import {
    GET_ERRORS,
    GET_CURRENT_SELLERS_LICENSES,
    GET_CURRENT_SELLER,
    GET_CURRENT_SELLERS,
    GET_CURRENT_CITY
} from './types';

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

export const getSellersLicenses = () => dispatch =>{
    axios.post('/api/sellers/getSellersLicenses')
        .then(res => {
            dispatch({
                type: GET_CURRENT_SELLERS_LICENSES,
                payload: res.data
            });
        });
};

export const findSeller = (license) => dispatch =>{
    axios.post('/api/sellers/findSeller',license)
        .then(res => {
            dispatch({
                type: GET_CURRENT_SELLER,
                payload: res.data
            });
        });
};

export const findSellers = (userParams) => dispatch =>{
    axios.post('/api/sellers/findSellers',userParams)
        .then(res => {
            dispatch({
                type: GET_CURRENT_SELLERS,
                payload: res.data
            });
        });
};

export const getCities = (country) => dispatch =>{
    axios.post('/api/sellers/getCities',country)
        .then(res => {
            dispatch({
                type: GET_CURRENT_CITY,
                payload: res.data
            });
        });
};

export const updateSeller = (seller, reset,findSellers) => dispatch => {
    axios.post('/api/sellers/update', seller)
        .then(res => {

            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        }).then (res =>reset())
        .then (res =>findSellers(0))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};