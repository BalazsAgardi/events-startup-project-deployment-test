import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import useEventById from "../../hooks/useEventById.jsx";
import styles from "./EventDetail.module.css";

export default function EventDetail() {
  const { id } = useParams();
  const { event: eventToDisplay, loading, error } = useEventById(id);
  const { addItemToCart } = useCart();
  const [isShowed, setIsShowed] = useState(false);

  if (!eventToDisplay) return null;

  const price =
    eventToDisplay.price === 0 ? "Free" : `${eventToDisplay.price} kr.`;

  const ticketsAvailable =
    eventToDisplay.ticketsAvailable === 0
      ? "Sold out"
      : `${eventToDisplay.ticketsAvailable} ticket${eventToDisplay.ticketsAvailable > 1 && "s"} left`;

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src="../public/images/mock-event-img.jpg"
        alt={eventToDisplay.name}
      />

      <div className={styles.header}>
        <h1 className={styles.eventTitle}>{eventToDisplay.name}</h1>
        <button
          onClick={() =>
            addItemToCart(eventToDisplay.name, eventToDisplay.price)
          }
          disabled={eventToDisplay.ticketsAvailable === 0}
          className={styles.buyBtn}
        >
          Buy Ticket
        </button>
      </div>

      <hr className={styles.divider} />

      <section>
        <p className={styles.sectionTitle}>Date and Time</p>
        <div className={styles.dateTime}>
          <div className={styles.dateTimeInfo}>
            <CalendarMonthIcon className={styles.eventIcon} />
            <span>{eventToDisplay.date}</span>
          </div>
          <div className={styles.dateTimeInfo}>
            <AccessTimeIcon className={styles.eventIcon} />
            <span>{eventToDisplay.time}</span>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      <section>
        <p className={styles.sectionTitle}>Location</p>
        <div className={styles.location}>
          <LocationPinIcon className={styles.eventIcon} />
          <span>
            {eventToDisplay.venue}, {eventToDisplay.city}
          </span>
        </div>
      </section>

      <button
        className={`${styles.toggleBtn} ${isShowed ? styles.hidden : ""}`}
        onClick={() => setIsShowed(!isShowed)}
      >
        Show more
      </button>

      {isShowed && (
        <>
          <hr className={styles.divider} />

          <p className={styles.sectionTitle}>Ticket Information</p>
          <div className={styles.ticketInfo}>
            <LocalActivityIcon className={styles.eventIcon} />
            <span>
              <strong>{price}</strong> / ticket
              <span className={styles.separator} aria-hidden="true">
                ·
              </span>
              {ticketsAvailable}
            </span>
          </div>

          <hr className={styles.divider} />

          <section>
            <p className={styles.sectionTitle}>Event Description</p>
            <p className={styles.description}>{eventToDisplay.description}</p>
          </section>

          <hr className={styles.divider} />

          <section>
            <p className={styles.sectionTitle}>Tags</p>
            <div className={styles.tags}>
              <span className={styles.tag}>{eventToDisplay.category}</span>
            </div>
          </section>
        </>
      )}

      <button
        className={`${styles.toggleBtn} ${isShowed ? "" : styles.hidden}`}
        onClick={() => setIsShowed(!isShowed)}
      >
        Show less
      </button>
    </div>
  );
}
