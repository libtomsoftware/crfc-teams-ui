import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function navReducer(state = initialState.nav, action) {

    switch (action.type) {
    case types.NAV_SHOW:
        return action.nav;
    case types.NAV_HIDE:
        return action.nav;
    default:
        return state;
    }

}
