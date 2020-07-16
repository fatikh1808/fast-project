import * as types from '../constants'

export function contactGett() {
    return (dispatch) => {
        dispatch({
            type: types.CONTACT_GETT_REQUEST,
        });
        return fetch('http://localhost:3000/contacts', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: types.CONTACT_GETT_SUCCESS,
                    payload: json
                })
            })
            .catch(reason => dispatch({
                type: types.CONTACT_GETT_FAILED,
                payload: reason
            }))
    }
}

export function contactAdd(name, number) {
    return (dispatch) => {
        dispatch({
            type: types.CONTACT_ADD_REQUEST,
        });
        return fetch('http://localhost:3000/contacts', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "number": number,
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
                dispatch({
                    type: types.CONTACT_ADD_SUCCESS,
                    payload: json
                })
            })
            .catch(reason => dispatch({
                type: types.CONTACT_ADD_FAILED,
                payload: reason
            }))
    }
}

export function contactDelete(id) {
    return (dispatch) => {
        dispatch({
            type: types.CONTACT_DELETE_REQUEST,
        });
        return fetch(`http://localhost:3000/contacts/${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: types.CONTACT_DELETE_SUCCESS,
                    payload: json
                })
            })
            .catch(reason => dispatch({
                type: types.CONTACT_DELETE_FAILED,
                payload: reason
            }))
    }
}
export function contactRename(name, number, id) {
    return (dispatch) => {
        dispatch({
            type: types.CONTACT_RENAME_REQUEST,
        });
        return fetch(`http://localhost:3000/contacts/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "number": number,
                "id": id
            }),
        })
            .then(response => response.json())
            .then(json => {
                if (json) {
                    console.log(json)
                    return json;
                }

                throw new Error('не получилось')

            })
            .then(json => {
                dispatch({
                    type: types.CONTACT_RENAME_SUCCESS,
                    payload: json
                })
            })
            .catch(reason => dispatch({
                type: types.CONTACT_RENAME_FAILED,
                payload: reason
            }))
    }
}