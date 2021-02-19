const initialState = {};


const GET_FOOD_OR_DRINK = "foodOrDrink/getFoodOrDrink"
const CREATE_FOOD_OR_DRINK = "foodOrDrink/createFoodOrDrink"
const DELETE_FOOD_OR_DRINK = "foodOrDrink/deleteFoodOrDrink"
const EDIT_FOOD_OR_DRINK = "foodOrDrink/editFoodOrDrink"
const DRAG_HAPPENED = "dragDrop/dragHappened"


const createFoodOrDrinkAction = (body) => ({
    type: CREATE_FOOD_OR_DRINK,
    payload: body
});

const getFoodOrDrinkAction = (body) => ({
    type: GET_FOOD_OR_DRINK,
    payload: body
});

const deleteFoodOrDrinkAction = (body) => ({
    type: DELETE_FOOD_OR_DRINK,
    payload: body
});


export const createFoodOrDrink = (body) => {
    return async (dispatch) => {
        const res = await fetch(`/api/food_or_drink/create`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (res.ok) {
            const data = await res.json();
            dispatch(createFoodOrDrinkAction(data))
        }
    };
}

export const deleteFoodOrDrink = (foodOrDrinkId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/food_or_drink/delete/${foodOrDrinkId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json();
        dispatch(deleteFoodOrDrinkAction(data));
    }
}

export const getFoodOrDrink = (menueId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/food_or_drink/${menueId}`);
        const data = await res.json();
        dispatch(getFoodOrDrinkAction(data));
        return data;
    }
}
//This slice of state: each key is the id of the menu the value is an array of each item for that menu
function reducer(state = initialState, action) {
    let newState;
    let anotherNewState;
    switch (action.type) {
        case CREATE_FOOD_OR_DRINK:
            const newItems = [...[action.payload.menue_id], action.payload];
            return { ...state, [action.payload.menue_id]: newItems };

        case GET_FOOD_OR_DRINK:
            const newObject = {};
            Object.values(action.payload).forEach(function (foodOrDrink) {
                if (newObject[foodOrDrink.menue_id]) {
                    newObject[foodOrDrink.menue_id].push(foodOrDrink)

                } else {
                    newObject[foodOrDrink.menue_id] = [foodOrDrink];
                }
            })
            return { ...newObject, ...state };
        case DRAG_HAPPENED:
            const { droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId } = action.payload;
            // const newState = { ...state };
            //In the same list
            if (droppableIdStart === droppableIdEnd) {
                const newState = { ...state }
                // const card = state.find(foodOrDrink => droppableIdStart = foodOrDrink.id);
                const list = newState[droppableIdStart];
                [list[droppableIndexStart], list[droppableIndexEnd]] = [list[droppableIndexEnd], list[droppableIndexStart]];
                // const foodOrDrink = list.splice(droppableIndexStart, 1);
                // foodOrDrink.list.splice(droppableIndexEnd, 0, ...list);
                return { ...state, [droppableIdStart]: list };
            }
        case DELETE_FOOD_OR_DRINK:
            anotherNewState = { ...state }
            delete anotherNewState[action.payload.id]
            return anotherNewState;
        default:
            return state;
    }
}

export default reducer;