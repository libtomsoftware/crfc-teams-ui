import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameresultsActions from '../../actions/gameresults-actions';
import { StandardTable } from '../../components/tables/standard-table';
import StandardEntityForm from '../../components/forms/standard-entity';
import StandardDeleteForm from '../../components/forms/standard-delete';
import Footer from '../../components/common/footer/footer';
import Helpers from '../../services/helpers';
import GameResultModel from '../../models/game-result';
import { CONFIG } from '../../config-constants';
import './page-settings.css';

class PageSettingsGameResults extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.gameresults.fetch();
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
            href: '/settings/gameresults',
            class: 'btn btn-primary',
            label: 'List of game result types'
        }, {
            class: 'btn btn-secondary',
            href: '/settings',
            label: 'More settings'
        }];
    }

    get tableData() {
        const gameresults = this.props.gameresults;

        if (!gameresults || !!!gameresults.length) {
            return [];
        }

        const tableData = {
            header: ['Type', 'Actions'],
            items: gameresults.map(gameresult => {
                return new GameResultModel(gameresult);
            }).sort((a, b) => {
                return Helpers.sortAscending('name')(a, b);
            })
        };

        return tableData;
    }

    get tableMessage() {
        return CONFIG.MESSAGE.INFO.NONE_SO_FAR('game result types');
    }

    get tableLinks() {
        return [{
            label: 'Add new',
            class: 'btn-primary',
            href: '/settings/gameresults/add'
        }];
    }

    extractSummary(id) {
        if (!!!this.props.gameresults.length) {
            return '';
        }

        const gameresult = this.props.gameresults.find(item => item._id === id);

        return gameresult ? gameresult.abbreviation : '';
    }

    render() {
        return (
            <div className="page page-settings page-settings-gameresults">
                <StandardTable
                    group="gameresults"
                    title="Game Result Types"
                    tableClass="table-gameresults"
                    message={this.tableMessage}
                    tableData={this.tableData}
                    tableLinks={this.tableLinks}
                    isTablePage={this.isTablePage}
                    loader={this.props.loader}
                />
                <StandardEntityForm
                    group="gameresults"
                    groupPrefix="settings"
                    item="gameresult"
                    title="new type"
                    fields={this.fields}
                    fieldsets={this.fieldsets}
                    bottomLinks={this.bottomLinks}
                />
                <StandardDeleteForm
                    deleteGroup="gameresults"
                    deleteSubject={`Game result type ${this.extractSummary(this.props.params.id)}`}
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
        gameresults: state.gameresults,
        loader: state.loader
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            gameresults: bindActionCreators(gameresultsActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSettingsGameResults);
