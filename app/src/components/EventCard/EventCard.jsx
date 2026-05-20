import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./EventCard.module.css";

export default function EventCard({ event }) {
  const { addItemToCart } = useCart();
  const dateStr = event.date;
  const formattedDate = new Date(dateStr)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(",", "");

  const price = event.price === 0 ? "Free" : `${event.price} kr.`;

  const ticketsAvailable =
    event.ticketsAvailable === 0
      ? "Sold out"
      : `${event.ticketsAvailable} ticket${event.ticketsAvailable > 1 && "s"} left`;

  return (
    <Link to={`/events/${event.id}`} className={styles.link}>
      <li className={styles.card}>
        <div className={styles.imageWrapper}>
          <div className={styles.image}></div>

          <span className={styles.category}>{event.category}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItemToCart(event.name, event.price);
            }}
            disabled={event.ticketsAvailable === 0}
            className={styles.addToCartBtn}
          >
            <AddShoppingCartIcon />
          </button>
        </div>

        <div className={styles.eventInfo}>
          <span className={styles.date}>{formattedDate}</span>

          <div>
            <h2 className={styles.title}>{event.name}</h2>
            <p className={styles.location}>
              {event.venue}, {event.city}
            </p>
            <p className={styles.ticketInfo}>
              <span>{event.price === 0 ? "Free" : `${event.price}kr.`}</span>
              <span>
                {event.ticketsAvailable === 0
                  ? "Sold out"
                  : `${event.ticketsAvailable} tickets left`}
              </span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
}
