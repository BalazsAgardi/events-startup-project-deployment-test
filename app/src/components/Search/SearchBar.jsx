import styles from "./SearchBar.module.css";

export default function SearchBar({ search, onSearch, onClearSearch }) {
  return (
    <div className={styles.searchBar}>
      <svg className={styles.searchIcon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 21L16.65 16.65M18 11A7 7 0 1 1 4 11A7 7 0 0 1 18 11Z" />
      </svg>

      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={onSearch}
      />

      <button
        className={styles.clearButton}
        type="button"
        aria-label="Clear search"
        onClick={onClearSearch}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 6L6 18M6 6L18 18" />
        </svg>
      </button>
    </div>
  );
}
