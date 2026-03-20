import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BootGate } from './components/BootGate'
import './utils/gsapContext'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BootGate>
      <App />
    </BootGate>
  </StrictMode>,
)
