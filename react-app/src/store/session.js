// import { fetch } from './csrf.js';
// import { login, signup, logout } from "../services/auth.js"

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER
});

export const authenticate = async () => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

export const login = (email, password) => async (dispatch) => {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    let data = await res.json()
    dispatch(setUser(data));
    return data;
};

export const restoreUser = () => async (dispatch) => {
    const res = await fetch('/api/auth/');
    const data = await res.json()
    dispatch(setUser(data));
    return data;
};

export const signup = (user) => async (dispatch) => {
    const { email, password, name, restaurant_name } = user;
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            name,
            restaurant_name

        })
    });
    const data = await response.json()
    dispatch(setUser(data));
    return data;
};

export const logout = () => async (dispatch) => {
    const response = await fetch('/api/auth/logout', {
        method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
};

const initialState = { user: null };

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state, { user: action.payload });
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state, { user: null });
            return newState;
        default:
            return state;
    }
}

export default reducer;
