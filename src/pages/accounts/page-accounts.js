import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountsActions from '../../actions/accounts-actions';
import { StandardTable } from '../../components/tables/standard-table';
import StandardEntityForm from '../../components/forms/standard-entity';
import StandardDeleteForm from '../../components/forms/standard-delete';
import Footer from '../../components/common/footer/footer';
import Helpers from '../../services/helpers';
import AccountModel from '../../models/account';
import { CONFIG } from '../../config-constants';

class PageAccounts extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.accounts.fetch();
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
            'firstname', 'surname', 'username', 'phone'
        ];
    }

    get fieldsets() {
        return [{
            formGroups: [{
                name: 'firstname',
                label: 'First name',
                placeholder: 'first name'
            }, {
                name: 'surname',
                label: 'Surname',
                placeholder: 'surname'
            }, {
                name: 'username',
                label: 'Email / username',
                placeholder: 'address email'
            }, {
                name: 'phone',
                label: 'Phone',
                placeholder: 'phone number'
            }]
        }];
    }

    get bottomLinks() {
        return [{
            href: '/accounts',
            class: 'btn btn-primary',
            label: 'List of accounts'
        }];
    }

    get tableData() {
        const accounts = this.props.accounts;

        if (!accounts || !!!accounts.length) {
            return [];
        }

        const tableData = {
            header: ['First name', 'Surname', 'Email', 'Phone', 'Actions'],
            items: accounts.map(account => {
                return new AccountModel(account);
            }).sort((a, b) => {
                return Helpers.sortAscending('surname')(a, b);
            })
        };

        return tableData;
    }

    get tableMessage() {
        return CONFIG.MESSAGE.INFO.NO_MANAGERS;
    }

    get tableLinks() {
        return [{
            label: 'Add new',
            class: 'btn-primary',
            href: '/register'
        }];
    }

    extractSummary(id) {
        if (!this.props.accounts || !!!this.props.accounts.length) {
            return '';
        }

        const account = this.props.accounts.find(item => item._id === id);

        return account ? `${account.firstname} ${account.surname}` : '';
    }

    render() {
        return (
            <div className="page page-accounts">
                <StandardTable
                    group="accounts"
                    title="Club Managers"
                    tableClass="table-accounts"
                    message={this.tableMessage}
                    tableData={this.tableData}
                    tableLinks={this.tableLinks}
                    isTablePage={this.isTablePage}
                    loader={this.props.loader}
                />
                <StandardEntityForm
                    group="accounts"
                    item="account"
                    title="new manager"
                    fields={this.fields}
                    fieldsets={this.fieldsets}
                    bottomLinks={this.bottomLinks}
                />
                <StandardDeleteForm
                    deleteGroup="accounts"
                    deleteSubject={`Account ${this.extractSummary(this.props.params.id)}`}
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
        loader: state.loader
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            accounts: bindActionCreators(accountsActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageAccounts);
