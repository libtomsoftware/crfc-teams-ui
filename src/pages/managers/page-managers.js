import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as accountsActions from '../../actions/accounts-actions';
import { StandardTable } from '../../components/tables/standard-table';
import Footer from '../../components/common/footer/footer';
import AccountModel from '../../models/account';
import Helpers from '../../services/helpers';
import { CONFIG } from '../../config-constants';
import './page-managers.css';

class PageManagers extends Component {
    componentDidMount() {
        if (this.props.account && this.props.account.rank > 1) {
            browserHistory.push('/home');
        } else {
            this.props.actions.accounts.fetch();
        }
    }

    editManagerDetails(id) {
        if (id) {
            browserHistory.push(`/account/edit/${id}`);
        }
    }

    get tableData() {
        const accounts = this.props.accounts;

        if (!accounts || !!!accounts.length) {
            return [];
        }

        const tableData = {
            header: ['First name', 'Surname', 'Email', 'Phone', 'Actions'],
            items: accounts
                .map(account => {
                    return new AccountModel(account);
                })
                .sort((a, b) => {
                    return Helpers.sortAscending('surname')(a, b);
                })
        };

        return tableData;
    }

    get tableMessage() {
        return CONFIG.MESSAGE.INFO.NO_MANAGERS;
    }

    get tableBottomLinks() {
        return [{
            label: 'Register new manager',
            class: 'btn-primary',
            href: '/register'
        }];
    }

    render() {
        return (
            <div className="page page-managers">
                <StandardTable
                    tableClass="accountsTable"
                    message={this.tableMessage}
                    tableData={this.tableData}
                    bottomLinks={this.tableBottomLinks}
                />
                <Footer />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            accounts: bindActionCreators(accountsActions, dispatch)
        }
    };
}

function mapStateToProps(state) {
    return {
        account: state.account,
        accounts: state.accounts
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageManagers);
