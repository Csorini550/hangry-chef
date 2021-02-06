import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import session from "./sessionbroken";
import foodOrDrink from "./foodOrDrink"
import employee from "./employee"
import ingredient from "./ingredient"
import inventory from "./inventory"
import menue from "./menue"

// Reducer
const rootReducer = combineReducers({
    session,
    foodOrDrink,
    employee,
    ingredient,
    inventory,
    menue
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
