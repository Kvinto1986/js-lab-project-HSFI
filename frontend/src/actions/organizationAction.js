import axios from 'axios';
import {GET_ERRORS,GET_CURRENT_ORGANIZATIONS,} from './types';


export const registerOrganization = (organization) => dispatch => {
    axios.post('/api/organizations/registration', organization)
        .then(() => {

            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
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
                type: GET_CURRENT_ORGANIZATIONS,
                payload: res.data
            });
        });
};

