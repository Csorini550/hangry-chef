const initialState = {};

const CREATE_EMPLOYEE = 'employee/createEmployee'
const GET_EMPLOYEE_BY_USER = 'employee/getEmployeeByUser'
const DELETE_EMPLOYEE = 'employee/deleteEmployee'

const deleteEmployeeAction = (body) => ({
    type: DELETE_EMPLOYEE,
    payload: body
});
const getEmployeeByUserAction = (body) => ({
    type: GET_EMPLOYEE_BY_USER,
    payload: body
});

const createEmployeyeAction = (body) => ({
    type: CREATE_EMPLOYEE,
    payload: body
});

export const createEmployee = (body) => {
    return async (dispatch) => {
        const res = await fetch(`/api/employee/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (res.ok) {
            const data = await res.json()
            dispatch(createEmployeyeAction(data))
        }
    };
}


export const getEmployeeByUser = (userId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/employee/${userId}`);
        const data = await res.json();
        dispatch(getEmployeeByUserAction(data));
        return data;
    };
}

export const deleteEmployee = (employeeId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/employee/delete/${employeeId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json();
        dispatch(deleteEmployeeAction(data))
    }
}



function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_EMPLOYEE_BY_USER:
            const newObj = {};
            Object.values(action.payload).forEach(function (employee) {
                newObj[employee.id] = employee;
            })
            return { ...newObj, ...state };
        case CREATE_EMPLOYEE:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_EMPLOYEE:
            newState = { ...state }
            delete newState[action.payload.id]
            return newState
        default:
            return state;
    }
}

export default reducer;