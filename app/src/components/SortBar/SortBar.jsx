import styles from "./SortBar.module.css";

export default function SortBar({ onChange }) {
  return (
    <div className={styles.sortBar}>
      <span className={styles.title}>Sort by:</span>
      <div className={styles.selectorsWrapper}>
        <select onChange={onChange} className={styles.selectors}>
          <option value="default">Default</option>
          <option value="soonest">Date: Soonest</option>
          <option value="latest">Date: Latest</option>
          <option value="lowest">Price: Low to High</option>
          <option value="highest">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
