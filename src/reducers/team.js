import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function teamsReducer(state = initialState.team, action) {

    switch (action.type) {
    case types.TEAM_UPDATE:
        return action.team;
    default:
        return state;
    }

}
