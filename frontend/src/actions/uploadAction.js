import axios from 'axios';
import {GET_ERRORS} from './types';

export const uploadImage = (image, email) => dispatch => {
    axios.post("/api/uploads/upload", image, {
        headers: {
            'email': email
        }
    })
        .then(res => res)
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}