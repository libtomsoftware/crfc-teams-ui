import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function opponentsReducer(state = initialState.opponents, action) {

    switch (action.type) {
    case types.OPPONENTS_UPDATE:
        return action.opponents;
    default:
        return state;
    }

}
