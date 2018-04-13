import * as types from './action-types';
import initialState from '../store/initial-state';

function getDialogOpenEvent(dialog) {
    return {
        type: types.DIALOG_OPEN,
        dialog
    };
}

function getDialogCloseEvent() {
    return {
        type: types.DIALOG_CLOSE,
        dialog: initialState.dialog
    };
}

export function open(dialog) {
    return function (dispatch) {
        dispatch(getDialogOpenEvent(dialog));
    };
}

export function close() {
    return function (dispatch) {
        dispatch(getDialogCloseEvent());
    };
}
