import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import * as toastActions from '../../actions/toast-actions';
import * as accountsActions from '../../actions/accounts-actions';
import { CONFIG } from '../../config-constants';
import Helpers from '../../services/helpers';

import Footer from '../../components/common/footer/footer';
import './page-register.css';

class PageRegister extends Component {
    constructor(props) {
        super(props);

        this.fields = {
            firstname: createRef(),
            surname: createRef(),
            username: createRef(),
            password: createRef(),
            passwordConfirm: createRef(),
            phone: createRef()
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearFields = this.clearFields.bind(this);
    }

    get fieldsValues() {
        const values = {};

        Object.keys(this.fields).forEach(key => {
            values[key] = this.fields[key].current.value;
        });

        return values;
    }

    clearFields() {
        Object.keys(this.fields).forEach(key => {
            this.fields[key].current.value = '';
        });
    }

    showToast(details) {
        this.props.actions.toast.show({
            message: CONFIG.MESSAGE.ERROR.FORM_INVALID,
            details
        });
    }

    hasAnyNumber(text) {
        return text.replace(CONFIG.REGEX.ALPHABETIC_ONLY, '').length > 0;
    }

    isAlphanumericOnly(text) {
        return CONFIG.REGEX.ALPHANUMERIC_ONLY.test(String(text).toLowerCase());
    }

    isPasswordsMismatch(password, passwordConfirm) {
        return password !== passwordConfirm;
    }

    isValidName(name) {
        return this.isAlphanumericOnly(name) && !this.hasAnyNumber(name);
    }

    isValidPassword(password) {
        return password.length > 7 && password.length < 16 && this.isAlphanumericOnly(password) && this.hasAnyNumber(password);
    }

    logIn(event) {
        event.preventDefault();
        event.stopPropagation();

        browserHistory.push('/login');
    }

    register() {
        if (Helpers.hasEmptyValues(this.fieldsValues)) {
            this.showToast(CONFIG.MESSAGE.ERROR.EMPTY_FIELDS);
            return;
        }

        const { firstname, surname, username, password, passwordConfirm } = this.fieldsValues;
        const phone = this.fieldsValues.phone.split(' ').join('');

        if (!Helpers.isValidEmail(username)) {
            this.showToast(CONFIG.MESSAGE.ERROR.EMAIL_INVALID);
            return;
        }

        if (this.isPasswordsMismatch(password, passwordConfirm)) {
            this.showToast(CONFIG.MESSAGE.ERROR.PASSWORDS_MISMATCH);
            return;
        }

        if (! this.isValidPassword(password)) {
            this.showToast(CONFIG.MESSAGE.ERROR.PASSWORD_INVALID);
            return;
        }

        if (!Helpers.isValidPhone(phone)) {
            this.showToast(CONFIG.MESSAGE.ERROR.PHONE_INVALID);
            return;
        }

        this.props.actions.accounts.register({ firstname, surname, phone, username, password }, this.clearFields);
    }

    handleInputChange() {
        this.props.actions.toast.hide();
    }

    render() {
        return (
            <div className="page page-register">
                <div className="register-form standard-form">
                    <div className="standard-form-fields">
                        <div className="card mb-3">
                            <div className="card-header">Register new account</div>
                            <div className="card-body">
                                <div className="card-text">
                                    <div className="card-form">
                                        <fieldset>
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="username">
                                                    Your email address
                                                </label>
                                                <input
                                                    className="form-control"
                                                    name="username"
                                                    type="email"
                                                    placeholder="this will be your username"
                                                    ref={this.fields.username}
                                                    onChange={this.handleInputChange}
                                                    maxLength="32"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="password">
                                                    Password
                                                </label>
                                                <input
                                                    className="form-control"
                                                    name="password"
                                                    type="password"
                                                    placeholder="your password"
                                                    ref={this.fields.password}
                                                    onChange={this.handleInputChange}
                                                    maxLength="16"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="password">
                                                    Confirm password
                                                </label>
                                                <input
                                                    className="form-control"
                                                    name="password-confirm"
                                                    type="password"
                                                    placeholder="your password again"
                                                    ref={this.fields.passwordConfirm}
                                                    onChange={this.handleInputChange}
                                                    maxLength="16"
                                                />
                                            </div>
                                        </fieldset>
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
                                                    onChange={this.handleInputChange}
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
                                                    onChange={this.handleInputChange}
                                                    maxLength="16"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="phone">
                                                    Phone
                                                </label>
                                                <input
                                                    className="form-control"
                                                    name="phone"
                                                    type="text"
                                                    placeholder="phone number"
                                                    ref={this.fields.phone}
                                                    onChange={this.handleInputChange}
                                                    maxLength="12"
                                                />
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="standard-form-buttons">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => this.register()}
                                        >
                                            Register
                                        </button>
                                    </div>
                                    <p className="standard-form-bottom">
                                        <span>Do you have an account yet?</span>
                                        <a href="#" onClick={this.logIn}>
                                            Log in
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

export default connect(() => {
    return {};
}, mapDispatchToProps)(PageRegister);
