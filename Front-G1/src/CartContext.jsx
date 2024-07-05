/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {}
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingProduct = prevItems.find(item => item.Serie === product.Serie);
      if (existingProduct) {
        if (existingProduct.quantity < product.stock) {
          return prevItems.map(item => 
            item.Serie === product.Serie ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Stock máximo alcanzado',
            showConfirmButton: false,
            timer: 1500
          });
          return prevItems;
        }
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500
      });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.Serie !== productId));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto eliminado del carrito',
        showConfirmButton: false,
        timer: 1500
      });
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.Serie === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <>
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
    </>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContext;
