import { GET_CURRENT_CALLS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_CURRENT_CALLS:
            return action.payload;
        default:
            return state;
    }
}