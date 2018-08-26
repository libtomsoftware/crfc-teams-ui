import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import * as toastActions from '../../actions/toast-actions';
import * as accountActions from '../../actions/account-actions';

import { CONFIG } from '../../config-constants';
import Cookies from '../../services/cookies';
import './page-login.css';

class PageLogin extends Component {

    componentDidMount() {
        if (Cookies.read('footy-token')) {
            browserHistory.push('/');
        }
    }

    componentWillUnmount() {
        this.props.actions.toast.hide();
    }

    logIn() {
        this.props.actions.toast.hide();

        const username = document.getElementById('field-username').value,
            password = document.getElementById('field-password').value;

        if (!username || !password) {
            this.props.actions.toast.show({
                message: CONFIG.MESSAGE.ERROR.FORM_INVALID
            });
            return;
        }

        this.props.actions.account.login(username, password);
    }

    register(event) {
        event.preventDefault();
        event.stopPropagation();

        browserHistory.push('/register');
    }

    render() {
        return (
            <div className="page page-login">
                <div className="login-form standard-form">
                    <div className="standard-form-fields">
                        <div className="card mb-3">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <div className="card-text">
                                    <div className="card-form">
                                        <fieldset>
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="username">
                                                    Username
                                                </label>
                                                <input
                                                    className="form-control"
                                                    name="username"
                                                    type="email"
                                                    id="field-username"
                                                    placeholder="your email"
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
                                                    id="field-password"
                                                    placeholder="your password"
                                                />
                                            </div>
                                            <div className="standard-form-buttons">
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => this.logIn()}
                                                >
                                                    Log in
                                                </button>
                                            </div>
                                            <p className="standard-form-bottom">
                                                <span>Don't have an account yet?</span>
                                                <a href="#" onClick={this.register}>
                                                    Register
                                                </a>
                                            </p>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            account: bindActionCreators(accountActions, dispatch),
            toast: bindActionCreators(toastActions, dispatch)
        }
    };
}

export default connect(() => {
    return {};
}, mapDispatchToProps)(PageLogin);
