import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import WelcomePage from '../components/WelcomePage';
import {login, register} from "../action";

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    login,
    register
}, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomePage);