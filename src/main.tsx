import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'components/App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')
