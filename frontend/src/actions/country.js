import axios from 'axios';
import {SET_CURRENT_COUNTRY} from './types';

export const getCountry = () => dispatch => {
    axios.post('/api/country/getCountry')
        .then(res => {
            dispatch({
                type: SET_CURRENT_COUNTRY,
                payload: res.data
            });
        });
};

