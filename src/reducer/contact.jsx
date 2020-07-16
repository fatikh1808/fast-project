import * as types from '../constants'

const initialState = {
    contacts: []
}

export default function contactReducer(state = initialState, action) {
    switch (action.type) {

        case types.CONTACT_GETT_SUCCESS:
            return {
                ...state,
                contacts: action.payload
            };
        default:
            return state
    }
}