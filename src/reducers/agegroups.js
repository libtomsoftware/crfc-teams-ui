import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function agegroupsReducer(state = initialState.agegroups, action) {

    switch (action.type) {
    case types.AGEGROUPS_UPDATE:
        return action.agegroups;
    default:
        return state;
    }

}
