import axios from 'axios';
import {GET_ERRORS, GET_CURRENT_FOOD} from './types';
import server from '../utils/serverConfig'

export const registerFood = (food, reset) => dispatch => {
    axios.post(`${server}api/foodGroups/registration`, food)
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

export const getFood = () => dispatch => {
    axios.post(`${server}api/foodGroups/getFood`)
        .then(res => {
            dispatch({
                type: GET_CURRENT_FOOD,
                payload: res.data
            });
        });
};

export const deleteFood = (food,reset) => dispatch => {
    axios.post(`${server}api/foodGroups/deleteFood`,food)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(res => reset())
};

