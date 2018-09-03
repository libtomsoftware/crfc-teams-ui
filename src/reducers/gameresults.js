import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function gameresultsReducer(state = initialState.gameresults, action) {

    switch (action.type) {
    case types.GAMERESULTS_UPDATE:
        return action.gameresults;
    default:
        return state;
    }

}
