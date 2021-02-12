const initialState = {};

const CREATE_EMPLOYEE = 'employee/createEmployee'
const GET_EMPLOYEE_BY_USER = 'employee/getEmployeeByUser'
const GET_EMPLOYEE_BY_ID = 'employee/getEmployeeById'

const getEmployeeByIdAction = (body) => ({
    type: GET_EMPLOYEE_BY_ID,
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

export const getEmployeeById = (employeeId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/employee/staff/${employeeId}`);
        const data = await res.json();
        dispatch(getEmployeeByIdAction(data));
        return data;
    };
}

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_EMPLOYEE_BY_USER:
            const newObj = {};
            Object.values(action.payload).forEach(function (employee) {
                newObj[employee.id] = employee;
            })
            return { ...newObj, state };
        case CREATE_EMPLOYEE:
            return { ...state, [action.payload.id]: action.payload };
        case GET_EMPLOYEE_BY_ID:
            return { ...action.payload, state }
        default:
            return state;
    }
}

export default reducer;