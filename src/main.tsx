import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import NotFound from './components/NotFound/NotFound.tsx';
import { characterLoader, charactersLoader } from './lib/loaders.ts';
import CardDetails from './components/CardDescription/CardDetails.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: charactersLoader,
    children: [
      {
        path: '/cards/:cardID',
        element: <CardDetails />,
        loader: characterLoader,
      },
    ],
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
