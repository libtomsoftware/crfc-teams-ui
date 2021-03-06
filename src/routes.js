import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';
import { browserHistory } from 'react-router';
import Helpers from './services/helpers';

import Layout from './pages/layout';
import PageHome from './pages/home/page-home';
import PageLogin from './pages/login/page-login';
import PagePlayers from './pages/players/page-players';
import PageRegister from './pages/register/page-register';
import PageSettings from './pages/settings/page-settings';
import PageSettingsClubAgeGroups from './pages/settings/page-settings-club-agegroups';
import PageSettingsClubLeagues from './pages/settings/page-settings-club-leagues';
import PageSettingsClubOpponents from './pages/settings/page-settings-club-opponents';
import PageSettingsClubGameResults from './pages/settings/page-settings-club-gameresults';
import PageSettingsClubGameStates from './pages/settings/page-settings-club-gamestates';
import PageAccounts from './pages/accounts/page-accounts';
import PageAccount from './pages/account/page-account';
import PageTeams from './pages/teams/page-teams';
import PageTeam from './pages/team/page-team';

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

        <Route path="settings/agegroups" component={PageSettingsClubAgeGroups} />
        <Route path="settings/agegroups/:type" component={PageSettingsClubAgeGroups} />
        <Route path="settings/agegroups/:type/:id" component={PageSettingsClubAgeGroups} />

        <Route path="settings/leagues" component={PageSettingsClubLeagues} />
        <Route path="settings/leagues/:type" component={PageSettingsClubLeagues} />
        <Route path="settings/leagues/:type/:id" component={PageSettingsClubLeagues} />

        <Route path="settings/opponents" component={PageSettingsClubOpponents} />
        <Route path="settings/opponents/:type" component={PageSettingsClubOpponents} />
        <Route path="settings/opponents/:type/:id" component={PageSettingsClubOpponents} />

        <Route path="settings/gameresults" component={PageSettingsClubGameResults} />
        <Route path="settings/gameresults/:type" component={PageSettingsClubGameResults} />
        <Route path="settings/gameresults/:type/:id" component={PageSettingsClubGameResults} />

        <Route path="settings/gamestates" component={PageSettingsClubGameStates} />
        <Route path="settings/gamestates/:type" component={PageSettingsClubGameStates} />
        <Route path="settings/gamestates/:type/:id" component={PageSettingsClubGameStates} />

        <Route path="accounts" component={PageAccounts} />
        <Route path="accounts/:type" component={PageAccounts} />
        <Route path="accounts/:type/:id" component={PageAccounts} />

        <Route path="players" component={PagePlayers} />
        <Route path="players/:type" component={PagePlayers} />
        <Route path="players/:type/:id" component={PagePlayers} />

        <Route path="teams" component={PageTeams} />
        <Route path="teams/:type" component={PageTeams} />
        <Route path="teams/:type/:id" component={PageTeams} />

        <Route path="team/:managerId" component={PageTeam} />

        <Route path="account/:type/:id" component={PageAccount} />
        <Redirect from="*" to="home" />
    </Route>
);
