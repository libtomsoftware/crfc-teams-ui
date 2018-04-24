import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function loaderReducer(state = initialState.loader, action) {

    switch (action.type) {
    case types.LOADER_SHOW:
        return action.loader;
    case types.LOADER_HIDE:
        return action.loader;
    default:
        return state;
    }

}
