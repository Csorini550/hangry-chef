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

export const getCustomerByTableId = (tableId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/customer/${tableId}`);
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
                if (newObj[customer.table_id]) {
                    newObj[customer.table_id].push(customer)
                } else {
                    newObj[customer.table_id] = customer;
                }
            })
            return { ...newObject, ...state };
        case CREATE_CUSTOMER:
            const newItems = [...state[action.payload.table_id], action.payload];
            return { ...state, [action.payload.table_id]: newItems };
        default:
            return state;
    }
}

export default reducer;