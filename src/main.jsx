import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.jsx'
import { MyProvider } from './store/Store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyProvider>
      <App />
    </MyProvider>
  </StrictMode>,
)
