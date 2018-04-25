import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
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
                dob: {
                    day: '',
                    month: '',
                    year: ''
                }
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

        console.warn('player', player);

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
            'dob'
        ].forEach(field => {
            if (this.state.player[field] === undefined) {
                result = false;
            }
        });

        return result;
    }

    send() {
        if (this.isFormValid()) {
            const player = this.state.player,
                payload = {
                    firstname: player.firstname,
                    lastname: player.lastname,
                    dob: player.dob
                };

            if (player.id) {
                payload.id = player.id;
            }

            this.props.actions.loader.show();

            (player.id ? Fetch.post : Fetch.put)({
                url: CONFIG.API_URL + '/players',
                body: payload
            })
                .then(this.onPlayerAddResponse)
                .catch(this.onPlayerAddError);

        } else {
            this.showToast('Make sure all required information is provided!', 'warning');
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

    generateDobOptions(amount) {
        const days = Array.from(Array(amount).keys()),
            options = [];

        days.forEach((item, index) => {
            if (!index) {
                return;
            }
            options.push(<option value={index} key={index}>{index}</option>);
        });

        return options;
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
                                                value={current ? current.firstname : ''}
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
                                                value={current ? current.lastname : ''}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <legend>Date of birth</legend>
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
                                                {this.generateDobOptions(13)}
                                            </select>
                                        </div>

                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={this.send}
                    >
                        {btnLabel}
                    </button>
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

