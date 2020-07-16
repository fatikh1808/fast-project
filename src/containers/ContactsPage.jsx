import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import ContactsPage from '../components/ContactsPage';
import {contactAdd, contactDelete, contactGett, contactRename,} from "../action";



const mapStateToProps = state => ({
    contacts: state.contactReducer.contacts
});

const mapDispatchToProps = dispatch => bindActionCreators({
    contactAdd,
    contactDelete,
    contactRename,
    contactGett,
}, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactsPage);