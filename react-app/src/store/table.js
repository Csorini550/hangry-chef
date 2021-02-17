const initialState = {};

const CREATE_TABLE = 'table/createTable';
const GET_TABLE = 'table/getTable';
const GET_TABLE_BY_EMPLOYEE = 'table/getTableByEmployee';
const DELETE_TABLE = 'table/deleteTable';

const deleteTableAction = (body) => ({
    type: DELETE_TABLE,
    payload: body
});

const getTableByEmployeeAction = (body) => ({
    type: GET_TABLE_BY_EMPLOYEE,
    payload: body
});

const getTableAction = (body) => ({
    type: GET_TABLE,
    payload: body
});

const createTableAction = (body) => ({
    type: CREATE_TABLE,
    payload: body
});


export const createTable = (body) => {
    return async (dispatch) => {
        const res = await fetch(`/api/table/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (res.ok) {
            const data = await res.json();
            dispatch(createTableAction(data))
        }
    };
}

export const getTableByUser = (userId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/table/${userId}`);
        const data = await res.json();
        dispatch(getTableAction(data));
        return data;
    }
}

export const getTableByEmployee = (employeeId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/table/staff/${employeeId}`);
        const data = await res.json();
        dispatch(getTableAction(data));
        return data;
    }
}

export const deleteTable = (tableId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/table/delete/${tableId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        dispatch(deleteTableAction(data))
    }
}

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_TABLE:
            const newObject = {};
            Object.values(action.payload).forEach(function (table) {
                newObject[table.id] = table;
            })
            return { ...state, ...newObject }
        case GET_TABLE_BY_EMPLOYEE:
            const newObject2 = {};
            Object.values(action.payload).forEach(function (table) {
                if (newObject2[table.employee_id]) {
                    newObject2[table.employee_id].push(table);
                } else {
                    newObject2[table.employee_id] = table;
                }
            })
            return { ...state, ...newObject2 }
        case CREATE_TABLE:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_TABLE:
            newState = { ...state };
            delete newState[action.payload.id];
            return newState;
        default:
            return state;
    }
}
export default reducer;