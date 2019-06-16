import axios from 'axios';
import {GET_ERRORS, GET_USERS} from './types';
import server from '../utils/serverConfig'

export const registerUser = (user, reset, history, registerOrganization, organization) => dispatch => {
    axios.post(`${server}api/users/registration`, user)
        .then(res => history.push('/login'))
        .then(res =>
            registerOrganization(organization).then(() => reset()))
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
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

export const updateUser = (user, reset) => dispatch => {
    axios.post(`${server}api/users/update`, user)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        }).then(res => reset())
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            }
        });
};

export const updateUserPassword = (newPassword, updatePassword) => dispatch => {
    axios.post(`${server}api/users/changePassword`, newPassword)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(res => updatePassword())
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            }
        });
};

export const getUsers = (role) => dispatch => {
    axios.post(`${server}api/users/getUsers`, role)
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        });
};

export const confirmUser = (id, refreshUsers) => dispatch => {
    axios.post(`${server}api/users/confirmUser`, id)
        .then(res => refreshUsers(0))
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            }
        });
};
