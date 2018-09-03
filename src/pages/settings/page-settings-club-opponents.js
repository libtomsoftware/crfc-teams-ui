import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as opponentsActions from '../../actions/opponents-actions';
import { StandardTable } from '../../components/tables/standard-table';
import StandardEntityForm from '../../components/forms/standard-entity';
import StandardDeleteForm from '../../components/forms/standard-delete';
import Footer from '../../components/common/footer/footer';
import Helpers from '../../services/helpers';
import OpponentModel from '../../models/opponent';
import { CONFIG } from '../../config-constants';
import './page-settings.css';

class PageSettingsOpponents extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.opponents.fetch();
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
            'name', 'description'
        ];
    }

    get fieldsets() {
        return [{
            formGroups: [{
                name: 'name',
                label: 'Team name',
                placeholder: 'name of the team',
                isMandatory: true
            }, {
                name: 'description',
                label: 'Additional description',
                placeholder: 'additional team description, (e.g. Clarets, Blues)'
            }]
        }];
    }

    get bottomLinks() {
        return [{
            href: '/settings/opponents',
            class: 'btn btn-primary',
            label: 'List of opponent teams'
        }, {
            class: 'btn btn-secondary',
            href: '/settings',
            label: 'More settings'
        }];
    }

    get tableData() {
        const opponents = this.props.opponents;

        if (!opponents || !!!opponents.length) {
            return [];
        }

        const tableData = {
            header: ['Name', 'Description', 'Actions'],
            items: opponents.map(opponent => {
                return new OpponentModel(opponent);
            }).sort((a, b) => {
                return Helpers.sortAscending('name')(a, b);
            })
        };

        return tableData;
    }

    get tableMessage() {
        return CONFIG.MESSAGE.INFO.NO_OPPONENTS;
    }

    get tableLinks() {
        return [{
            label: 'Add new',
            class: 'btn-primary',
            href: '/settings/opponents/add'
        }];
    }

    extractSummary(id) {
        if (!!!this.props.opponents.length) {
            return '';
        }

        const opponent = this.props.opponents.find(item => item._id === id);

        return opponent ? opponent.abbreviation : '';
    }

    render() {
        return (
            <div className="page page-settings page-settings-opponents">
                <StandardTable
                    group="opponents"
                    title="Opponent teams"
                    tableClass="table-opponents"
                    message={this.tableMessage}
                    tableData={this.tableData}
                    tableLinks={this.tableLinks}
                    isTablePage={this.isTablePage}
                    loader={this.props.loader}
                />
                <StandardEntityForm
                    group="opponents"
                    groupPrefix="settings"
                    item="opponent"
                    title="new opponent team"
                    fields={this.fields}
                    fieldsets={this.fieldsets}
                    bottomLinks={this.bottomLinks}
                />
                <StandardDeleteForm
                    deleteGroup="opponents"
                    deleteSubject={`Opponent team ${this.extractSummary(this.props.params.id)}`}
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
        opponents: state.opponents,
        loader: state.loader
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            opponents: bindActionCreators(opponentsActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSettingsOpponents);
