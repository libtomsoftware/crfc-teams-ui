import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { browserHistory } from 'react-router';
import Helpers from '../services/helpers';

import Loader from '../components/common/loader/loader';
import Toast from '../components/common/toast/toast';
import Navbar from '../components/common/navbar/navbar';
import Footer from '../components/common/footer/footer';

import './layout.css';
import './layout-standard-form.css';

class Layout extends Component {
    componentDidMount() {
        if (Helpers.shouldRedirectToLogin(this.props.location.pathname)) {
            browserHistory.push('/login');
        }
    }

    render() {
        return (
            <div className="layout-wrapper">
                <Loader />
                <Toast />

                <Navbar />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.object.isRequired
};

export default Layout;
