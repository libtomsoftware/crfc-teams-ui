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
            player: null
        };

        this.requiredFields = [
            'firstname',
            'lastname'
        ];

        this.bindComponentMethods();
    }

    componentWillMount() {
        if (!this.props.players.length) {
            this.redirectToPlayers();
        } else {
            this.setState({
                player: this.props.players.find(player => player.id === this.props.params.id)
            });
        }
    }

    componentDidMount() {
        CONFIG = this.props.config;
    }

    bindComponentMethods() {
        this.send = this.send.bind(this);
        this.onPlayerAddError = this.onPlayerAddError.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onPlayerAddResponse = this.onPlayerAddResponse.bind(this);
        this.redirectToPlayers = this.redirectToPlayers.bind(this);
    }

    handleInputChange(event) {
        const target = event.target,
            value = target.type === 'checkbox' ? target.checked : target.value,
            name = target.name;

        this.setState({
            [name]: value
        });

        this.hideToast();
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

    render() {
        const current = this.state.player,
            btnLabel = current ? 'Update' : 'Add';

        return (
            <div className="page-player-form">
                <div className="form-group">
                    <fieldset>
                        <input
                            className="form-control"
                            name="firstname"
                            type="text"
                            placeholder="first name"
                            onChange={this.handleInputChange}
                            value={current ? current.firstname : ''}
                        />
                        <input
                            className="form-control"
                            name="lastname"
                            type="text"
                            placeholder="last name"
                            onChange={this.handleInputChange}
                            value={current ? current.lastname : ''}
                        />
                    </fieldset>
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

