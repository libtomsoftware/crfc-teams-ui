import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function gameStatesReducer(state = initialState.gamestates, action) {

    switch (action.type) {
    case types.GAMESTATES_UPDATE:
        return action.gamestates;
    default:
        return state;
    }

}
