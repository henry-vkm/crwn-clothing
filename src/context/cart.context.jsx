import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // check if item is already in cart
  const existingItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  // if item exist, add quantity
  if (existingItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id ?
        { ...cartItem, quantity: cartItem.quantity + 1} :
        cartItem
      })     
  }
  
  // if item doesn't exist
  return [ ...cartItems, {...productToAdd, quantity: 1}];
};

export const CartContext = createContext({
  isCartOpen: null,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems};

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}