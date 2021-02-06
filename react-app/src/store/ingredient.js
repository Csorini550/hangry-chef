const initialState = {};


const GET_INGREDIENTS_BY_USER = 'ingredients/getIngredientsByUser'
const CREATE_INGREDIENT = 'ingredients/createIngredient'


const getIngredientsByUserAction = (body) => ({
    type: GET_INGREDIENTS_BY_USER,
    payload: body
});


const createIngredientAction = (body) => ({
    type: CREATE_INGREDIENT,
    payload: body
})


export const createIngredient = (body) => {
    return async (dispatch) => {
        const res = await fetch(`/api/ingredient/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (res.ok) {
            const data = await res.json()
            // Do i dispatch here or in a useEffect or w,e its called in my component
        }
    };
}

export const getIngredientsByUser = (userId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/ingredient/${userId}`)
        const data = await res.json();
        dispatch(getIngredientsByUserAction(data))
        return data
    };
}

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_INGREDIENTS_BY_USER:
            const newObject = {};
            Object.values(action.payload).forEach(function (ingredient) {
                newObject[ingredient.id] = ingredient;
            })
            return { ...newObject };
        case CREATE_INGREDIENT:
            return { ...action.payload }
        default:
            return state;
    }
}

export default reducer;