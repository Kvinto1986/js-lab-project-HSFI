import axios from 'axios';
import {GET_ERRORS,SET_CURRENT_ORGANIZATIONS,} from './types';


export const registerOrganizations = (organization) => dispatch => {
    axios.post('/api/organizations/registration', organization)
        .then(res => res)
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getOrganizations = () => dispatch => {
    axios.post('/api/organizations/getOrganizations')
        .then(res => {
            dispatch({
                type: SET_CURRENT_ORGANIZATIONS,
                payload: res.data
            });
        });
};

