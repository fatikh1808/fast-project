import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {

    render() {
        const { component: Component, isAuthenticated, ...rest } = this.props;

        return (
            <Route {...rest} render={props => (
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/welcome',
                        state: { from: props.location }
                    }} />
                )
            )} />
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute));