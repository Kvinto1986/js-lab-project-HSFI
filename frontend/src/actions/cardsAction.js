import axios from 'axios';
import {GET_ERRORS, GET_CURRENT_CARDS} from './types';


export const registerCard = (card,reset) => dispatch => {
    axios.post('https://hsfi-back.herokuapp.com/api/sellerCards/registration', card)
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

export const getCards = () => dispatch =>{
    axios.post('https://hsfi-back.herokuapp.com/api/sellerCards/getCards')
        .then(res => {
            dispatch({
                type: GET_CURRENT_CARDS,
                payload: res.data
            });
        });
};