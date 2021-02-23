const initialState = {
    menu_list: "{}",
    food_or_drink_list: "{}"
};

const GET_MENU_LIST = "menuList/GET_MENU_LIST"
const CREATE_MENU_LIST = "menuList/CREATE_MENU_LIST"
const RE_CREATE_STATE = "menuList/RE_CREATE_STATE"

const getMenuListAction = (body) => ({
    type: GET_MENU_LIST,
    payload: body
});

const createMenuListAction = (body) => ({
    type: CREATE_MENU_LIST,
    payload: body
});


export const getMenuList = (userId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/menu_list/${userId}`);
        const data = await res.json();
        dispatch(getMenuListAction(data));
        return data;
    }
};


export const createMenuList = (body) => {
    return async (dispatch) => {
        const res = await fetch(`/api/menu_list/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(createMenuListAction(data));
        }
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_MENU_LIST:
            const newObject = {};
            return action.payload;
        // Object.values(action.payload).forEach(function (menuList) {
        //     newObject[menuList.id] = menuList;
        // })
        // return { ...state, ...newObject };
        case CREATE_MENU_LIST:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}


export default reducer;