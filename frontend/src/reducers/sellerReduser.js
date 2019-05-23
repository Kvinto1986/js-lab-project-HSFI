import { GET_CURRENT_SELLER } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_CURRENT_SELLER:
            return action.payload;
        default:
            return state;
    }
}