const initialState = {};

const ADD_TO_CART = "cart/addToCart";

const DELETE_FROM_CART = "cart/deleteFromCart";

const addToCartAction = (body) => ({
    type: ADD_TO_CART,
    payload: body
});


const deleteFromCart = (body) => ({
    type: DELETE_FROM_CART,
    payload: body
});

export const addToCart = (body) => {
    return async (dispatch) => {
        await dispatch(addToCartAction(body));
    }
};


function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_TO_CART:
            return { ...state, ...action.payload };
        case DELETE_FROM_CART:
            newState = { ...state };
            delete newState[action.payload.id];
            return newState;
        default:
            return state;
    }
}

export default reducer;