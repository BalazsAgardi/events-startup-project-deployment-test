import styles from "./FormField.module.css";

export default function FormField({ name, label, children }) {
  return (
    <div className={styles.formField}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {children}
    </div>
  );
}
