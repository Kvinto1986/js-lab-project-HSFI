import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_CARDS} from './types';


export const registerCard = (card, history) => dispatch => {
    axios.post('/api/sellerCard/registration', card)
        .then(res => {
            console.log(res);
            history.push('/success')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getCards = () => dispatch =>{
    axios.post('/api/sellerCard/getCards')
        .then(res => {
            dispatch({
                type: SET_CURRENT_CARDS,
                payload: res.data
            });
        });
};