import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { StandardTable } from '../../components/tables/standard-table';
import StandardEntityForm from '../../components/forms/standard-entity';
import StandardDeleteForm from '../../components/forms/standard-delete';
import Footer from '../../components/common/footer/footer';
import Helpers from '../../services/helpers';
import TeamModel from '../../models/team';
import { CONFIG } from '../../config-constants';

import * as accountsActions from '../../actions/accounts-actions';
import * as agegroupsActions from '../../actions/agegroups-actions';
import * as leaguesActions from '../../actions/leagues-actions';
import * as teamsActions from '../../actions/teams-actions';
import * as toastActions from '../../actions/toast-actions';

class PageTeams extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.accounts.fetch().then(accounts => {
            if (!!!accounts.length) {
                this.props.actions.toast({
                    message: CONFIG.INFO.TEAM_REQUIRES_MANAGER
                });
                return;
            }

            this.props.actions.agegroups.fetch().then(agegroups => {
                if (!!!agegroups.length) {
                    this.props.actions.toast({
                        message: CONFIG.INFO.TEAM_REQUIRES_AGEGROUP
                    });
                    return;
                }
            });

            this.props.actions.leagues.fetch().then(leagues => {
                if (!!!leagues.length) {
                    this.props.actions.toast({
                        message: CONFIG.INFO.TEAM_REQUIRES_LEAGUE
                    });
                    return;
                }

                this.props.actions.teams.fetch();
            });
        });
    }

    get isTablePage() {
        return !Helpers.isPage([
            'add',
            'edit',
            'delete'
        ], this.props);
    }

    get fields() {
        return [
            'agegroup', 'name', 'league', 'manager', 'link'
        ];
    }

    get agegroupDropdownOptions() {
        if (!this.props.agegroups.length) {
            return [];
        }

        return this.props.agegroups.map(agegroup => {
            return {
                value: agegroup._id,
                label: agegroup.abbreviation
            };
        });
    }

    get managersDropdownOptions() {
        if (!this.props.accounts.length) {
            return [];
        }

        return this.props.accounts.map(account => {
            return {
                value: account._id,
                label: `${account.firstname} ${account.surname}`
            };
        }).sort((a, b) => {
            return Helpers.sortAscending('label')(a, b);
        });
    }

    get leaguesDropdownOptions() {
        if (!this.props.leagues.length) {
            return [];
        }

        return this.props.leagues.map(league => {
            return {
                value: league._id,
                label: `${league.abbreviation}`
            };
        });
    }

    get fieldsets() {
        return [{
            formGroups: [{
                name: 'agegroup',
                label: 'Age Group',
                placeholder: 'age group',
                type: 'dropdown',
                options: this.agegroupDropdownOptions
            }, {
                name: 'name',
                label: 'Name',
                placeholder: 'name of the team'
            }, {
                name: 'league',
                label: 'League',
                type: 'dropdown',
                options: this.leaguesDropdownOptions
            }, {
                name: 'manager',
                label: 'Manager',
                type: 'dropdown',
                options: this.managersDropdownOptions
            }, {
                name: 'link',
                label: 'Link',
                placeholder: 'Link to team\'s website',
                maxLength: 50
            }]
        }];
    }

    get bottomLinks() {
        return [{
            href: '/teams',
            class: 'btn btn-primary',
            label: 'List of teams'
        }];
    }

    get tableData() {
        const teams = this.props.teams;

        if (!teams || !!!teams.length) {
            return [];
        }

        const tableData = {
            header: ['Age Group', 'Name', 'League', 'Manager', 'Link', 'Actions'],
            items: teams.map(team => {
                return new TeamModel(team, this.props.accounts, this.props.agegroups, this.props.leagues);
            }).sort((a, b) => {
                return Helpers.sortAscending('agegroup')(a, b);
            })
        };

        return tableData;
    }

    get tableMessage() {
        return CONFIG.MESSAGE.INFO.NO_TEAMS;
    }

    get tableLinks() {
        return [{
            label: 'Add new',
            class: 'btn-primary',
            href: '/teams/add'
        }];
    }

    extractSummary(id) {
        if (!!!this.props.teams.length) {
            return '';
        }

        const team = this.props.teams.find(item => item._id === id);

        return team ? `${team.firstname} ${team.surname}` : '';
    }

    render() {
        return (
            <div className="page page-teams">
                <StandardTable
                    group="teams"
                    title="Club Teams"
                    tableClass="table-teams"
                    message={this.tableMessage}
                    tableData={this.tableData}
                    tableLinks={this.tableLinks}
                    isTablePage={this.isTablePage}
                    loader={this.props.loader}
                />
                <StandardEntityForm
                    group="teams"
                    title="Teams"
                    item="team"
                    fields={this.fields}
                    fieldsets={this.fieldsets}
                    bottomLinks={this.bottomLinks}
                />
                <StandardDeleteForm
                    deleteGroup="teams"
                    deleteSubject={`Team ${this.extractSummary(this.props.params.id)}`}
                    generalMessage={CONFIG.MESSAGE.INFO.ABOUT_TO_DELETE}
                    bottomLinks={this.bottomLinks}
                />
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        accounts: state.accounts,
        agegroups: state.agegroups,
        leagues: state.leagues,
        loader: state.loader,
        teams: state.teams
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            accounts: bindActionCreators(accountsActions, dispatch),
            agegroups: bindActionCreators(agegroupsActions, dispatch),
            leagues: bindActionCreators(leaguesActions, dispatch),
            teams: bindActionCreators(teamsActions, dispatch),
            toast: bindActionCreators(toastActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTeams);
