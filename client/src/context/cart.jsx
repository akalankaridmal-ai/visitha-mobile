import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load existing persistent cart entries on mount
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);