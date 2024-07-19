import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import NotFound from './components/NotFound/NotFound.tsx';
import { charactersLoader } from './lib/loaders.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: charactersLoader,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback="Error occured!">
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
