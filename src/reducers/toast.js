import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function toastReducer(state = initialState.toast, action) {

    switch (action.type) {
    case types.TOAST_SHOW:
        return action.toast;
    case types.TOAST_HIDE:
        return action.toast;
    default:
        return state;
    }

}
