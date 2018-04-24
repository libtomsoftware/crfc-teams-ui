import * as types from './action-types';

function getLoaderShowEvent() {
    return {
        type: types.LOADER_SHOW,
        loader: true
    };
}

function getLoaderHideEvent() {
    return {
        type: types.LOADER_HIDE,
        loader: false
    };
}

export function show() {
    return function (dispatch) {
        dispatch(getLoaderShowEvent());
    };
}

export function hide() {
    return function (dispatch) {
        dispatch(getLoaderHideEvent());
    };
}
