import axios from 'axios';
import {GET_CURRENT_REPORT, GET_ERRORS} from './types';


export const getReport = (report) => dispatch => {
    axios.post('https://hsfi-back.herokuapp.com/api/reports/getReport', report)
        .then(res => {
            dispatch({
                type: GET_CURRENT_REPORT,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
};


