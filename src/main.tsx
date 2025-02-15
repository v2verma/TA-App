import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Signup } from './components/Signup';

const router = createBrowserRouter([{
  path: "/",
  element: <Layout />,
  children: [
    {
      path: '',
      element: <App />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/contact',
      element: <Contact />
    },
    {
      path: '/signup',
      element: <Signup />
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
