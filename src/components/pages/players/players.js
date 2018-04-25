import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';

import Footer from '../../common/footer/footer';
import Fetch from '../../../services/fetch';

import PlayerModel from '../../../models/player';

import * as playersActions from '../../../actions/players-actions';
import * as loaderActions from '../../../actions/loader-actions';
import * as toastActions from '../../../actions/toast-actions';
import './players.css';

let CONFIG;

class Players extends Component {

    constructor() {
        super();

        this.onPlayersFetched = this.onPlayersFetched.bind(this);
        this.onRemovePlayerClick = this.onRemovePlayerClick.bind(this);
        this.onPlayersFetchFailure = this.onPlayersFetchFailure.bind(this);
    }

    componentDidMount() {
        CONFIG = this.props.config;
        this.fetchPlayers();
    }

    onRemovePlayerClick(event) {
        event.preventDefault();
        event.stopPropagation();

        this.deletePlayer(event.target.rel);
    }

    onEditPlayerClick(event) {
        event.preventDefault();
        event.stopPropagation();

        if (window.confirm('Do you want to edit player details?')) { //eslint-disable-line
            browserHistory.push(`player/${event.target.rel}`);
        }
    }

    fetchPlayers() {
        this.props.actions.loader.show();
        Fetch
            .get({
                url: CONFIG.API_URL + '/players'
            })
            .then(this.onPlayersFetched)
            .catch(this.onPlayersFetchFailure);
    }

    onPlayersFetched(players) {
        players = players.map(player => new PlayerModel(player));

        this.props.actions.players.update(players);
        this.hideLoader();
    }

    onPlayersFetchFailure() {
        this.props.actions.toast.show({
            message: CONFIG.MESSAGE.ERROR.FAILED_TO_LOAD_PLAYERS,
            type: 'danger'
        });
    }

    deletePlayer(id) {
        this.props.actions.loader.show();
        Fetch
            .delete({
                url: CONFIG.API_URL + '/players/' + id
            })
            .then(({ status }) => {
                this.onPlayerDelete(status, id);
            });
    }

    onPlayerDelete(status, id) {
        if (status !== 200) {
            this.props.actions.toast.show({
                message: CONFIG.MESSAGE.ERROR.FAILED_TO_DELETE_PLAYER,
                type: 'warning'
            });
            return;
        }

        this.removePlayerFromList(id);
        this.hideLoader();
    }

    removePlayerFromList(id) {
        const updatedPlayersList = this.props.players.filter(player => player.id !== id);

        this.props.actions.players.update(updatedPlayersList);
    }

    shouldDisplayPlayersList() {
        return this.props.players !== undefined && this.props.players.length > 0;
    }

    hideLoader() {
        this.props.actions.loader.hide();
    }

    routeTo(event, path) {
        event.preventDefault();
        event.stopPropagation();

        browserHistory.push(path);
    }

    render() {
        return (
            <div className="page-players">
                {
                    !this.shouldDisplayPlayersList() &&
                    !this.props.loader &&
                    !this.props.toast &&
                    <p>
                        No players to display.
                    </p>
                }
                {
                    this.shouldDisplayPlayersList() &&
                    <div className="players-list">
                        <table className="table table-hover">
                            <tbody>
                                {this.props.players.map((player, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{player.firstname}</td>
                                            <td>{player.lastname}</td>
                                            <td className="player-edit">
                                                <a
                                                    href="#"
                                                    className="btn btn-link fas fa-edit"
                                                    rel={player.id}
                                                    onClick={this.onEditPlayerClick}
                                                />
                                            </td>
                                            <td className="player-remove">
                                                <a
                                                    href="#"
                                                    className="btn btn-link fas fa-times"
                                                    rel={player.id}
                                                    onClick={this.onRemovePlayerClick}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <a
                            href="#"
                            className="btn btn-secondary" onClick={event => {
                                this.routeTo(event, '/player');
                            }}>
                            <i className="fas fa-user-plus" />
                        </a>
                    </div>
                }
                <Footer />
            </div>
        );
    }
}

Players.propTypes = {
    players: PropTypes.array.isRequired,
    loader: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        config: state.config,
        players: state.players,
        loader: state.loader,
        toast: state.toast
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

export default connect(mapStateToProps, mapDispatchToProps)(Players);
