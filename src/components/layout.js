import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import Dialog from './common/dialog/dialog';
import Loader from './common/loader/loader';
import Toast from './common/toast/toast';
import Footer from './common/footer/footer';
import '../assets/css/flexboxgrid.min.css';
import '../assets/css/font-awesome.min.css';
import '../assets/css/animate.css';
import './layout.css';

class Layout extends Component {
    componentWillMount() {
        //const CONFIG = this.props.config;

        // if (notlogged) {
        //     browserHistory.push('/login');
        // }
    }

    render() {
        return (
            <div className="layout-wrapper">
                <Loader />
                <Toast />
                <Dialog />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

Layout.propTypes = {
    config: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        config: state.config,
        example: state.example
    };
}

export default connect(mapStateToProps)(Layout);
