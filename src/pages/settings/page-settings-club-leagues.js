import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as leaguesActions from '../../actions/leagues-actions';
import { StandardTable } from '../../components/tables/standard-table';
import StandardEntityForm from '../../components/forms/standard-entity';
import StandardDeleteForm from '../../components/forms/standard-delete';
import Footer from '../../components/common/footer/footer';
import Helpers from '../../services/helpers';
import LeagueModel from '../../models/league';
import { CONFIG } from '../../config-constants';
import './page-settings.css';

class PageSettingsLeagues extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.leagues.fetch();
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
            'abbreviation', 'fullname', 'description'
        ];
    }

    get fieldsets() {
        return [{
            formGroups: [{
                name: 'abbreviation',
                label: 'Abbreviation',
                placeholder: 'league name abbreviation',
                maxLength: 5,
                isMandatory: true
            }, {
                name: 'fullname',
                label: 'Full name',
                placeholder: 'full name of the league',
                isMandatory: true
            }, {
                name: 'description',
                label: 'Description',
                placeholder: 'a few words of league description...'
            }]
        }];
    }

    get bottomLinks() {
        return [{
            href: '/settings/leagues',
            class: 'btn btn-primary',
            label: 'List of leagues'
        }, {
            class: 'btn btn-secondary',
            href: '/settings',
            label: 'More settings'
        }];
    }

    get tableData() {
        const leagues = this.props.leagues;

        if (!leagues || !!!leagues.length) {
            return [];
        }

        const tableData = {
            header: ['Abbreviation', 'Full name', 'Description', 'Actions'],
            items: leagues.map(league => {
                return new LeagueModel(league);
            }).sort((a, b) => {
                return Helpers.sortAscending('fullname')(a, b);
            })
        };

        return tableData;
    }

    get tableMessage() {
        return CONFIG.MESSAGE.INFO.NO_LEAGUES;
    }

    get tableLinks() {
        return [{
            label: 'Add new',
            class: 'btn-primary',
            href: '/settings/leagues/add'
        }];
    }

    extractSummary(id) {
        if (!!!this.props.leagues.length) {
            return '';
        }

        const league = this.props.leagues.find(item => item._id === id);

        return league ? league.abbreviation : '';
    }

    render() {
        return (
            <div className="page page-settings page-settings-leagues">
                <StandardTable
                    group="leagues"
                    title="Leagues"
                    tableClass="table-leagues"
                    message={this.tableMessage}
                    tableData={this.tableData}
                    tableLinks={this.tableLinks}
                    isTablePage={this.isTablePage}
                    loader={this.props.loader}
                />
                <StandardEntityForm
                    group="leagues"
                    groupPrefix="settings"
                    item="league"
                    title="new league"
                    fields={this.fields}
                    fieldsets={this.fieldsets}
                    bottomLinks={this.bottomLinks}
                />
                <StandardDeleteForm
                    deleteGroup="leagues"
                    deleteSubject={`League ${this.extractSummary(this.props.params.id)}`}
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
        leagues: state.leagues,
        loader: state.loader
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            leagues: bindActionCreators(leaguesActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSettingsLeagues);
