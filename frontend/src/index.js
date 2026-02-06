import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components';

// ============================================
// IMPORTS - STYLING
// ============================================

import './styles/Theme.css';
import './styles/Components.css';

// ============================================
// RENDER APPLICATION
// ============================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);