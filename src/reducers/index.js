import { combineReducers } from 'redux';
import account from './account';
import accounts from './accounts';
import agegroups from './agegroups';
import leagues from './leagues';
import loader from './loader';
import menu from './menu';
import teams from './teams';
import toast from './toast';

const rootReducer = combineReducers({
    account,
    accounts,
    agegroups,
    leagues,
    loader,
    menu,
    teams,
    toast
});

export default rootReducer;
