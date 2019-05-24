import axios from 'axios';
import {GET_ERRORS, GET_CURRENT_SELLERS_LICENSES, GET_CURRENT_SELLER, GET_CURRENT_SELLERS} from './types';

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