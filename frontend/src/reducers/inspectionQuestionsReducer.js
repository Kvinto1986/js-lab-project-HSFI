import { GET_CURRENT_INSPECTION_QUESTIONS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_CURRENT_INSPECTION_QUESTIONS:
            return action.payload;
        default:
            return state;
    }
}