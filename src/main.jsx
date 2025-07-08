import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import{
  RouterProvider,
}from 'react-router-dom';
import Router from './components/router/router';
import AuthProvider from './components/Auth/AuthProvider';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 

   <RouterProvider router={Router} />
    </AuthProvider>
      {/* <React.StrictMode> */}
      {/* <App /> */}

  </StrictMode>,
)
