const initialState = {};

const GET_DRAG_DROP = "dragDrop/getDragDrop"
const CREATE_DRAG_DROP = "dragDrop/createDragDrop"
const DRAG_HAPPENED = "dragDrop/dragHappened"


const getDragDropAction = (body) => ({
    type: GET_DRAG_DROP,
    payload: body
});

const createDragDropAction = (body) => ({
    type: CREATE_DRAG_DROP,
    payload: body
});
// export const createDragDrop = (body) => {
//     return async (dispach) => {
//         const res = await fetch(`/api/###`, {
//             method: 'POST',
//             headers: { 'content-type': 'application/json' },
//             body: JSON.stringify(body)
//         })
//         if (res.ok) {
//             const data = await res.json();
//             dispatch(createDragDropAction(data))
//         }
//     }
// }

// export const getDragDrop = (menueId) => {
//     return async (dispatch) => {
//         const res = await fetch(`/api/###`);
//         const data = await res.json();
//         dispatch(getDragDropAction(data));
//         return data;
//     }
// }

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

function reducer(state = initialState, action) {
    switch (action.type) {
        // case CREATE_DRAG_DROP:
        // case GET_DRAG_DROP:
        case DRAG_HAPPENED:
            const { droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId } = action.payload;
            // const newState = { ...state };
            //In the same list
            if (droppableIdStart === droppableIdEnd) {
                // const foodOrDrink = state.find(foodOrDrink => droppableIdStart = foodOrDrink.id);
                const foodOrDrink = state[droppableIdStart]
                const menue = foodOrDrink.menue.splice(droppableIndexStart, 1);
                foodOrDrink.menue.splice(droppableIndexEnd, 0, ...menue);
                return { ...state, [droppableIdStart]: foodOrDrink };
            }
        default:
            return state

    }
}

export default reducer;

