import axios from 'axios';
import {GET_CURRENT_INSPECTION_GPS, GET_CURRENT_INSPECTION_OPERATORS, GET_ERRORS} from './types';
import server from '../utils/serverConfig'

export const registerInspection = (inspection, reset) => dispatch => {
    axios.post(`${server}api/inspections/registration`, inspection)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(res => reset())
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            }
        });
};

export const getInspectionsOperators = () => dispatch => {
    axios.post(`${server}api/inspections/getInspectionsOperators`)
        .then(res => {
            dispatch({
                type: GET_CURRENT_INSPECTION_OPERATORS,
                payload: res.data
            });
        });
};

export const getInspectionsGPS = (operator, mapVisibility) => dispatch => {
    axios.post(`${server}api/inspections/getInspections`, operator)
        .then(res => {
            dispatch({
                type: GET_CURRENT_INSPECTION_GPS,
                payload: res.data
            });
            mapVisibility();
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
