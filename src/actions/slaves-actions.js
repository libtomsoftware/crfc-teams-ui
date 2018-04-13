import * as types from './action-types';

function getSlavesEvent(slaves) {
    return {
        type: types.SLAVES_UPDATE,
        slaves
    };
}

export function update(slaves) {
    return function (dispatch) {
        dispatch(getSlavesEvent(slaves));
    };
}
