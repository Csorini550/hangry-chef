const initialState = {};

const CREATE_MENUE = 'menueId/createMenue'
const GET_MENUE_BY_USER = 'menue/getMenueByUser'
const DRAG_HAPPENED = "dragDrop/dragHappened"
const DELETE_MENU = 'menu/deleteMenu'

const deleteMenuAction = (body) => ({
    type: DELETE_MENU,
    payload: body
});


const createMenueAction = (body) => ({
    type: CREATE_MENUE,
    payload: body
});

const getMenueByUserAction = (body) => ({
    type: GET_MENUE_BY_USER,
    payload: body
});

export const deleteMenu = (menuId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/menue/delete/${menuId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json();
        dispatch(deleteMenuAction(data))
    }
}


export const createMenu = (body) => {
    return async (dispatch) => {
        const res = await fetch(`/api/menue/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (res.ok) {
            const data = await res.json()
            dispatch(createMenueAction(data))
        }
    };
}

export const getMenueByUser = (userId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/menue/${userId}`)
        const data = await res.json();
        dispatch(getMenueByUserAction(data));
        return data;
    };
}

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId
) => {
    return ({
        type: DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId
        }
    })
}


// the id of the menu object
function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CREATE_MENUE:
            return { ...state, [action.payload.id]: action.payload };
        case GET_MENUE_BY_USER:
            const newObject = {};
            Object.values(action.payload).forEach(function (menue) {
                newObject[menue.id] = menue;
            })
            return { ...newObject, ...state };
        case DELETE_MENU:
            newState = { ...state }
            delete newState[action.payload.id]
            return newState;
        default:
            return state;
    }
}

export default reducer;