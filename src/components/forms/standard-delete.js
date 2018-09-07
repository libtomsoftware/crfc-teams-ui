import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CONFIG } from '../../config-constants';
import Helpers from '../../services/helpers';

import * as accountsActions from '../../actions/accounts-actions';
import * as agegroupsActions from '../../actions/agegroups-actions';
import * as gameresultsActions from '../../actions/gameresults-actions';
import * as leaguesActions from '../../actions/leagues-actions';
import * as opponentsActions from '../../actions/opponents-actions';
import * as teamsActions from '../../actions/teams-actions';
import * as toastActions from '../../actions/toast-actions';

import './forms.css';

class StandardDeleteForm extends Component {
    constructor() {
        super();

        this.state = {
            disabled: true,
            deleted: true
        };

        this.delete = this.delete.bind(this);
        this.handleCurrent = this.handleCurrent.bind(this);
    }

    componentDidMount() {
        const actions = this.props.actions[this.props.deleteGroup];

        if (actions) {
            actions.fetch().then(this.handleCurrent);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.id !== prevProps.params.id) {
            const items = this.props[this.props.deleteGroup];

            this.handleCurrent(items);
        }
    }

    handleCurrent(items) {
        const current = items.find(item => item._id === this.props.params.id);

        if (current) {
            this.setState({
                disabled: false,
                deleted: false
            });
        }
    }

    delete() {
        this.setState({
            disabled: true,
            deleted: true
        });

        this.props.actions.toast.hide();
        this.props.actions[this.props.deleteGroup].remove(this.props.params.id);
    }

    showForm() {
        return Helpers.isPage([
            'delete'
        ], this.props) && !this.props.loader;
    }

    render() {
        return (
            <div className="standard-form">
                {this.showForm() &&
                    <div className="standard-delete">
                        <div className="standard-form-fields">
                            <div className="card bg-warning mb-3">
                                <div className="card-header">WARNING!</div>
                                <div className="card-body">
                                    {!this.state.deleted && this.props.deleteSubject && <h4 className="card-title">{this.props.deleteSubject}</h4>}
                                    {!this.state.deleted && this.props.generalMessage && <p className="card-text">{this.props.generalMessage}</p>}
                                    {this.state.deleted && <p className="card-text">{CONFIG.MESSAGE.INFO.ITS_GONE}</p>}
                                    <div className="standard-form-buttons">
                                        <button
                                            className="btn btn-danger"
                                            onClick={this.delete}
                                            disabled={this.state.disabled}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.props.bottomLinks && !!this.props.bottomLinks.length &&
                            <p className="standard-form-bottom">
                                {this.props.bottomLinks.map((link, i) => {
                                    return (
                                        <Link
                                            key={i}
                                            className={`btn ${link.class}`}
                                            to={link.href}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </p>
                        }
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        accounts: state.accounts,
        agegroups: state.agegroups,
        loader: state.loader
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            accounts: bindActionCreators(accountsActions, dispatch),
            agegroups: bindActionCreators(agegroupsActions, dispatch),
            gameresults: bindActionCreators(gameresultsActions, dispatch),
            leagues: bindActionCreators(leaguesActions, dispatch),
            opponents: bindActionCreators(opponentsActions, dispatch),
            teams: bindActionCreators(teamsActions, dispatch),
            toast: bindActionCreators(toastActions, dispatch)
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StandardDeleteForm));
