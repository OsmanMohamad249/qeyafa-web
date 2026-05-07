import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './styles/qeyafa-global.css'
import './i18n/config'
import { AppRoutes } from './routes'
import { RootLayout } from './components/layout/RootLayout'
import { PageTransition } from './components/layout/PageTransition'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <RootLayout>
          <PageTransition>
            <AppRoutes />
          </PageTransition>
        </RootLayout>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
