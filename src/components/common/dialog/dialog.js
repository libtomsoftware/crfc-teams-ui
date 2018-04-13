import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as dialogActions from '../../../actions/dialog-actions';

class DialogModal extends Component {

    constructor() {
        super();
    }

    render() {
        const dialog = this.props.dialog;
        return (
            <div>
                {dialog.content && <div>
                    {dialog.title}
                    {dialog.content}
                </div>}
            </div>
        );
    }
}

DialogModal.propTypes = {
    dialog: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        dialog: state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            dialog: bindActionCreators(dialogActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogModal);
