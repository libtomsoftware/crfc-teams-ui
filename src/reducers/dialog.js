import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function dialogReducer(state = initialState.dialog, action) {
    switch (action.type) {

    case types.DIALOG_OPEN:
        return action.dialog;

    case types.DIALOG_CLOSE:
        return action.dialog;

    default:
        return state;
    }

}
