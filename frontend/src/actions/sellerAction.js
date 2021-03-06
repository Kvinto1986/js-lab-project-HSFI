import axios from 'axios';
import {
    GET_ERRORS,
    GET_CURRENT_SELLERS_LICENSES,
    GET_CURRENT_SELLER,
    GET_CURRENT_SELLERS,
    GET_CURRENT_CITY
} from './types';
import server from '../utils/serverConfig'

export const registerSeller = (user, reset, uploadImage) => dispatch => {
    axios.post(`${server}api/sellers/registration`, user)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(() => {
            uploadImage()
            reset()
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            }
        });
};

export const getSellersLicenses = (country) => dispatch => {
    axios.post(`${server}api/sellers/getSellersLicenses`, country)
        .then(res => {
            dispatch({
                type: GET_CURRENT_SELLERS_LICENSES,
                payload: res.data
            });
        });
};

export const findSeller = (license) => dispatch => {
    axios.post(`${server}api/sellers/findSeller`, license)
        .then(res => {
            dispatch({
                type: GET_CURRENT_SELLER,
                payload: res.data
            });
        });
};

export const findSellers = (userParams) => dispatch => {
    axios.post(`${server}api/sellers/findSellers`, userParams)
        .then(res => {
            dispatch({
                type: GET_CURRENT_SELLERS,
                payload: res.data
            });
        });
};

export const getCities = (country) => dispatch => {
    axios.post(`${server}api/sellers/getCities`, country)
        .then(res => {
            dispatch({
                type: GET_CURRENT_CITY,
                payload: res.data
            });
        });
};

export const updateSeller = (seller, reset, findSellers) => dispatch => {
    axios.post(`${server}api/sellers/update`, seller)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(() => {
            reset()
        })
        .then(() => setTimeout(() => {
            findSellers(0)
        }, 2500))
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            }
        });
};