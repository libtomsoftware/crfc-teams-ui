import { combineReducers } from 'redux';
import account from './account';
import accounts from './accounts';
import agegroups from './agegroups';
import gameresults from './gameresults';
import leagues from './leagues';
import loader from './loader';
import menu from './menu';
import nav from './nav';
import opponents from './opponents';
import teams from './teams';
import toast from './toast';

const rootReducer = combineReducers({
    account,
    accounts,
    agegroups,
    gameresults,
    leagues,
    loader,
    menu,
    nav,
    opponents,
    teams,
    toast
});

export default rootReducer;
