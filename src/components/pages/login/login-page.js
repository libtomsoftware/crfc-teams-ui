import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import * as configActions from '../../../actions/config-actions';
//import { CONFIG } from '../../../config-constants';
import Footer from '../../common/footer/footer';
import './login-page.css';

class LoginPage extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="login-page">
                login page
                <Footer />
            </div>
        );
    }
}

LoginPage.propTypes = {
    config: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        config: state.config
    };
}

function mapDispatchToProps(dispatch) {
    return {
        configActions: bindActionCreators(configActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
