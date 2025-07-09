import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import{
  RouterProvider,
}from 'react-router-dom';

import AuthProvider from './components/Auth/AuthProvider';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import router from './components/router/router';
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
   <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
 
        </AuthProvider>
  
  </StrictMode>,
)
