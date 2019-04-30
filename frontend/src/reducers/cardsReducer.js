import { GET_CURRENT_CARDS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_CURRENT_CARDS:
            return action.payload;
        default:
            return state;
    }
}