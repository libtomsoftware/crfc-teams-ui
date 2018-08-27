import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function teamsReducer(state = initialState.teams, action) {

    switch (action.type) {
    case types.TEAMS_UPDATE:
        return action.teams;
    default:
        return state;
    }

}
