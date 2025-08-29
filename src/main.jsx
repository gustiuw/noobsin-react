import 'bootstrap/dist/css/bootstrap.min.css'
import './theme.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FavProvider } from './context/FavoriteContext.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavProvider>
  </StrictMode>,
)
