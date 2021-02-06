const initialState = {};


const GET_FOOD_OR_DRINK = "foodOrDrink/getFoodOrDrink"
const CREATE_FOOD_OR_DRINK = "foodOrDrink/createFoodOrDrink"
const DELETE_FOOD_OR_DRINK = "foodOrDrink/deleteFoodOrDrink"
const EDIT_FOOD_OR_DRINK = "foodOrDrink/editFoodOrDrink"


const createFoodOrDrinkAction = (body) => ({
    type: CREATE_FOOD_OR_DRINK,
    payload: body
});

const getFoodOrDrinkAction = (body) => ({
    type: CREATE_FOOD_OR_DRINK,
    payload: body
})


export const CreateFoodOrDrink = (body) => {
    return async (dispatch) => {
        const res = await fetch(`/api/food_or_drink/create`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (res.ok) {
            const data = await res.json();
        }
    };
}

export const getFoodOrDrink = (menueId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/food_or_drink/${menueId}`);
        const data = res.json();
        dispatch(getFoodOrDrink(data));
        return data;
    }
}

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CREATE_FOOD_OR_DRINK:
            return { ...action.payload }
        case GET_FOOD_OR_DRINK:
            const newObject = {};
            Object.values(action.payload).forEach(function (foodOrDrink) {
                newObject[foodOrDrink.id] = foodOrDrink;
            })
        default:
            return state;
    }
}

export default reducer;