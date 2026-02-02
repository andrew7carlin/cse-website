import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'
import GoogleAnalytics from './components/common/GoogleAnalytics.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <GoogleAnalytics />
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
)

