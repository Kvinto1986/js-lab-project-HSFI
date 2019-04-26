import axios from 'axios';
import {GET_ERRORS,SET_CURRENT_SELLERS} from './types';


export const registerSeller = (user, history) => dispatch => {
    axios.post('/api/sellers/sellerRegister', user)
        .then(res => {
            console.log(res)
            history.push('/success')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getSellers = () => {
    axios.post('/api/sellers/getSellers')
        .then(res => console.log(res.data));
};