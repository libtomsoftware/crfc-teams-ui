import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../../common/footer/footer';
import PlayerForm from './player-form';

import './player.css';

class Player extends Component {
    render() {
        return (
            <div className="page-player-add">
                <PlayerForm playerId={this.props.params.id} />
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

export default connect(mapStateToProps)(Player);
