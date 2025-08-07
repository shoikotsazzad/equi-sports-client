import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  
  RouterProvider,
} from "react-router-dom";

import router from './Route/router.jsx';
import { Toaster } from 'sonner';




createRoot(document.getElementById('root')).render(
  <StrictMode> 
     <Toaster richColors position="top-right"/>
    <RouterProvider router={router} />
  </StrictMode>,
)
