import * as types from './action-types';

function getMenuShowEvent() {
    return {
        type: types.MENU_SHOW,
        menu: true
    };
}

function getMenuHideEvent() {
    return {
        type: types.MENU_HIDE,
        menu: false
    };
}

export function show() {
    return function (dispatch) {
        dispatch(getMenuShowEvent());
    };
}

export function hide() {
    return function (dispatch) {
        dispatch(getMenuHideEvent());
    };
}
