import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { store } from './store'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <ThemeProvider>
            {/* "user": follow the visitor's reduce-motion setting (stops loops, keeps fades) */}
            <MotionConfig reducedMotion="user">
              <App />
            </MotionConfig>
          </ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
