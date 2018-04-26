import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import Fetch from '../../../services/fetch';
import Footer from '../../common/footer/footer';

import * as playersActions from '../../../actions/players-actions';
import * as loaderActions from '../../../actions/loader-actions';
import * as toastActions from '../../../actions/toast-actions';

import './player.css';

let CONFIG;

class PlayerForm extends Component {
    constructor() {
        super();

        this.state = {
            player: {
                firstname: '',
                lastname: '',
                email: '',
                dob: {
                    day: '',
                    month: '',
                    year: ''
                },
                guardianFirstname: '',
                guardianLastname: ''
            }
        };

        this.bindComponentMethods();
    }

    componentWillMount() {
        if (!this.props.players.length) {
            this.redirectToPlayers();
        } else {
            if (this.props.params.id) {
                this.setState({
                    player: this.props.players.find(player => player.id === this.props.params.id)
                });
            }
        }
    }

    componentDidMount() {
        CONFIG = this.props.config;
    }

    bindComponentMethods() {
        this.send = this.send.bind(this);
        this.onPlayerAddError = this.onPlayerAddError.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDobDayChange = this.handleDobDayChange.bind(this);
        this.handleDobMonthChange = this.handleDobMonthChange.bind(this);
        this.handleDobYearChange = this.handleDobYearChange.bind(this);
        this.onPlayerAddResponse = this.onPlayerAddResponse.bind(this);
        this.redirectToPlayers = this.redirectToPlayers.bind(this);
    }

    handleInputChange(event) {
        const target = event.target,
            value = target.type === 'checkbox' ? target.checked : target.value,
            name = target.name,
            player = Object.assign({}, this.state.player, {
                [name]: value
            });

        this.setState({
            player
        });

        this.hideToast();
    }

    handleDobChange(type, value) {
        const current = this.state.player || {},
            dob = Object.assign({}, current.dob, {
                [type]: value
            }),
            player = Object.assign({}, current, {
                dob
            });

        this.setState({
            player
        });
    }

    handleDobDayChange(event) {
        this.handleDobChange('day', event.target.value);
    }

    handleDobMonthChange(event) {
        this.handleDobChange('month', event.target.value);
    }

    handleDobYearChange(event) {
        this.handleDobChange('year', event.target.value);
    }

    hideToast() {
        this.props.actions.toast.hide();
    }

    showToast(message, type) {
        this.props.actions.toast.show({
            message,
            type
        });
    }

    isFormValid() {
        let result = true;

        [
            'firstname',
            'lastname',
            'dob',
            'email',
            'guardianFirstname',
            'guardianLastname'
        ].forEach(field => {
            if (!this.state.player[field]) {
                result = false;
            }
        });

        return result;
    }

    send() {
        if (this.isFormValid()) {
            const payload = this.state.player;

            this.props.actions.loader.show();

            (payload.id ? Fetch.post : Fetch.put)({
                url: CONFIG.API_URL + '/players',
                body: payload
            })
                .then(this.onPlayerAddResponse)
                .catch(this.onPlayerAddError);

        } else {
            this.showToast('Make sure all required information is provided correctly!', 'warning');
        }
    }

    onPlayerAddError() {
        this.showToast(CONFIG.MESSAGE.ERROR.FAILED_TO_ADD_PLAYER, 'danger');
        this.props.actions.loader.hide();
    }

    onPlayerAddResponse(response) {
        if (response.status === 200) {
            this.redirectToPlayers();
        } else {
            this.showToast(response.statusText, 'danger');
        }
        this.props.actions.loader.hide();
    }

    redirectToPlayers() {
        browserHistory.push('/players');
    }

    generateDobOptions(amount, type) {
        const options = [];
        let items = Array.from(Array(amount).keys());

        if (type === 'year') {
            const currentYear = (new Date()).getFullYear();

            items = items
                .map(item => {
                    return currentYear - 50 + parseInt(item, 10);
                })
                .reverse()
                .filter(item => {
                    return currentYear - item > 5;
                });
        }

        if (type === 'month') {
            items = [].concat(0, moment.monthsShort());
        }

        items.forEach((item, index) => {
            if (!index) {
                return;
            }
            options.push(<option value={item} key={index}>{item}</option>);
        });

        return options;
    }

