import axios from 'axios';
import { CONFIG } from '../config-constants';
import * as types from './action-types';
import * as toastActions from './toast-actions';
import * as loaderActions from './loader-actions';

function showToast(type, message, dispatch) {
    toastActions.show({
        message,
        type
    })(dispatch);
}

function getUpdateEvent(leagues) {
    return {
        type: types.LEAGUES_UPDATE,
        leagues
    };
}

export function fetch() {
    let leagues = [];

    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            const response = await axios.get(`${CONFIG.URL.API}/leagues`, {
                withCredentials: true
            });

            if (response && response.data) {
                leagues = response.data.leagues;
            }
        } catch (error) {
            console.error('leagues error', error);
        }

        dispatch(getUpdateEvent(leagues));
        loaderActions.hide()(dispatch);

        return new Promise(resolve => {
            resolve(leagues);
        });
    };
}

export function add(leagueData) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.put(`${CONFIG.URL.API}/leagues`, leagueData, {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.NEW_LEAGUE_ADDED, dispatch);
        } catch (error) {
            let message;

            if (error.response && error.response.status === 409) {
                message = CONFIG.MESSAGE.ERROR.LEAGUE_EXISTS;
            } else {
                message = CONFIG.MESSAGE.ERROR.LEAGUE_NOT_ADDED;
            }

            showToast('danger', message, dispatch);
        }
        loaderActions.hide()(dispatch);

        return fetch()(dispatch);
    };
}

export function edit(leagueData) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.post(`${CONFIG.URL.API}/leagues`, Object.assign({}, leagueData), {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.LEAGUE_UPDATED, dispatch);
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.LEAGUE_UPDATE, dispatch);
        }
        loaderActions.hide()(dispatch);

        return fetch()(dispatch);
    };
}

export function remove(id) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.delete(`${CONFIG.URL.API}/leagues/${id}`, {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.LEAGUE_DELETED, dispatch);
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.LEAGUE_DELETE, dispatch);
        }
        loaderActions.hide()(dispatch);
        return fetch()(dispatch);
    };
}

export function update(leagues) {
    return function (dispatch) {
        dispatch(getUpdateEvent(leagues));
    };
}
