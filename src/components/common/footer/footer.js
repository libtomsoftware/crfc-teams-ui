import React from 'react';
import { connect } from 'react-redux';
import Cookies from '../../../services/cookies';
import { CONFIG } from '../../../config-constants';
import './footer.css';

class Footer extends React.Component {

    componentDidUpdate() {
        const token = Cookies.read('footy-token');
        const userData = sessionStorage.getItem(CONFIG.STORAGE_KEY.SESSION.USER_DATA);

        if (token && userData && !this.props.account) {
            const userDataParsed = JSON.parse(userData);

            this.props.actions.account.update(userDataParsed);
        }
    }

    render() {
        return (
            <footer>
                <span className="footer-account-status">
                    <a className="footer-libtom-logo" href="http://libtom.com" target="_blank">Libtom Software Ltd.</a>
                </span>
            </footer>
        );
    }
}

function mapStateToProps(state) {
    return {
        account: state.account
    };
}

export default connect(mapStateToProps)(Footer);
