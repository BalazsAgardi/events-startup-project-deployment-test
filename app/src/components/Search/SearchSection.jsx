import styles from "./SearchSection.module.css";

export default function SearchSection({ children }) {
  return (
    <section className={styles.searchSection}>
      <h1 className={styles.searchTitle}>
        Explore the world of events. Find what excites you!
      </h1>
      {children}
    </section>
  );
}
