import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Footer from '../../common/footer/footer';

import './player.css';

class PlayerDetails extends Component {
    constructor() {
        super();

        this.state = {
            player: null
        };

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

    redirectToPlayers() {
        browserHistory.push('/players');
    }

    render() {
        return (
            <div className="page-player-details">
                {
                    this.state.player !== null &&
                    <div className="player-details-container">

                        <div className="card card-player mb-3">
                            <div className="card-header">Player</div>
                            <div className="card-body">
                                <div className="card-title">{this.state.player.firstname} {this.state.player.lastname}</div>
                                <p className="card-text">text</p>
                            </div>
                        </div>

                        <div className="card bg-secondary mb-3">
                            <div className="card-header">Guardians</div>
                            <div className="card-body">
                                <div className="card-title">{this.state.player.firstname} {this.state.player.lastname}</div>
                                <p className="card-text">text</p>
                            </div>
                        </div>

                    </div>
                }

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

export default connect(mapStateToProps)(PlayerDetails);
