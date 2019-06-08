import axios from 'axios';
import {GET_CURRENT_INSPECTION_GPS, GET_CURRENT_INSPECTION_OPERATORS, GET_ERRORS} from './types';

export const registerInspection = (inspection, reset) => dispatch => {
    axios.post('/api/inspections/registration', inspection)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .then(res => reset())
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getInspectionsOperators = () => dispatch => {
    axios.post('/api/inspections/getInspectionsOperators')
        .then(res => {
            dispatch({
                type: GET_CURRENT_INSPECTION_OPERATORS,
                payload: res.data
            });
        });
};

export const getInspectionsGPS = (operator, mapVisibility) => dispatch => {
    axios.post('/api/inspections/getInspections', operator)
        .then(res => {
            dispatch({
                type: GET_CURRENT_INSPECTION_GPS,
                payload: res.data
            });
            mapVisibility();
        })
        .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    });
};
