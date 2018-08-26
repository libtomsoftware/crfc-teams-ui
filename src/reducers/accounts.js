import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function accountsReducer(state = initialState.accounts, action) {

    switch (action.type) {
    case types.ACCOUNTS_UPDATE:
        return action.accounts;
    default:
        return state;
    }

}
