import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/index.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ToastContainer />
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
