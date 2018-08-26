import { combineReducers } from 'redux';
import account from './account';
import accounts from './accounts';
import categories from './categories';
import loader from './loader';
import menu from './menu';
import toast from './toast';

const rootReducer = combineReducers({
    account,
    accounts,
    categories,
    loader,
    menu,
    toast
});

export default rootReducer;
