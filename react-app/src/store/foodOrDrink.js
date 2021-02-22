const initialState = {};


const GET_FOOD_OR_DRINK = "foodOrDrink/getFoodOrDrink";
const CREATE_FOOD_OR_DRINK = "foodOrDrink/createFoodOrDrink";
const DELETE_FOOD_OR_DRINK = "foodOrDrink/deleteFoodOrDrink";
const EDIT_FOOD_OR_DRINK = "foodOrDrink/editFoodOrDrink";
const DRAG_HAPPENED = "dragDrop/dragHappened";
const CREATE_MENU_LIST = "foodOrDrink/createMenuList"


const createMenuListAction = (body) => ({
    type: CREATE_MENU_LIST,
    payload: body
});


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

export const createMenuList = (menuId, picture) => {
    return async (dispatch) => {
        const res = await fetch(`/api/menue/edit/${menuId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ picture })

        })
        if (res.ok) {
            const data = await res.json();
            return dispatch(createMenuListAction(data));
        }
    }
}


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
            // 
            const newItems = [...[action.payload.menue_id], action.payload];
            return { state, [action.payload.menue_id]: newItems };
        // return { ...state, [action.payload.id]: action.payload };
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

        // if (droppableIdStart !== droppableIdEnd) {
        //     const listStart = state[droppableIdStart];
        //     // pull out cards from list
        //     const card = listStart.<<menu>>>.splice(droppableIndexStart, 1);

        //     const listEnd = state[droppableIdEnd];

        //     listEnd.<<menu>>.splice(droppableIndexEnd, 0, ...cards);
        //     return {
        //         ...state, [droppableIdStart]: listStart, [droppableIdEnd]: listEnd
        //     }
        // }
        case DELETE_FOOD_OR_DRINK:
            anotherNewState = { ...state }
            delete anotherNewState[action.payload.id]
            return anotherNewState;
        default:
            return state;
    }
}

export default reducer;