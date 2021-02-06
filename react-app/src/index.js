import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import { Provider } from 'react-redux';
// import { restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';
// import store from './src/store.js'

import { PersistGate } from 'redux-persist/integration/react'
// import store from './js/store/store';

const store = configureStore();


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
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </PersistGate> */}
  </React.StrictMode>,
  document.getElementById('root')
);
