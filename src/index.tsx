import React from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from "./App";

import '@mantine/core/styles.css';
import './App.css';

createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
