import * as React from 'react';
import './index.css';
import reactDOM from 'react-dom/client';
import store from "./app/store.js";
import { Provider } from 'react-redux';
import App from './App.js';

reactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
