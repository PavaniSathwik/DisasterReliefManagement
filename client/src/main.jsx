import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Your global styles
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import App from './App.jsx'; // Your main React component

// Create the root element for React
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Main app component */}
  </StrictMode>,
);
