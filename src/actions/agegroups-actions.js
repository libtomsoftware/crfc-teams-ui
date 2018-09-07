import axios from 'axios';
import { CONFIG } from '../config-constants';
import * as types from './action-types';
import * as toastActions from './toast-actions';
import * as loaderActions from './loader-actions';
import * as async from './common/async';

function showToast(type, message, dispatch) {
    toastActions.show({
        message,
        type
    })(dispatch);
}

function getUpdateEvent(agegroups) {
    return {
        type: types.AGEGROUPS_UPDATE,
        agegroups
    };
}

export async function load(dispatch) {
    return async.fetch(dispatch, 'agegroups');
}

export function fetch() {
    let agegroups = [];

    return async function (dispatch) {
        agegroups = await load(dispatch);

        dispatch(getUpdateEvent(agegroups));

        return new Promise(resolve => {
            resolve(agegroups);
        });
    };
}

export function add(agegroupData) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.put(`${CONFIG.URL.API}/agegroups`, agegroupData, {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.NEW_AGEGROUP_ADDED, dispatch);
        } catch (error) {
            let message;

            if (error.response && error.response.status === 409) {
                message = CONFIG.MESSAGE.ERROR.AGEGROUP_EXISTS;
            } else {
                message = CONFIG.MESSAGE.ERROR.AGEGROUP_NOT_ADDED;
            }

            showToast('danger', message, dispatch);
        }
        loaderActions.hide()(dispatch);
        return fetch()(dispatch);
    };
}

export function edit(agegroupData) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.post(`${CONFIG.URL.API}/agegroups`, Object.assign({}, agegroupData), {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.AGEGROUP_UPDATED, dispatch);
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.AGEGROUP_UPDATE, dispatch);
        }
        loaderActions.hide()(dispatch);
        return fetch()(dispatch);
    };
}

export function remove(id) {
    return async function (dispatch) {
        await async.remove(dispatch, {
            id,
            resource: 'agegroups',
            success: 'AGEGROUP_DELETED',
            error: 'AGEGROUP_DELETE'
        });
        return fetch()(dispatch);
    };
}

export function update(agegroups) {
    return function (dispatch) {
        dispatch(getUpdateEvent(agegroups));
    };
}
