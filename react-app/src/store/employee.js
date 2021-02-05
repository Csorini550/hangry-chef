const initialState = {};

const CREATE_EMPLOYEE = 'employee/createEmployee'
const GET_EMPLOYEE_BY_USER = 'employee/getEmployeeByUser'


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
        const res = await fetch(`/api/employees/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (res.ok) {
            const data = await res.json()
        }
    };
}


export const getEmployeeByUser = (userId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/employees/${userId}`);
        const data = res.json();
        disppatch(getEmployeeByUserAction(data));
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
            return { ...newObj };

        case CREATE_EMPLOYEE:
            return { ...action.payload };
        default:
            return state;
    }
}