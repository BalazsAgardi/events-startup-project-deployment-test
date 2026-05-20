import { useCart } from "../../context/CartContext";
import styles from "./CartItem.module.css";

export default function CartItem({ name, price, quantity }) {
  const { updateItemQuantity, removeItemFromCart } = useCart();
  return (
    <li key={name} className={styles.item}>
      <div className={styles.itemInfo}>
        <p className={styles.itemName}>{name}</p>
        <p className={styles.itemPrice}>
          {price === 0 ? "Free" : `${price} kr. per ticket`}
        </p>
      </div>

      <div className={styles.qtyControl}>
        <button
          className={styles.qtyBtn}
          onClick={() => updateItemQuantity(name, quantity - 1)}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className={styles.qtyNum}>{quantity}</span>
        <button
          className={styles.qtyBtn}
          onClick={() => updateItemQuantity(name, quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        className={styles.removeBtn}
        onClick={() => removeItemFromCart(name)}
        aria-label={`Remove ${name}`}
      >
        ✕
      </button>
    </li>
  );
}
