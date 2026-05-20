import styles from "./FilterOption.module.css";

export default function FilterOption({ filterTitle, filterOptions, onChange }) {
  return (
    <div className={styles.filterBar}>
      <h3 className={styles.title}>{filterTitle}</h3>
      <div className={styles.options}>
        {filterOptions.map((label) => (
          <label key={label} className={styles.option}>
            <input type="checkbox" name={label} onChange={onChange} />
            <span className={styles.label}>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
