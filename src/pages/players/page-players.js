import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { StandardTable } from '../../components/tables/standard-table';
import StandardEntityForm from '../../components/forms/standard-entity';
import StandardDeleteForm from '../../components/forms/standard-delete';
import Footer from '../../components/common/footer/footer';
import Helpers from '../../services/helpers';
import PlayerModel, { getAgeGroup } from '../../models/player';
import { CONFIG } from '../../config-constants';

import * as accountsActions from '../../actions/accounts-actions';
import * as agegroupsActions from '../../actions/agegroups-actions';
import * as leaguesActions from '../../actions/leagues-actions';
import * as playersActions from '../../actions/players-actions';
import * as teamsActions from '../../actions/teams-actions';
import * as toastActions from '../../actions/toast-actions';

class PagePlayers extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.teams.fetch().then(teams => {
            if (!!!teams || !!!teams.length) {
                this.props.actions.toast({
                    message: CONFIG.INFO.PLAYER_REQUIRES_TEAM
                });
                return;
            }

            this.props.actions.agegroups.fetch().then(agegroups => {
                if (!!!agegroups.length) {
                    this.props.actions.toast({
                        message: CONFIG.INFO.PLAYER_REQUIRES_AGEGROUP
                    });
                    return;
                }
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
            'firstname',
            'lastname',
            'dob',
            'team',
            'guardian',
            'email',
            'mobile'
        ];
    }

    get teamsDropdownOptions() {
        if (!this.props.teams.length) {
            return [];
        }

        return this.props.teams.map(team => {
            return {
                value: team._id,
                label: `${getAgeGroup(team.agegroup, this.props.agegroups)} ${team.name}`
            };
        });
    }

    get fieldsets() {
        return [{
            formGroups: [{
                name: 'firstname',
                label: 'First Name',
                placeholder: 'first name'
            }, {
                name: 'lastname',
                label: 'Last Name',
                placeholder: 'last name'
            }, {
                name: 'dob',
                label: 'D.O.B.',
                placeholder: 'day of birth',
                type: 'date'
            }, {
                name: 'team',
                label: 'Team',
                type: 'dropdown',
                options: this.teamsDropdownOptions
            }, {
                name: 'guardian',
                label: 'Parent / Guardian',
                placeholder: 'guardian'
            }, {
                name: 'email',
                label: 'Email address',
                placeholder: 'email'
            }, {
                name: 'mobile',
                label: 'Mobile',
                placeholder: 'mobile number'
            }]
        }];
    }

    get bottomLinks() {
        return [{
            href: '/players',
            class: 'btn btn-primary',
            label: 'List of players'
        }];
    }

    get tableData() {
        const players = this.props.players;

        if (!players || !!!players.length) {
            return [];
        }

        const tableData = {
            header: ['First name', 'Last name', 'D.O.B.', 'Team', 'Guardian', 'Email', 'Mobile', 'Actions'],
            items: players.map(player => {
                return new PlayerModel(player, this.props.teams, this.props.agegroups);
            }).sort((a, b) => {
                return Helpers.sortAscending('lastname')(a, b);
            })
        };

        return tableData;
    }

    get tableMessage() {
        return CONFIG.MESSAGE.INFO.NONE_SO_FAR('players');
    }

    get tableLinks() {
        return [{
            label: 'Add new',
            class: 'btn-primary',
            href: '/players/add'
        }];
    }

    extractSummary(id) {
        if (!!!this.props.players.length) {
            return '';
        }

        const player = this.props.players.find(item => item._id === id);

        return player ? `${player.firstname} ${player.lastname}` : '';
    }

    render() {
        return (
            <div className="page page-players">
                <StandardTable
                    group="players"
                    title="Team Players"
                    tableClass="table-players"
                    message={this.tableMessage}
                    tableData={this.tableData}
                    tableLinks={this.tableLinks}
                    isTablePage={this.isTablePage}
                    loader={this.props.loader}
                />
                <StandardEntityForm
                    group="players"
                    title="Players"
                    item="player"
                    fields={this.fields}
                    fieldsets={this.fieldsets}
                    bottomLinks={this.bottomLinks}
                />
                <StandardDeleteForm
                    deleteGroup="players"
                    deleteSubject={`Player ${this.extractSummary(this.props.params.id)}`}
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
        players: state.players,
        teams: state.teams
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            accounts: bindActionCreators(accountsActions, dispatch),
            agegroups: bindActionCreators(agegroupsActions, dispatch),
            leagues: bindActionCreators(leaguesActions, dispatch),
            players: bindActionCreators(playersActions, dispatch),
            teams: bindActionCreators(teamsActions, dispatch),
            toast: bindActionCreators(toastActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PagePlayers);