    cancel() {
        window.history.back();
    }

    render() {
        const current = this.state.player,
            btnLabel = current ? 'Update' : 'Add';

        return (
            <div className="page-player-form">
                <div className="player-form-container">
                    <div className="player-form-inner">

                        <div className="card mb-3">
                            <div className="card-header">{current ? 'Update player details' : 'New player'}</div>
                            <div className="card-body">
                                <div className="card-text">
                                    <fieldset>

                                        <div className="form-group">
                                            <label className="control-label" htmlFor="firstname">
                                                First name
                                            </label>
                                            <input
                                                className="form-control"
                                                name="firstname"
                                                type="text"
                                                placeholder="first name here..."
                                                onChange={this.handleInputChange}
                                                value={current.firstname || ''}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label" htmlFor="lastname">
                                                Last name
                                            </label>
                                            <input
                                                className="form-control"
                                                name="lastname"
                                                type="text"
                                                placeholder="last name here..."
                                                onChange={this.handleInputChange}
                                                value={current.lastname || ''}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Date of birth</label>

                                            <div className="player-dob">
                                                <div className="dob-component">
                                                    <label className="control-label" htmlFor="dobDay">
                                                        Day
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        name="dobDay"
                                                        onChange={this.handleDobDayChange}
                                                        value={current.dob.day}
                                                    >
                                                        <option value="0">...</option>
                                                        {this.generateDobOptions(32)}
                                                    </select>
                                                </div>

                                                <div className="dob-component">
                                                    <label className="control-label" htmlFor="dobMonth">
                                                        Month
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        name="dobMonth"
                                                        onChange={this.handleDobMonthChange}
                                                        value={current.dob.month}
                                                    >
                                                        <option value="0">...</option>
                                                        {this.generateDobOptions(13, 'month')}
                                                    </select>
                                                </div>

                                                <div className="dob-component">
                                                    <label className="control-label" htmlFor="dobYear">
                                                        Year
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        name="dobYear"
                                                        onChange={this.handleDobYearChange}
                                                        value={current.dob.year}
                                                    >
                                                        <option value="0">...</option>
                                                        {this.generateDobOptions(50, 'year')}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    </fieldset>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-header">{current ? 'Update guardian details' : 'Guardian details'}</div>
                            <div className="card-body">
                                <div className="card-text">
                                    <fieldset>

                                        <div className="form-group">
                                            <label className="control-label" htmlFor="guardianFirstname">
                                                First name
                                            </label>
                                            <input
                                                className="form-control"
                                                name="guardianFirstname"
                                                type="text"
                                                placeholder="first name here..."
                                                onChange={this.handleInputChange}
                                                value={current.guardianFirstname || ''}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label" htmlFor="guardianLastname">
                                                Last name
                                            </label>
                                            <input
                                                className="form-control"
                                                name="guardianLastname"
                                                type="text"
                                                placeholder="last name here..."
                                                onChange={this.handleInputChange}
                                                value={current.guardianLastname || ''}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label" htmlFor="email">
                                                Email
                                            </label>
                                            <input
                                                className="form-control"
                                                name="email"
                                                type="email"
                                                placeholder="email address here..."
                                                onChange={this.handleInputChange}
                                                value={current.email || ''}
                                            />
                                        </div>

                                    </fieldset>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="player-form-buttons">
                        <button
                            className="btn btn-secondary"
                            onClick={this.cancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={this.send}
                        >
                            {btnLabel}
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        config: state.config,
        players: state.players
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            players: bindActionCreators(playersActions, dispatch),
            loader: bindActionCreators(loaderActions, dispatch),
            toast: bindActionCreators(toastActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerForm);

