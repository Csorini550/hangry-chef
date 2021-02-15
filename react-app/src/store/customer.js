const initialState = {};

const CREATE_CUSTOMER = "customer/createCustomer"
const GET_CUSTOMER_BY_TABLE_ID = "customer/getCustomerByTableId"


const getCustomerByTableIdAction = (body) => ({
    type: GET_CUSTOMER_BY_TABLE_ID,
    payload: body
});

const createCustomerAction = (body) => ({
    type: CREATE_CUSTOMER,
    payload: body
});

export const createCustomer = (body) => {
    return async (dispatch) => {
        const res = await fetch('/api/customer/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (res.ok) {
            const data = await res.json()
            dispatch(createCustomerAction(data))
        }
    }
};

export const getCustomerByTableId = (table_number) => {
    return async (dispatch) => {
        const res = await fetch(`/api/customer/${table_number}`);
        const data = await res.json();
        dispatch(getCustomerByTableIdAction(data));
        return data;
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CUSTOMER_BY_TABLE_ID:
            const newObj = {};
            Object.values(action.payload).forEach(function (customer) {
                if (newObj[customer.table_number]) {
                    newObj[customer.table_number].push(customer)
                } else {
                    newObj[customer.id] = customer;
                }
            })
            return { ...newObj, ...state };
        case CREATE_CUSTOMER:
            const newItems = [...state[action.payload.table_number], action.payload];
            return { ...state, [action.payload.table_number]: newItems };
        default:
            return state;
    }
}

export default reducer;