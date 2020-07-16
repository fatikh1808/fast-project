import React from 'react';
import {
    Route,
    Switch,
    Redirect } from 'react-router-dom';

import {withStyles} from '@material-ui/core';
import WelcomePage from './containers/WelcomePage';
import ContactsPage from "./containers/ContactsPage";
import PrivateRoute from "./containers/PrivateRoute";

const styles = theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.default,
    },
});

const App = ({classes}) => (
    <div className={classes.root}>
        <Switch>
            <Route exact path="/(welcome)?" component={WelcomePage} />
            <PrivateRoute path="/contacts" component={ContactsPage} />
            <Redirect to="/" />
        </Switch>
    </div>
);

export default withStyles(styles)(App);