import * as types from './action-types';
import ToastModel from '../models/toast';

function getToastShowEvent(data) {
    return {
        type: types.TOAST_SHOW,
        toast: new ToastModel(data)
    };
}

function getToastHideEvent() {
    return {
        type: types.TOAST_HIDE,
        toast: null
    };
}

export function show(data) {
    return function (dispatch) {
        dispatch(getToastShowEvent(data));
    };
}

export function hide() {
    return function (dispatch) {
        dispatch(getToastHideEvent());
    };
}
