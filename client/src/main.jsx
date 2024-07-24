import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from "./routers";
import { Provider } from "react-redux";
import { stores, persistor } from "./stores";
import { PersistGate } from 'redux-persist/lib/integration/react';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={stores}>
        <AppRouter />
      </Provider>
    </PersistGate>
  </React.StrictMode>,
)
