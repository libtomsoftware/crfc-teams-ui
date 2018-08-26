import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';
import { browserHistory } from 'react-router';
import Helpers from './services/helpers';

import Layout from './pages/layout';
import PageHome from './pages/home/page-home';
import PageLogin from './pages/login/page-login';
import PageRegister from './pages/register/page-register';
import PageSettings from './pages/settings/page-settings';
import PageSettingsClubCategories from './pages/settings/page-settings-club-categories';
import PageSettingsClubLeagues from './pages/settings/page-settings-club-leagues';
import PageManagers from './pages/managers/page-managers';
import PageAccount from './pages/account/page-account';

function onRouteChange(previous, next) {
    window.scrollTo(0, 0);

    if (Helpers.shouldRedirectToLogin(next.location.pathname)) {
        browserHistory.push('/login');
    }
}

//routes: teams, team/:id, players/:teamId, player/:id, games/:teamId, livetool :)

export default (
    <Route path="/" component={Layout} onChange={onRouteChange}>
        <IndexRedirect to="home" />
        <Route path="home" component={PageHome} />
        <Route path="login" component={PageLogin} />
        <Route path="register" component={PageRegister} />
        <Route path="settings" component={PageSettings} />
        <Route path="settings/categories" component={PageSettingsClubCategories} />
        <Route path="settings/categories/:type" component={PageSettingsClubCategories} />
        <Route path="settings/categories/:type/:id" component={PageSettingsClubCategories} />
        <Route path="settings/leagues" component={PageSettingsClubLeagues} />
        <Route path="account/:type/:id" component={PageAccount} />
        <Route path="managers" component={PageManagers} />
        <Redirect from="*" to="home" />
    </Route>
);
