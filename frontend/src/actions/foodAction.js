import axios from 'axios';
import {GET_ERRORS, GET_CURRENT_FOOD} from './types';

export const registerFood = (food) => dispatch => {
    axios.post('/api/foodGroups/registration', food)
        .then(res => res)
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getFood = () => dispatch => {
    axios.post('/api/foodGroups/getFood')
        .then(res => {
            dispatch({
                type: GET_CURRENT_FOOD,
                payload: res.data
            });
        });
};

