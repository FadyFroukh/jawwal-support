import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './app/store.js'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <PrimeReactProvider>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </Provider>
</PrimeReactProvider>,
)
