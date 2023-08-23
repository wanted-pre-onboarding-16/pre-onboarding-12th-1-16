import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';

import { GlobalStateProvider } from './context/TodoProvider';
import './index.css';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Todos from './pages/Todos/Todos';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/todo',
    element: <Todos />,
  },
]);

root.render(
  <GlobalStateProvider>
    <RouterProvider router={router} />
  </GlobalStateProvider>,
);
