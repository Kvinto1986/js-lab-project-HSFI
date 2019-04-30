import { EMPTY_ERRORS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case EMPTY_ERRORS:
            return {};
        default:
            return state;
    }
}