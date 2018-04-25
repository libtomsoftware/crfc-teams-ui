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
                <div className="player-details-container">
                    {this.state.player.firstname} {this.state.player.lastname}
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

export default connect(mapStateToProps)(PlayerDetails);
