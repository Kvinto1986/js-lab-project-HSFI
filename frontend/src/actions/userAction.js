import axios from 'axios';
import {GET_ERRORS} from './types';

export const registerUser = (user, reset, history) => dispatch => {
    axios.post('/api/users/registration', user)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(res => history.push('/login'))
        .then (res =>reset())
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const updateUser = (user, reset) => dispatch => {
    axios.post('/api/users/update', user)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        }).then (res =>reset())
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const updateUserPassword = (newPassword, updatePassword) => dispatch => {
    axios.post('/api/users/changePassword', newPassword)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then (res =>updatePassword())
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
