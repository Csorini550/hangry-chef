const initialState = { user: null };

const SET_USER = 'session/setUser';
const IS_AUTHENTICATED = "user/IS_AUTHENTICATED";
const NOT_AUTHENTICATED = "user/NOT_AUTHENTICATED";
const REMOVE_USER = 'user/removeUser';


export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

export const isAuthenticated = () => ({
    type: IS_AUTHENTICATED,
    payload: true
})

export const notAuthenticated = () => ({
    type: NOT_AUTHENTICATED,
    payload: false
})


export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        await dispatch(isAuthenticated());
        await dispatch(setUser(data));
        return data.id;
    }
};

export const signUp = ({ name, restaurant_name, email, password }) => async dispatch => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            restaurant_name,
            email,
            password,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(isAuthenticated());
        dispatch(setUser(data));
        return data.id;
    };
}



function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case IS_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.payload
            };
        case NOT_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.payload
            };
        case REMOVE_USER:
            return {
                state: initialState    // Check that this is possible?
            }
        default:
            return state;
    }
};

export default reducer;
