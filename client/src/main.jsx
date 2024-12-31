import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'; 
import { HelmetProvider } from "react-helmet-async"; 
import {Provider} from "react-redux"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <HelmetProvider>
      <CssBaseline/>
      <div onContextMenu={(e) => e.preventDefault()}>
      <App />
      </div>
    </HelmetProvider>
    </Provider>
  </StrictMode>,
);
