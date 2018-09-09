import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gamestatesActions from '../../actions/gamestates-actions';
import { StandardTable } from '../../components/tables/standard-table';
import StandardEntityForm from '../../components/forms/standard-entity';
import StandardDeleteForm from '../../components/forms/standard-delete';
import Footer from '../../components/common/footer/footer';
import Helpers from '../../services/helpers';
import GameStateModel from '../../models/game-state';
import { CONFIG } from '../../config-constants';
import './page-settings.css';

class PageSettingsGameStates extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.gamestates.fetch();
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
            'name'
        ];
    }

    get fieldsets() {
        return [{
            formGroups: [{
                name: 'name',
                label: 'Type',
                placeholder: 'type of the game result',
                isMandatory: true
            }]
        }];
    }

    get bottomLinks() {
        return [{
            href: '/settings/gamestates',
            class: 'btn btn-primary',
            label: 'List of game result types'
        }, {
            class: 'btn btn-secondary',
            href: '/settings',
            label: 'More settings'
        }];
    }

    get tableData() {
        const gamestates = this.props.gamestates;

        if (!gamestates || !!!gamestates.length) {
            return [];
        }

        const tableData = {
            header: ['Type', 'Actions'],
            items: gamestates.map(gamestate => {
                return new GameStateModel(gamestate);
            }).sort((a, b) => {
                return Helpers.sortAscending('name')(a, b);
            })
        };

        return tableData;
    }

    get tableMessage() {
        return CONFIG.MESSAGE.INFO.NONE_SO_FAR('game state types');
    }

    get tableLinks() {
        return [{
            label: 'Add new',
            class: 'btn-primary',
            href: '/settings/gamestates/add'
        }];
    }

    extractSummary(id) {
        if (!!!this.props.gamestates || !!!this.props.gamestates.length) {
            return '';
        }

        const gamestate = this.props.gamestates.find(item => item._id === id);

        return gamestate ? gamestate.abbreviation : '';
    }

    render() {
        return (
            <div className="page page-settings page-settings-gamestates">
                <StandardTable
                    group="gamestates"
                    title="Game Result Types"
                    tableClass="table-gamestates"
                    message={this.tableMessage}
                    tableData={this.tableData}
                    tableLinks={this.tableLinks}
                    isTablePage={this.isTablePage}
                    loader={this.props.loader}
                />
                <StandardEntityForm
                    group="gamestates"
                    groupPrefix="settings"
                    item="gamestate"
                    title="new type"
                    fields={this.fields}
                    fieldsets={this.fieldsets}
                    bottomLinks={this.bottomLinks}
                />
                <StandardDeleteForm
                    deleteGroup="gamestates"
                    deleteSubject={`Game state type ${this.extractSummary(this.props.params.id)}`}
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
        gamestates: state.gamestates,
        loader: state.loader
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            gamestates: bindActionCreators(gamestatesActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSettingsGameStates);
