const initialState = {};

const GET_INVENTORY_BY_USER = 'inventory/getInventoryByUser'
const CREATE_INVENTORY = 'inventory/createInventory'
const DELETE_INVENTORY = 'inventory/deleteInventory'
const EDIT_INVENTORY = 'inventory/editInventory'

const editInventoryAction = (body) => ({
    type: EDIT_INVENTORY,
    payload: body
});

const deleteInventoryAction = (body) => ({
    type: DELETE_INVENTORY,
    payload: body
});

const getInventoryByUserAction = (body) => ({
    type: GET_INVENTORY_BY_USER,
    payload: body
});

const createInventoryAction = (body) => ({
    type: CREATE_INVENTORY,
    payload: body
});

export const createInventory = (body) => {
    return async (dispatch) => {
        const res = await fetch(`/api/inventory/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (res.ok) {
            const data = await res.json()
            dispatch(createInventoryAction(data))
        }
    };
}

export const getInventoryByUser = (userId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/inventory/${userId}`)
        const data = await res.json();
        dispatch(getInventoryByUserAction(data))
        return data;

    }
}


export const deleteInventory = (inventoryId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/inventory/delete/${inventoryId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json();
        dispatch(deleteInventoryAction(data));
    }
}

export const editInventory = ({ inventoryId, food_item, quantity, market_price }) => async (dispatch) => {
    const res = await fetch(`/api/inventory/edit/${inventoryId}`, {
        methd: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            food_item,
            quantity,
            market_price
        })
    })
    if (res.ok) {
        const data = await res.json();
        return dispatch(editInventory(data));
    }
}



function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_INVENTORY_BY_USER:
            const newObject = {};
            Object.values(action.payload).forEach(function (inventory) {
                newObject[inventory.id] = inventory;
            })
            return { ...newObject };
        case CREATE_INVENTORY:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_INVENTORY:
            newState = { ...state }
            delete newState[action.payload.id]
            return newState;
        default:
            return state;
    }
}

export default reducer;