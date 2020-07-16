import React from 'react';
import { Redirect } from "react-router-dom";
import {withStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core//Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme();

const styles = theme => ({
    paper: {
        marginTop: 64 + theme.spacing(3),
        width: 500,
    },
    tabContent: {
        padding: theme.spacing(3),
    }
})

class WelcomePage extends React.Component {
    state = {
        activeTab: 0,
    }

    handleTabChange = (event, value) => {
        this.setState({activeTab: value});
    }

    render() {
        const {classes, register, login, isAuthenticated} = this.props;
        const {activeTab} = this.state;

        if (isAuthenticated) {
            return (
                <Redirect to="/contacts"/>
            );
        }

        return (
            <React.Fragment>
                <MuiThemeProvider theme={theme}>
                    <Grid container justify="center">
                        <Grid item>
                            <Paper className={classes.paper}>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={activeTab}
                                        onChange={this.handleTabChange}
                                        variant="fullWidth"
                                    >
                                        <Tab label="Login"/>
                                        <Tab label="Register"/>
                                    </Tabs>
                                </AppBar>
                                <div className={classes.tabContent}>
                                    {activeTab === 0 && <LoginForm onSubmit={login}/>}
                                    {activeTab === 1 && <RegisterForm onSubmit={register}/>}
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(WelcomePage);