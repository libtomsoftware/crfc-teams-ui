import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as accountsActions from '../../actions/accounts-actions';
import * as toastActions from '../../actions/toast-actions';
import { CONFIG } from '../../config-constants';
import Helpers from '../../services/helpers';
import AccountForm from '../../components/forms/account';
import StandardDeleteForm from '../../components/forms/standard-delete';
import Footer from '../../components/common/footer/footer';
import './page-account.css';

class PageAccount extends Component {

    componentDidMount() {
        this.handlePrivileges();

        if (!this.props.accounts.length) {
            this.props.actions.accounts.fetch();
        }
    }

    componentWillUnmount() {
        this.props.actions.toast.hide();
    }

    handlePrivileges() {
        if (!this.canSeeAccount()) {
            browserHistory.push('/home');
        }
    }

    canSeeAccount() {
        if (!this.props.account || !this.props.params || !this.props.params.id) {
            return false;
        }

        return this.isCurrentAccount() || this.props.account.rank < 2;
    }

    isCurrentAccount() {
        return this.props.account._id === this.props.params.id;
    }

    showEditForm() {
        return Helpers.isPage([
            'edit'
        ], this.props);
    }

    showDeleteForm() {
        return Helpers.isPage([
            'delete'
        ], this.props);
    }

    extractAccountDetails() {
        if (!!!this.props.accounts.length) {
            return '';
        }

        const account = this.props.accounts.find(item => item._id === this.props.params.id);

        return account ? `${account.firstname} ${account.surname} - ${account.username}` : '';
    }

    extractSummary(id) {
        if (!!!this.props.accounts.length) {
            return '';
        }

        const account = this.props.accounts.find(item => item._id === id);

        return account ? `${account.firstname} ${account.surname}` : '';
    }

    get deleteBottomLinks() {
        return [{
            class: 'btn btn-secondary',
            href: '/accounts',
            label: 'Other accounts'
        }];
    }

    render() {
        return (
            <div className="page page-account">
                {this.showEditForm() && <AccountForm
                    title={this.extractSummary(this.props.params.id)}
                />}
                {this.showDeleteForm() &&
                    <StandardDeleteForm
                        deleteGroup="accounts"
                        deleteSubject={`Account of ${this.extractAccountDetails()}`}
                        generalMessage={CONFIG.MESSAGE.INFO.ABOUT_TO_DELETE}
                        bottomLinks={this.deleteBottomLinks}
                    />
                }
                <Footer />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            accounts: bindActionCreators(accountsActions, dispatch),
            toast: bindActionCreators(toastActions, dispatch)
        }
    };
}

function mapStateToProps(state) {
    return {
        account: state.account,
        accounts: state.accounts
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageAccount);
