import axios from 'axios';
import {GET_ERRORS,GET_CURRENT_ORGANIZATIONS,} from './types';


export const registerOrganization = (organization,reset) => dispatch => {
    axios.post('https://hsfi-back.herokuapp.com/api/organizations/registration', organization)
        .then(() => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(() =>reset())
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getOrganizations = () => dispatch => {
    axios.post('https://hsfi-back.herokuapp.com/api/organizations/getOrganizations')
        .then(res => {
            dispatch({
                type: GET_CURRENT_ORGANIZATIONS,
                payload: res.data
            });
        });
};

