import { combineReducers } from 'redux';
import account from './account';
import accounts from './accounts';
import agegroups from './agegroups';
import gameresults from './gameresults';
import gamestates from './gamestates';
import leagues from './leagues';
import loader from './loader';
import menu from './menu';
import nav from './nav';
import opponents from './opponents';
import players from './players';
import team from './team';
import teams from './teams';
import toast from './toast';

const rootReducer = combineReducers({
    account,
    accounts,
    agegroups,
    gameresults,
    gamestates,
    leagues,
    loader,
    menu,
    nav,
    opponents,
    players,
    team,
    teams,
    toast
});

export default rootReducer;
