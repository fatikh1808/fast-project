import React from 'react';
import {withStyles} from '@material-ui/core';
import Grid from '@material-ui/core//Grid';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {fade} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

const theme = createMuiTheme();

const styles = theme => ({
    paper: {
        marginTop: 64,
        width: 500,
    },
    button: {
        margin: theme.spacing(1),
    },
    buttonAdd: {
        marginLeft: 400,
    },
    tabContent: {
        padding: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: 'fullWidth',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        paddingTop: 5,
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        paddingTop: 20,
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: 'fullWidth%',
        [theme.breakpoints.up('md')]: {
            width: '45ch',
        },
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
})

class ContactsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newName: '',
            newNumber: '',
            changedName: '',
            changedNumber: '',
            id: '',
            searchValue: ''
        }
    }

    componentDidMount() {
        this.props.contactGett()
    }


    handleContactAdd = (event) => {
        event.preventDefault();

        const {newName, newNumber} = this.state;
        this.props.contactAdd(newName, newNumber);
        this.setState({newName: '', newNumber: ''})
        this.props.contactGett()
    }

    handleContactDelete = (id) => {

        this.props.contactDelete(id);
        this.props.contactGett()
    }

    handleContactRename = (event) => {

        event.preventDefault();

        const {changedName, changedNumber, id} = this.state;
        this.props.contactRename(changedName, changedNumber, id);
        this.setState({changedName: '', changedNumber: ''})
        this.props.contactGett()
    }

    handleSearchChange = (event) => {
        this.setState({
            searchValue: event.target.value,
        });
    }

    searchContacts = (contacts) => {
        const { searchValue } = this.state

        return contacts
            .filter(contact => contact.name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            )
    }

    render() {
        const {classes, contacts} = this.props;

        let inputName;
        let inputNumber;
        let button;
        if (this.state.changedName === '') {
            button =
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonAdd}
                    onClick={(event) => this.handleContactAdd(event)}>
                    Add
                </Button>;
            inputNumber =
                <InputBase
                placeholder="Number…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                value={this.state.newNumber}
                onChange={(event) => (this.setState({newNumber: event.target.value}))}
                inputProps={{'aria-label': 'search'}}
            />
            inputName = <InputBase
                placeholder="Name…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                value={this.state.newName}
                onChange={(event) => (this.setState({newName: event.target.value}))}
                inputProps={{'aria-label': 'search'}}
            />
        } else {
            button =
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonAdd}
                    onClick={(event) => this.handleContactRename(event)}>
                    Rename
                </Button>;
            inputNumber =
                <InputBase
                placeholder="Number…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                value={this.state.changedNumber}
                onChange={(event) => (this.setState({changedNumber: event.target.value}))}
                inputProps={{'aria-label': 'search'}}
            />
            inputName = <InputBase
                placeholder="Name…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                value={this.state.changedName}
                onChange={(event) => (this.setState({changedName: event.target.value}))}
                inputProps={{'aria-label': 'search'}}
            />
        }

        return (
            <React.Fragment>
                <MuiThemeProvider theme={theme} >
                    <Grid container justify="center">
                        <Grid item>
                            <Paper className={classes.paper}>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon/>
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{'aria-label': 'search'}}
                                        value={this.state.searchValue}
                                        onChange={this.handleSearchChange}
                                    />
                                </div>
                                <div className={classes.search}>
                                    {inputName}
                                </div>
                                <div className={classes.search}>
                                    {inputNumber}
                                </div>
                                {button}
                                <List className={classes.list}>
                                    {this.searchContacts(contacts).map(({id, name, number}) => (
                                        <React.Fragment key={id}>
                                            <ListItem button>
                                                <ListItemText primary={name} secondary={number}/>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.button}
                                                    startIcon={<DeleteIcon/>}
                                                    onClick={() => this.handleContactDelete(id)}
                                                >
                                                    Delete
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    onClick={() => (this.setState({
                                                        changedName: name,
                                                        changedNumber: number,
                                                        id: id
                                                    }))}
                                                >
                                                    Rename
                                                </Button>
                                            </ListItem>
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </MuiThemeProvider >
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ContactsPage);