import axios from 'axios';
import {GET_ERRORS, GET_CURRENT_ORGANIZATIONS,} from './types';
import server from '../utils/serverConfig'

export const registerOrganization = (organization, reset) => dispatch => {
    axios.post(`${server}api/organizations/registration`, organization)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(res => {
            if (reset) {
                reset()
            }
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            }
        });
};

export const getOrganizations = () => dispatch => {
    axios.post(`${server}api/organizations/getOrganizations`)
        .then(res => {
            dispatch({
                type: GET_CURRENT_ORGANIZATIONS,
                payload: res.data
            });
        });
};

export const deleteOrganization = (organization,reset)  => dispatch => {
    axios.post(`${server}api/organizations/deleteOrganization`,organization)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(res => reset())
};

