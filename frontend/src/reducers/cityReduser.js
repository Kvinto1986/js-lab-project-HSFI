import { GET_CURRENT_CITY } from '../actions/types';

const initialState = [];

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_CURRENT_CITY:
            return action.payload;
        default:
            return state;
    }
}