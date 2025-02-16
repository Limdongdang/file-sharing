import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { Provider as ReduxProvider } from 'react-redux'
import store from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </AppProvider>
  </StrictMode>,
)
