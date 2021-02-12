const initialState = {};

const GET_INVENTORY_BY_USER = 'inventory/getInventoryByUser'
const CREATE_INVENTORY = 'inventory/createInventory'


const getInventoryByUserAction = (body) => ({
    type: GET_INVENTORY_BY_USER,
    payload: body
})

const createInventoryAction = (body) => ({
    type: CREATE_INVENTORY,
    payload: body
})

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



function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_INVENTORY_BY_USER:
            const newObject = {};
            Object.values(action.payload).forEach(function (inventory) {
                newObject[inventory.id] = inventory;
            })
            return { ...newObject };
        case CREATE_INVENTORY:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}

export default reducer