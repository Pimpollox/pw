import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './CartContext';
import { UsuarioProvider } from './usuContext';
import { OrdenProvider } from './ordContext';
import { MarcaProvider } from './marcaContext';
import { ModelosProvider } from './modelosContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <UsuarioProvider>
          <OrdenProvider>
            <MarcaProvider>
              <ModelosProvider>
                <App />
              </ModelosProvider>
            </MarcaProvider>
          </OrdenProvider>
        </UsuarioProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
