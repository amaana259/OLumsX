import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Get the container for the root of your React component tree
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Render the App component to the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

