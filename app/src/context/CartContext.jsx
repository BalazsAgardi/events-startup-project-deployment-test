import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [eventTickets, setEventTickets] = useState(() => {
    const stored = localStorage.getItem("carts");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(eventTickets));
  }, [eventTickets]);

  const ticketsCount = eventTickets.reduce(
    (total, ticket) => total + ticket.quantity,
    0,
  );

  function addItemToCart(name, price) {
    const existingItem = eventTickets.find((item) => item.name === name);
    if (existingItem) {
      updateItemQuantity(name, existingItem.quantity + 1);
      return;
    }
    setEventTickets((prev) => [...prev, { name, price, quantity: 1 }]);
  }

  function removeItemFromCart(name) {
    setEventTickets((prev) => prev.filter((item) => item.name !== name));
  }

  function updateItemQuantity(name, quantity) {
    if (quantity <= 0) {
      removeItemFromCart(name);
      return;
    }

    setEventTickets((prev) =>
      prev.map((item) => (item.name === name ? { ...item, quantity } : item)),
    );
  }

  return (
    <CartContext.Provider
      value={{
        eventTickets,
        ticketsCount,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
