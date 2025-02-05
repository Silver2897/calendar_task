import React from 'react';
import ReactDOM from 'react-dom/client';
import { SessionProvider } from '../src/context/SessionContext.tsx'; // or wherever your SessionProvider is coming from
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </React.StrictMode>
);
