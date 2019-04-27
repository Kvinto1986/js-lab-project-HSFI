import { SET_CURRENT_ORGANIZATIONS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_CURRENT_ORGANIZATIONS:
                return action.payload;
        default:
            return state;
    }
}