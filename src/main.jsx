// main.jsx
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import './themes.css';
import './polish.css';
import { Site } from './Site';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <Site pathname={window.location.pathname} />
  </React.StrictMode>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
