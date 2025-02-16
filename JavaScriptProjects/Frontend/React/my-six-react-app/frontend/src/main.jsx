import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom';
import './index.css'
import App from './App.jsx'
import CalcApp from './CalcApp.jsx';


















createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <CalcApp />
  </StrictMode>,
)
