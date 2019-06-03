import axios from 'axios';
import {GET_CURRENT_REPORT} from './types';


export const getReport = (report) => dispatch => {
    axios.post('/api/reports/getReport', report)
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_CURRENT_REPORT,
                payload: res.data
            });
        });
};


