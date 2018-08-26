import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import * as toastActions from '../../../actions/toast-actions';
import './toast.css';

class Toast extends Component {

    constructor() {
        super();

        this.onCloseClick = this.onCloseClick.bind(this);
    }

    onCloseClick() {
        this.props.actions.toast.hide();
    }

    render() {
        const toast = this.props.toast;

        return (
            <div className={'toast animated fadeInUp' + (toast ? ' visible' : ' hidden')}>
                {
                    (toast !== null) &&
                    <div className={`alert alert-${toast.type}`}>
                        <button
                            className="close"
                            onClick={this.onCloseClick}
                        >
                            &times;
                        </button>
                        {toast.heading !== undefined && <h4 className="alert-heading">{toast.heading}</h4>}
                        <p className="mb-0 toast-message">{toast.message}</p>
                        {!!toast.details && <p className="mb-0 toast-details">{toast.details}</p>}
                    </div>
                }
            </div>
        );
    }
}

Toast.propTypes = {
    toast: PropTypes.object
};

function mapStateToProps(state) {
    return {
        toast: state.toast
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            toast: bindActionCreators(toastActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
