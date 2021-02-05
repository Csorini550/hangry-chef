import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
import App from './App';
import rootReducer from "./store/index";
// import reducer from './store/sessio';


// if (process.env.NODE_ENV !== "production") {
//   restoreCSRF();

//   // window.csrfFetch = fetch;
//   window.store = store;
//   window.sessionActions = sessionActions;
// }

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
