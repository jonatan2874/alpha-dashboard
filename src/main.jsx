import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// import {StyledEngineProvider} from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* para tomar los estilos de tailwind en mui */}
    {/* <StyledEngineProvider injectFirst> */}
      <App />
    {/* </StyledEngineProvider> */}
  </React.StrictMode>,
)
