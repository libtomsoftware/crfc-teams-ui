import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';
import Layout from './components/layout.js';

import HomePage from './components/pages/home/home-page';
import LoginPage from './components/pages/login/login-page';

import Players from './components/pages/players/players';
import PlayerAdd from './components/pages/player/player-add';

import Redirector from './services/redirector';

function onRouteChange(previous, next) {
    window.scrollTo(0, 0);

    if (next.location.pathname !== '/login') {
        Redirector.start();
    }
}

export default (
    <Route path="/" component={Layout} onChange={onRouteChange}>
        <IndexRedirect to="home" />
        <Route path="home" component={HomePage} />
        <Route path="login" component={LoginPage} />
        <Route path="players" component={Players} />
        <Route path="player/add" component={PlayerAdd} />
        <Redirect from="*" to="home" />
    </Route>
);
