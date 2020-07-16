import * as types from "../constants";


export function register(username, password) {
    return (dispatch) => {
        dispatch({
            type: types.REGISTER_REQUEST,
        });
        return fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "token": Math.random(),
                "id": Math.random()
            }),
        })
            .then(response => response.json())
            .then(json => {
                if (json) {
                    console.log(json)
                    return json;
                }

                throw new Error('не найдено')

            })
            .then(json => {
                if (!json.token) {
                    throw new Error('Token has not been provided')
                }

                localStorage.setItem('token', json.token);

                dispatch({
                    type: types.REGISTER_SUCCESS,
                    payload: json
                })
            })
            .catch(reason => dispatch({
                type: types.REGISTER_FAILURE,
                payload: reason
            }))
    }
}


export function login(username, password) {
    return (dispatch) => {
        dispatch({
            type: types.LOGIN_REQUEST,
        });
        return fetch('http://localhost:3000/users', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(json => {
                const oldUser = json.filter(item => item.username === username && item.password === password)
                if (oldUser.length > 0) {
                    return oldUser;
                }
                alert('not found')
                throw new Error('не найдено');
            })
            .then(json => {
                if (!json[0].token) {
                    throw new Error('Token has not been provided')
                }

                localStorage.setItem('token', json[0].token);
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: json
                })
            })
            .catch(reason => dispatch({
                type: types.LOGIN_FAILURE,
                payload: reason
            }))
    }
}
