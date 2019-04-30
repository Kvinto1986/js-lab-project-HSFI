import { GET_CURRENT_FOOD } from '../actions/types';

const initialState = [];

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_CURRENT_FOOD:
            return action.payload;
        default:
            return state;
    }
}