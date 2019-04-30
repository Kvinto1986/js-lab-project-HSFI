import { GET_CURRENT_SELLERS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_CURRENT_SELLERS:
            return action.payload;
        default:
            return state;
    }
}