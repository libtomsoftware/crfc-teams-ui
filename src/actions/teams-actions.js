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

function getUpdateEvent(teams) {
    return {
        type: types.TEAMS_UPDATE,
        teams
    };
}

export async function load(dispatch) {
    return async.fetch(dispatch, 'teams');
}

export function fetch() {
    let teams = [];

    return async function (dispatch) {
        teams = await load(dispatch);

        dispatch(getUpdateEvent(teams));

        return new Promise(resolve => {
            resolve(teams);
        });
    };
}

export function add(agegroupData) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.put(`${CONFIG.URL.API}/teams`, agegroupData, {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.NEW_TEAM_ADDED, dispatch);
        } catch (error) {
            let message;

            if (error.response && error.response.status === 409) {
                message = CONFIG.MESSAGE.ERROR.TEAM_EXISTS;
            } else {
                message = CONFIG.MESSAGE.ERROR.TEAM_NOT_ADDED;
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
            await axios.post(`${CONFIG.URL.API}/teams`, Object.assign({}, agegroupData), {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.TEAM_UPDATED, dispatch);
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.TEAM_UPDATE, dispatch);
        }
        loaderActions.hide()(dispatch);
        return fetch()(dispatch);
    };
}

export function remove(id) {
    return async function (dispatch) {
        await async.remove(dispatch, {
            id,
            resource: 'teams',
            success: 'TEAM_DELETED',
            error: 'TEAM_DELETE'
        });
        return fetch()(dispatch);
    };
}

export function update(teams) {
    return function (dispatch) {
        dispatch(getUpdateEvent(teams));
    };
}
