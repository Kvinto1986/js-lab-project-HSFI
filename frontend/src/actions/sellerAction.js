import axios from 'axios';
import {
    GET_ERRORS,
    GET_CURRENT_SELLERS_LICENSES,
    GET_CURRENT_SELLER,
    GET_CURRENT_SELLERS,
    GET_CURRENT_CITY
} from './types';

export const registerSeller = (user, reset,uploadImage) => dispatch => {
    axios.post('https://hsfi-back.herokuapp.com/api/sellers/registration', user)
        .then (() =>{uploadImage()
    reset()})
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getSellersLicenses = (country) => dispatch =>{
    axios.post('https://hsfi-back.herokuapp.com/api/sellers/getSellersLicenses',country)
        .then(res => {
            dispatch({
                type: GET_CURRENT_SELLERS_LICENSES,
                payload: res.data
            });
        });
};

export const findSeller = (license) => dispatch =>{
    axios.post('https://hsfi-back.herokuapp.com/api/sellers/findSeller',license)
        .then(res => {
            dispatch({
                type: GET_CURRENT_SELLER,
                payload: res.data
            });
        });
};

export const findSellers = (userParams) => dispatch =>{
    axios.post('https://hsfi-back.herokuapp.com/api/sellers/findSellers',userParams)
        .then(res => {
            dispatch({
                type: GET_CURRENT_SELLERS,
                payload: res.data
            });
        });
};

export const getCities = (country) => dispatch =>{
    axios.post('https://hsfi-back.herokuapp.com/api/sellers/getCities',country)
        .then(res => {
            dispatch({
                type: GET_CURRENT_CITY,
                payload: res.data
            });
        });
};

export const updateSeller = (seller, reset,findSellers) => dispatch => {
    axios.post('https://hsfi-back.herokuapp.com/api/sellers/update', seller)
        .then (() =>{reset()})
        .then(()=>setTimeout(()=>{findSellers(0)}, 2500))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};