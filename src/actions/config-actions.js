import * as types from './action-types';

function getConfigEvent(config) {
    return {
        type: types.CONFIG_UPDATE,
        config
    };
}

export function update(config) {
    return function (dispatch) {
        dispatch(getConfigEvent(config));
    };
}
