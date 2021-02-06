const initialState = {};

const CREATE_TABLE = 'table/createTable'
const GET_TABLE = 'table/getTable'


const getTableAction = (body) => ({
    type: GET_TABLE,
    payload: body
})

const createTableAction = (body) => ({
    type: CREATE_TABLE,
    payload: body
})


export const createTable = (body) => {
    return async (dispatch) => {
        const res = await fetch(`api/table/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (res.ok) {
            const data = await res.json();
        }
    };
}

export const getTableByUser = (userId) => {
    return async (dispatch) => {
        const res = await fetch(`api/table/${userId}`);
        const data = await res.json();
        dispatch(getTableAction(data));
        return data;
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TABLE:
            const newObject = {};
            Object.values(action.payload).forEach(function (table) {
                newObject[table.id] = table;
            })
        case CREATE_TABLE:
            return { ...action.payload };
        default:
            return state;
    }
}
export default reducer;