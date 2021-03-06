import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import session from "./session";
import foodOrDrink from "./foodOrDrink"
import employee from "./employee"
import ingredient from "./ingredient"
import inventory from "./inventory"
import menue from "./menue"
import table from "./table"
import customer from "./customer"
import employee2 from "./employee2"
import dragDrop from "./dragDrop"
import menuList from "./menuList"
import cart from "./cart"
// Reducer
const rootReducer = combineReducers({
    session,
    foodOrDrink,
    employee,
    ingredient,
    inventory,
    menue,
    table,
    customer,
    employee2,
    menuList,
    cart
    // dragDrop
})

// Store Enhancer
let enhancer;

if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require("redux-logger").default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// Store Creator
const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
