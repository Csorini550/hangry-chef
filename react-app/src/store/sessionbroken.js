// import { fetch } from './csrf.js';
// // import { login, signup, logout } from "../services/auth.js"

// const SET_USER = 'session/setUser';
// const REMOVE_USER = 'session/removeUser';

// export const setUser = (user) => ({
//     type: SET_USER,
//     payload: user
// });

// const removeUser = () => ({
//     type: REMOVE_USER
// });

// export const login = async (email, password) => {
//     const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         body: JSON.stringify({ email, password })
//     });
//     // dispatch(setUser(res.data.user));
//     return res;
// };

// export const restoreUser = () => async (dispatch) => {
//     const res = await fetch('/api/auth/');
//     dispatch(setUser(res.data.user));
//     return res;
// };

// export const signUp = ({ name, restaurant_name, email, password }) => async dispatch => {
//     const response = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             name,
//             restaurant_name,
//             email,
//             password,
//         }),
//     });
//     if (response.ok) {
//         const data = await response.json();
//         // dispatch(isAuthenticated());
//         dispatch(setUser(data));
//         return data.id;
//     };
// }

// export const logout = () => async (dispatch) => {
//     const response = await fetch('/api/auth/logout', {
//         method: 'DELETE'
//     });
//     dispatch(removeUser());
//     return response;
// };

// const initialState = { user: null };

// function reducer(state = initialState, action) {
//     let newState;
//     switch (action.type) {
//         case SET_USER:
//             newState = Object.assign({}, state, { user: action.payload });
//             return newState;
//         case REMOVE_USER:
//             newState = Object.assign({}, state, { user: null });
//             return newState;
//         default:
//             return state;
//     }
// }

// export default reducer;







