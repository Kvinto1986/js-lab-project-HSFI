import { GET_CURRENT_REPORT } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_CURRENT_REPORT:
            return action.payload;
        default:
            return state;
    }
}