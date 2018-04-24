import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
            message: 'Failed to load players!',
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
                message: 'Failed to delete player!',
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

    render() {
        return (
            <div className="page-players">
                {
                    !this.shouldDisplayPlayersList() &&
                    !this.props.loader &&
                    <div className="alert alert-info">
                        No players to display.
                    </div>
                }
                {
                    this.shouldDisplayPlayersList() &&
                    <div className="players-list">
                        {this.props.players.map((player, index) => {
                            return (<div key={index}>
                                {player.firstname} {player.lastname}
                                <a
                                    href="#"
                                    className="btn btn-link"
                                    rel={player.id}
                                    onClick={this.onRemovePlayerClick}
                                >
                                    x
                                </a>
                            </div>);
                        })}
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
