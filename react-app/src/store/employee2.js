const initialState = {};

const GET_EMPLOYEE_BY_ID = 'employee/getEmployeeById'

const getEmployeeByIdAction = (body) => ({
    type: GET_EMPLOYEE_BY_ID,
    payload: body
});


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
        case GET_EMPLOYEE_BY_ID:
            return { ...action.payload, state }
        default:
            return state;
    }
}

export default reducer;