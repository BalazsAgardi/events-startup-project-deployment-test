import { useCart } from "../../context/CartContext";
import styles from "./CartSummary.module.css";

export default function CartSummary() {
  const { eventTickets } = useCart();
  const total = eventTickets.reduce(
    (sum, ticket) => sum + ticket.price * ticket.quantity,
    0,
  );

  return (
    <div className={styles.summary}>
      {eventTickets.map((ticket) => (
        <div key={ticket.name} className={styles.summaryRow}>
          <span>
            {ticket.name} × {ticket.quantity}
          </span>
          <span>
            {ticket.price === 0
              ? "Free"
              : `${ticket.price * ticket.quantity} kr.`}
          </span>
        </div>
      ))}
      <div className={styles.summaryTotal}>
        <span>Total</span>
        <span>{total === 0 ? "Free" : `${total} kr.`}</span>
      </div>
    </div>
  );
}
