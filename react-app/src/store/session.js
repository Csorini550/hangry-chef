import { fetch } from './csrf.js';
// import { login, signup, logout } from "../services/auth.js"

const SET_OWNER = 'session/setUser';
const REMOVE_OWNER = 'session/removeUser';

export const setUser = (user) => ({
    type: SET_OWNER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_OWNER
});

export const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
    console.log(res.data, "OWNER RES DATA")
    // dispatch(setUser(res.data.user));
    return res;
};

export const restoreUser = () => async (dispatch) => {
    const res = await fetch('/api/auth/');
    dispatch(setUser(res.data.user));
    return res;
};

export const signup = (user) => async (dispatch) => {
    const { email, password, restaurant_name, name } = user;
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            name,
            restaurant_name
        })
    });

    dispatch(setUser(response.data.user));
    return response;
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
        case SET_OWNER:
            newState = Object.assign({}, state, { user: action.payload });
            return newState;
        case REMOVE_OWNER:
            newState = Object.assign({}, state, { user: null });
            return newState;
        default:
            return state;
    }
}

export default reducer;
