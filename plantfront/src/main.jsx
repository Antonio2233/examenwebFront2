import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css'
import keys from '../keys.json'

import { GoogleOAuthProvider } from '@react-oauth/google';


import HomePage from './HomePage/Components/HomePage';
import Prueba from './Common/Prueba';
import PruebaMostrarValor from './Common/PruebaMostrarValor';
import Resultados from './Resultados/Components/Resultados';
import Edicion from './Resultados/Components/Edicion';
import Creacion from './Resultados/Components/Creacion';
import GoogleLog from './Common/GoogleLog';
import { SessionProvider } from './Common/SessionProvider';
import Navbar from './Common/NavBar';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={keys.GoogleClientID}>
    <SessionProvider>
      <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            {/* <Route path="/wikis/:nameWiki/entries/:entry_id" element={<HomePage/>} /> */}
            <Route path="/eventos" element={<Resultados/>} />
            <Route path="/eventos/edicion/:id" element={<Edicion/>} />
            <Route path="/eventos/creacion" element={<Creacion/>} />
            <Route path="/login" element={<GoogleLog/>} />
          </Routes>
      </Router>
    </SessionProvider>
  </GoogleOAuthProvider>
)
