import axios from 'axios';
import {GET_ERRORS} from './types';

export const uploadImage = (image, email,imageType) => dispatch => {
    axios.post("https://hsfi-back.herokuapp.com/api/uploads/upload", image, {
        headers: {
            'email': email,
            'user': imageType,
        }
    })
};