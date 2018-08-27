import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as agegroupsActions from '../../actions/agegroups-actions';
import * as loaderActions from '../../actions/loader-actions';
import { StandardTable } from '../../components/tables/standard-table';
import StandardEntityForm from '../../components/forms/standard-entity';
import StandardDeleteForm from '../../components/forms/standard-delete';
import Footer from '../../components/common/footer/footer';
import Helpers from '../../services/helpers';
import AgeGroupModel from '../../models/agegroup';
import { CONFIG } from '../../config-constants';
import './page-settings.css';

class PageSettingsAgeGroups extends Component {
    componentDidMount() {
        this.props.actions.agegroups.fetch();
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
            'abbreviation', 'description'
        ];
    }

    get fieldsets() {
        return [{
            formGroups: [{
                name: 'abbreviation',
                label: 'Abbreviation',
                placeholder: 'age group abbreviation',
                maxLength: 5
            }, {
                name: 'description',
                label: 'Description',
                placeholder: 'age group description...'
            }]
        }];
    }

    get bottomLinks() {
        return [{
            href: '/settings/agegroups',
            class: 'btn btn-primary',
            label: 'List of age groups'
        }, {
            class: 'btn btn-secondary',
            href: '/settings',
            label: 'More settings'
        }];
    }

    get tableData() {
        const agegroups = this.props.agegroups;

        if (!agegroups || !!!agegroups.length) {
            return [];
        }

        const tableData = {
            header: ['Abbreviation', 'Description', 'Actions'],
            items: agegroups.map(agegroup => {
                return new AgeGroupModel(agegroup);
            }).sort((a, b) => {
                return Helpers.sortAscending('abbreviation')(a, b);
            })
        };

        return tableData;
    }

    get tableMessage() {
        return CONFIG.MESSAGE.INFO.NO_AGEGROUPS;
    }

    get tableLinks() {
        return [{
            label: 'Add new',
            class: 'btn-primary',
            href: '/settings/agegroups/add'
        }];
    }

    extractSummary(id) {
        if (!!!this.props.agegroups.length) {
            return '';
        }

        const agegroup = this.props.agegroups.find(item => item._id === id);

        return agegroup ? agegroup.abbreviation : '';
    }

    render() {
        return (
            <div className="page page-settings page-settings-agegroups">
                <StandardTable
                    group="agegroups"
                    title="Age Groups"
                    tableClass="table-agegroups"
                    message={this.tableMessage}
                    tableData={this.tableData}
                    tableLinks={this.tableLinks}
                    isTablePage={this.isTablePage}
                    loader={this.props.loader}
                />
                <StandardEntityForm
                    group="agegroups"
                    item="agegroup"
                    title="new age group"
                    fields={this.fields}
                    fieldsets={this.fieldsets}
                    bottomLinks={this.bottomLinks}
                />
                <StandardDeleteForm
                    deleteGroup="agegroups"
                    deleteSubject={`AgeGroup ${this.extractSummary(this.props.params.id)}`}
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
        agegroups: state.agegroups,
        loader: state.loader
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            agegroups: bindActionCreators(agegroupsActions, dispatch),
            loader: bindActionCreators(loaderActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSettingsAgeGroups);
