import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function leaguesReducer(state = initialState.leagues, action) {

    switch (action.type) {
    case types.LEAGUES_UPDATE:
        return action.leagues;
    default:
        return state;
    }

}
