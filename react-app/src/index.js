import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import { Provider } from 'react-redux';
import { restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';
// import store from './src/store.js'

// import { PersistGate } from 'redux-persist/integration/react'
// import store from './js/store/store';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  // window.csrfFetch = fetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

// function Root() {
//   return (
//     <ModalProvider>
//       <Provider store={store}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </Provider> 
//     </ModalProvider>
//   );
// }
// persistor = { persistor }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
