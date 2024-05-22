import React from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import App from "./App";

import '@mantine/core/styles.css';
import './App.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      theme={theme}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
