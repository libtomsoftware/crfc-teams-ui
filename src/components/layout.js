import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';

import * as toastActions from '../actions/toast-actions';
import * as loaderActions from '../actions/loader-actions';

import Dialog from './common/dialog/dialog';
import Loader from './common/loader/loader';
import Toast from './common/toast/toast';
import Navbar from './common/navbar/navbar';
import Footer from './common/footer/footer';

import './layout.css';

class Layout extends Component {
    constructor() {
        super();

        this.state = {
            path: undefined
        };
    }

    componentWillMount() {
        //const CONFIG = this.props.config;

        // if (notlogged) {
        //     browserHistory.push('/login');
        // }
    }

    componentWillUpdate(state) {
        this.updatePathname(state.location.pathname);
    }

    updatePathname(path) {
        if (path !== this.state.path) {
            this.setState({
                path
            });
            this.props.actions.toast.hide();
            this.props.actions.loader.hide();
        }
    }

    render() {
        return (
            <div className="layout-wrapper">
                <Loader />
                <Toast />
                <Dialog />

                <Navbar />
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
        config: state.config
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            toast: bindActionCreators(toastActions, dispatch),
            loader: bindActionCreators(loaderActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
