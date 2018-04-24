import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function playersReducer(state = initialState.players, action) {

    switch (action.type) {
    case types.PLAYERS_UPDATE:
        return action.players;

    default:
        return state;
    }

}
