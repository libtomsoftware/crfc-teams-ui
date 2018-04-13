import * as types from './action-types';

function getMasterStatusUpdateEvent(master) {
    return {
        type: types.MASTER_STATUS_UPDATE,
        master
    };
}

export function update(master) {
    return function (dispatch) {
        dispatch(getMasterStatusUpdateEvent(master));
    };
}
