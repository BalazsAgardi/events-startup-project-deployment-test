import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import styles from "./Cart.module.css";

export default function Cart() {
  const { user } = useAuth();
  const { eventTickets, ticketsCount, removeItemFromCart, updateItemQuantity } =
    useCart();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const total = eventTickets.reduce(
    (sum, ticket) => sum + ticket.price * ticket.quantity,
    0,
  );

  function handleCheckout() {
    if (!user) {
      setError("You must be logged in to checkout!");
      return;
    }
    navigate("/checkout");
  }

  if (ticketsCount === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyIcon}>🛒</div>
        <p className={styles.emptyTitle}>Your cart is empty</p>
        <p className={styles.emptySubtitle}>Add some events to get started</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My cart</h1>
        <span className={styles.count}>
          {ticketsCount} {ticketsCount > 1 ? "tickets" : "ticket"}
        </span>
      </div>

      <ul className={styles.list}>
        {eventTickets.map((ticket) => (
          <CartItem
            key={ticket.name}
            name={ticket.name}
            price={ticket.price}
            quantity={ticket.quantity}
          />
        ))}
      </ul>

      <CartSummary />

      <button onClick={handleCheckout} className={styles.checkoutBtn}>
        Proceed to checkout
      </button>

      {error && (
        <Alert severity="error" className={styles.error}>
          {error}
        </Alert>
      )}
    </div>
  );
}
