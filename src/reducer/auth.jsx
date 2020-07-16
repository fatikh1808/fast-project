
const token = localStorage.getItem('token')

const initialState = {
    isAuthenticated: !!token,
    user: null,
    token,
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.username,
                token: action.payload.token
            };
        case 'LOGIN_FAILURE':
        case 'REGISTER_FAILURE':
           return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: ''
            };

        default:
            return state
    }
}