import * as types from './action-types';

function getNavShowEvent() {
    return {
        type: types.NAV_SHOW,
        nav: true
    };
}

function getNavHideEvent() {
    return {
        type: types.NAV_HIDE,
        nav: false
    };
}

export function show() {
    return function (dispatch) {
        dispatch(getNavShowEvent());
    };
}

export function hide() {
    return function (dispatch) {
        dispatch(getNavHideEvent());
    };
}
