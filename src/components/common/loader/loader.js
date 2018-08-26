import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import * as loaderActions from '../../../actions/loader-actions';
import './loader.css';

class Loader extends Component {
    updateSettings() {
        console.warn('update settings');
    }

    render() {
        return (
            <div className={'loader' + (this.props.loader ? ' visible' : ' hidden')}>
                <div className="spinner">
                    <div className="bounce1" />
                    <div className="bounce2" />
                    <div className="bounce3" />
                </div>
            </div>
        );
    }
}

Loader.propTypes = {
    loader: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        loader: state.loader
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loader: bindActionCreators(loaderActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
