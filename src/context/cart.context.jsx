import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // check if item is already in cart
  const existingItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  // if item exist, increase  quantity
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
  addItemToCart: () => {},
  cartCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}