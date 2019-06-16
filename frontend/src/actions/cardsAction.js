import axios from 'axios';
import {GET_ERRORS, GET_CURRENT_CARDS} from './types';
import server from '../utils/serverConfig'

export const registerCard = (card, reset) => dispatch => {
    axios.post(`${server}api/sellerCards/registration`, card)
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

export const getCards = () => dispatch => {
    axios.post(`${server}api/sellerCards/getCards`)
        .then(res => {
            dispatch({
                type: GET_CURRENT_CARDS,
                payload: res.data
            });
        });
};