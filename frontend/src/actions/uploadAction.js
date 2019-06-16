import axios from 'axios';
import server from '../utils/serverConfig'

export const uploadImage = (image, email, imageType) => dispatch => {
    axios.post(`${server}api/uploads/upload`, image, {
        headers: {
            'email': email,
            'user': imageType,
        }
    })
};