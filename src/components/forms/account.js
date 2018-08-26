import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router';
import * as accountActions from '../../actions/account-actions';
import * as accountsActions from '../../actions/accounts-actions';
import * as toastActions from '../../actions/toast-actions';
import { CONFIG } from '../../config-constants';
import Helpers from '../../services/helpers';

class AccountForm extends Component {
    constructor(props) {
        super(props);

        this.fields = {
            firstname: createRef(),
            surname: createRef(),
            username: createRef(),
            phone: createRef()
        };

        this.logout = this.logout.bind(this);
    }

    componentWillUnmount() {
        this.props.actions.toast.hide();
    }

    get defaultValues() {
        const account = this.props.accounts.find(item => {
            return item._id === this.props.params.id;
        });

        return account;
    }

    showToast(details) {
        this.props.actions.toast.show({
            message: CONFIG.MESSAGE.ERROR.FORM_INVALID,
            details
        });
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

    update() {
        const values = Helpers.getFieldsValues(this.fields);

        if (Helpers.hasEmptyValues(values)) {
            this.showToast(CONFIG.MESSAGE.ERROR.EMPTY_FIELDS);
            return;
        }

        const { firstname, surname, username } = values;
        const phone = values.phone.split(' ').join('');

        if (!Helpers.isValidEmail(username)) {
            this.showToast(CONFIG.MESSAGE.ERROR.EMAIL_INVALID);
            return;
        }

        if (!Helpers.isValidPhone(phone)) {
            this.showToast(CONFIG.MESSAGE.ERROR.PHONE_INVALID);
            return;
        }

        this.props.actions.toast.hide();
        this.props.actions.account.edit(this.props.params.id, { firstname, surname, username, phone }, this.props.account._id);
    }

    logout() {
        this.props.actions.account.logout();
    }

    resetPassword() {
        console.warn('resetPassword');
    }

    render() {
        return (
            <div className="standard-form account-form">
                {this.defaultValues &&
                    <div className="standard-form-fields">
                        <div className="card mb-3">
                            <div className="card-header">Update details</div>
                            <div className="card-body">
                                <div className="card-text">
                                    <div className="card-form">
                                        <fieldset>
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="firstname">
                                                    First name
                                                </label>
                                                <input
                                                    className="form-control"
                                                    name="firstname"
                                                    type="text"
                                                    placeholder="your first name"
                                                    ref={this.fields.firstname}
                                                    defaultValue={this.defaultValues.firstname}
                                                    maxLength="16"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="surname">
                                                    Surname
                                                </label>
                                                <input
                                                    className="form-control"
                                                    name="surname"
                                                    type="text"
                                                    placeholder="your surname"
                                                    ref={this.fields.surname}
                                                    defaultValue={this.defaultValues.surname}
                                                    maxLength="16"
                                                />
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="username">
                                                    Your email address / username
                                                </label>
                                                <input
                                                    className="form-control"
                                                    name="username"
                                                    type="email"
                                                    placeholder="this will be your username"
                                                    ref={this.fields.username}
                                                    defaultValue={this.defaultValues.username}
                                                    maxLength="20"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="phone">
                                                    Your phone
                                                </label>
                                                <input
                                                    className="form-control"
                                                    name="phone"
                                                    type="text"
                                                    placeholder="your phone number"
                                                    ref={this.fields.phone}
                                                    defaultValue={this.defaultValues.phone}
                                                    maxLength="12"
                                                />
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="standard-form-buttons">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => this.update()}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    {this.isCurrentAccount() && <p className="standard-form-bottom">
                                        <a href="#" onClick={this.resetPassword}>
                                            Reset password
                                        </a>
                                        <a href="#" onClick={this.logout}>
                                            Logout
                                        </a>
                                    </p>}
                                    {!this.isCurrentAccount() &&
                                        <p className="standard-form-bottom">
                                            <Link
                                                to="/managers"
                                                className="btn btn-secondary"
                                            >
                                                More accounts
                                            </Link>
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            accounts: bindActionCreators(accountsActions, dispatch),
            account: bindActionCreators(accountActions, dispatch),
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountForm));
