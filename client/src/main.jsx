import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {GoogleOAuthProvider} from '@react-oauth/google'
import { Enviroment } from '../Utils/enviroment.jsx';

const clientId= Enviroment.GG_CLIENT_ID

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer/>
    <GoogleOAuthProvider clientId={clientId}>
      <App/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
