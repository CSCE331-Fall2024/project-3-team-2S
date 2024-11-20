import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';

const PUBLISHABLE_KEY = "pk_test_d2lyZWQtcm9kZW50LTMxLmNsZXJrLmFjY291bnRzLmRldiQ";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root'),).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)
