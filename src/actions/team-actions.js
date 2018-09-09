import * as types from './action-types';
import * as accountsActions from './accounts-actions';
import * as agegroupsActions from './agegroups-actions';
import * as leaguesActions from './leagues-actions';
import * as toastActions from './toast-actions';
import * as teamsActions from './teams-actions';
import TeamModel from '../models/team';
import { CONFIG } from '../config-constants';

function showToast(type, message, dispatch) {
    toastActions.show({
        message,
        type
    })(dispatch);
}

function getUpdateEvent(team) {
    return {
        type: types.TEAM_UPDATE,
        team
    };
}

export function update(team) {
    return function (dispatch) {
        dispatch(getUpdateEvent(team));
    };
}

export function find( managerId ) {
    return async function (dispatch) {
        const teams = await teamsActions.load(dispatch);
        const accounts = await accountsActions.load(dispatch);
        const agegroups = await agegroupsActions.load(dispatch);
        const leagues = await leaguesActions.load(dispatch);

        if (!!!teams || !!!teams.length) {
            showToast('warning', CONFIG.MESSAGE.INFO.NONE_SO_FAR('teams'), dispatch);

            return {
                type: types.TEAM_UPDATE,
                team: null
            };
        }

        let team = teams.find(item => {
            if (!item.manager && !item.manager2) {
                return false;
            }

            if (item.manager2 && item.manager2 === managerId) {
                return true;
            }
            return item.manager && item.manager === managerId;
        });

        team = new TeamModel(team, accounts, agegroups, leagues);

        return update(team)(dispatch);
    };
}


