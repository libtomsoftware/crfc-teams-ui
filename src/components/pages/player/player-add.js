import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import Footer from '../../common/footer/footer';
import Fetch from '../../../services/fetch';
import * as playersActions from '../../../actions/players-actions';
import * as loaderActions from '../../../actions/loader-actions';
import './player.css';

let CONFIG;

class PlayerAdd extends Component {
    constructor() {
        super();

        this.state = {
            firstname: undefined,
            messages: {
                error: undefined,
                warning: undefined
            }
        };

        this.requiredFields = [
            'firstname',
            'lastname'
        ];

        this.bindComponentMethods();
    }

    componentDidMount() {
        CONFIG = this.props.config;
    }

    bindComponentMethods() {
        this.send = this.send.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onPlayerAddResponse = this.onPlayerAddResponse.bind(this);
        this.confirmAndRedirectToPlayers = this.confirmAndRedirectToPlayers.bind(this);
    }

    handleInputChange(event) {
        const target = event.target,
            value = target.type === 'checkbox' ? target.checked : target.value,
            name = target.name;

        this.setState({
            [name]: value
        });

        this.clearMessages();
    }

    clearMessages() {
        this.setState({
            messages: {
                error: undefined,
                warning: undefined
            }
        });
    }

    showWarningMessage(warning) {
        this.setState({
            messages: Object.assign(this.state.messages, {
                warning
            })
        });
    }

    showErrorMessage(error) {
        this.setState({
            messages: Object.assign(this.state.messages, {
                error
            })
        });
    }

    isFormValid() {
        let result = true;

        this.requiredFields.forEach(field => {
            if (this.state[field] === undefined) {
                result = false;
            }
        });

        return result;
    }

    send() {
        if (this.isFormValid()) {
            const payload = {
                firstname: this.state.firstname,
                lastname: this.state.lastname
            };

            this.props.actions.loader.show();

            Fetch.put({
                url: CONFIG.API_URL + '/players',
                body: payload
            })
                .then(this.onPlayerAddResponse);

        } else {
            this.showWarningMessage('Make sure all required information is provided!');
        }
    }

    onPlayerAddResponse(response) {
        if (response.status === 200) {
            this.confirmAndRedirectToPlayers();
        } else {
            this.showErrorMessage(response.statusText);
        }
        this.props.actions.loader.hide();
    }

    confirmAndRedirectToPlayers() {
        browserHistory.push('/players');
    }

    render() {
        return (
            <div className="page-player-add">
                {
                    this.state.messages.error && <div className="alert alert-danger">
                        Error: {this.state.messages.error}
                    </div>
                }

                {
                    this.state.messages.warning && <div className="alert alert-warning">
                        Warning: {this.state.messages.warning}
                    </div>
                }
                <div className="player-add-form form-group">
                    <fieldset>
                        <input
                            className="form-control"
                            name="firstname"
                            type="text"
                            placeholder="first name"
                            onChange={this.handleInputChange}
                        />
                        <input
                            className="form-control"
                            name="lastname"
                            type="text"
                            placeholder="last name"
                            onChange={this.handleInputChange}
                        />
                    </fieldset>
                    <button
                        className="btn btn-primary"
                        onClick={this.send}
                    >
                        Add
                    </button>
                </div>
                <Footer />
            </div>
        );
    }
}

PlayerAdd.propTypes = {
    players: PropTypes.array.isRequired
};

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
            loader: bindActionCreators(loaderActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAdd);
